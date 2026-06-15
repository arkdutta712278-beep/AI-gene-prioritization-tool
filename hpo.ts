/**
 * POST /api/prioritize
 * Main gene prioritization endpoint — orchestrates all services
 */

import { NextRequest, NextResponse } from "next/server";
import { extractHPOFromText, prioritizeGenesWithLLM } from "@/lib/claude";
import { buildGenePhenotypeMap } from "@/lib/hpo";
import { validateGeneSymbols } from "@/lib/hgnc";
import { callExomiserPrioritiser, mergeExomiserScores } from "@/lib/exomiser";
import { retrieveRelevantLiterature, formatLiteratureContext } from "@/lib/literature";
import type { PrioritizationRequest, PrioritizationResponse, CandidateGene } from "@/types";

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body: PrioritizationRequest = await req.json();
    const { freeText, hpoTerms, inheritance, mode, maxGenes = 8 } = body;

    if (!freeText?.trim() && !hpoTerms?.length) {
      return NextResponse.json(
        { error: "Provide freeText or hpoTerms" },
        { status: 400 }
      );
    }

    // ── Step 1: Resolve HPO terms ────────────────────────────────────────────
    let resolvedHPOTerms = [...hpoTerms];

    if (freeText?.trim() && mode !== "hpo") {
      const extracted = await extractHPOFromText(
        freeText,
        hpoTerms.map((h) => h.id)
      );
      resolvedHPOTerms = [...resolvedHPOTerms, ...extracted];
    }

    if (!resolvedHPOTerms.length) {
      return NextResponse.json(
        { error: "Could not resolve any HPO terms from input" },
        { status: 422 }
      );
    }

    // ── Step 2: HPO database gene lookup ────────────────────────────────────
    const { geneCounts, geneHPOMatches, topGenes } =
      await buildGenePhenotypeMap(resolvedHPOTerms);

    // ── Step 3: Private literature retrieval ────────────────────────────────
    const queryText = `${freeText || ""} ${resolvedHPOTerms.map((h) => h.name).join(" ")}`;
    const literatureChunks = await retrieveRelevantLiterature(queryText);
    const literatureContext = formatLiteratureContext(literatureChunks);

    // ── Step 4: LLM gene prioritization ─────────────────────────────────────
    let genes: Omit<CandidateGene, "validated">[] = [];

    if (mode !== "hpo" && topGenes.length) {
      genes = await prioritizeGenesWithLLM({
        hpoTerms: resolvedHPOTerms,
        candidateGenes: topGenes,
        freeText,
        inheritance,
        literatureContext,
        mode,
      });
    }

    // Fallback: HPO database scoring only
    if (!genes.length) {
      genes = topGenes.slice(0, maxGenes).map((g, i) => ({
        gene: g,
        rank: i + 1,
        combinedScore: parseFloat(
          (geneCounts[g] / (resolvedHPOTerms.length || 1)).toFixed(3)
        ),
        hpoPhenotypeScore: parseFloat(
          (geneCounts[g] / (resolvedHPOTerms.length || 1)).toFixed(3)
        ),
        llmConfidence: null,
        exomiserScore: null,
        inheritance: "Unknown",
        omimId: null,
        hpoMatches: geneHPOMatches[g] || [],
        reasoning: `${g} is associated with ${geneCounts[g]} of ${resolvedHPOTerms.length} input HPO terms.`,
        literatureSnippets: [],
      }));
    }

    // ── Step 5: Exomiser integration ────────────────────────────────────────
    const exomiserResults = await callExomiserPrioritiser(
      resolvedHPOTerms,
      genes.map((g) => g.gene)
    );

    if (exomiserResults) {
      genes = mergeExomiserScores(genes, exomiserResults);
    }

    // Re-sort after Exomiser merge and re-rank
    genes.sort((a, b) => b.combinedScore - a.combinedScore);
    genes = genes.slice(0, maxGenes).map((g, i) => ({ ...g, rank: i + 1 }));

    // ── Step 6: HGNC hallucination guard ────────────────────────────────────
    const { validated, hallucinations, suggestions } = await validateGeneSymbols(
      genes.map((g) => g.gene)
    );

    const validatedSet = new Set(validated);

    const finalGenes: CandidateGene[] = genes.map((g) => {
      const isValid = validatedSet.has(g.gene.toUpperCase());
      const suggestion = suggestions[g.gene.toUpperCase()];
      return {
        ...g,
        // If hallucinated but there's a suggestion, substitute the correct symbol
        gene: isValid ? g.gene : suggestion || g.gene,
        validated: isValid,
        reasoning: !isValid && suggestion
          ? `[Symbol corrected: ${g.gene} → ${suggestion}] ${g.reasoning}`
          : g.reasoning,
      };
    });

    const response: PrioritizationResponse = {
      genes: finalGenes,
      resolvedHPOTerms,
      hallucinations,
      exomiserUsed: !!exomiserResults,
      literatureUsed: literatureChunks.length > 0,
      processingMs: Date.now() - start,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("[/api/prioritize]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
