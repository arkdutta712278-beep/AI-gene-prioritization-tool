/**
 * POST /api/validate-genes
 * Body: { genes: string[] }
 * Validates gene symbols against HGNC and returns hallucination report
 */

import { NextRequest, NextResponse } from "next/server";
import { validateGeneSymbols } from "@/lib/hgnc";

export async function POST(req: NextRequest) {
  const { genes } = await req.json();

  if (!Array.isArray(genes) || !genes.length) {
    return NextResponse.json({ error: "genes array required" }, { status: 400 });
  }

  const result = await validateGeneSymbols(genes);
  return NextResponse.json(result);
}
