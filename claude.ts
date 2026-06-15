"use client";

import { useState } from "react";
import type { HPOTerm, CandidateGene, PrioritizationResponse } from "@/types";
import HPOSearch from "./components/HPOSearch";
import GeneCard from "./components/GeneCard";
import ProgressSteps from "./components/ProgressSteps";
import styles from "./page.module.css";

const INHERITANCE_OPTIONS = [
  { id: "ad", label: "Autosomal dominant" },
  { id: "ar", label: "Autosomal recessive" },
  { id: "xr", label: "X-linked" },
  { id: "mt", label: "Mitochondrial" },
];

const MODES = [
  { id: "hybrid", label: "Hybrid (recommended)", desc: "HPO database + Claude AI" },
  { id: "llm", label: "LLM only", desc: "Claude AI from training knowledge" },
  { id: "hpo", label: "HPO database only", desc: "Pure ontology overlap" },
] as const;

type Mode = "hybrid" | "llm" | "hpo";
type Step = "idle" | "extracting" | "hpo-lookup" | "literature" | "llm" | "exomiser" | "validating" | "done";

const STEP_LABELS: Record<Step, string> = {
  idle: "",
  extracting: "Extracting HPO terms from text...",
  "hpo-lookup": "Fetching gene-phenotype associations from HPO database...",
  literature: "Searching private literature database...",
  llm: "Running LLM chain-of-thought prioritization...",
  exomiser: "Querying Exomiser phenotype scoring engine...",
  validating: "Validating gene symbols against HGNC...",
  done: "Done",
};

export default function HomePage() {
  const [freeText, setFreeText] = useState("");
  const [hpoTerms, setHpoTerms] = useState<HPOTerm[]>([]);
  const [inheritance, setInheritance] = useState<string[]>(["Autosomal dominant", "Autosomal recessive"]);
  const [mode, setMode] = useState<Mode>("hybrid");
  const [step, setStep] = useState<Step>("idle");
  const [result, setResult] = useState<PrioritizationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleInheritance(label: string) {
    setInheritance((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  }

  function removeHPOTerm(id: string) {
    setHpoTerms((prev) => prev.filter((t) => t.id !== id));
  }

  async function run() {
    if (!freeText.trim() && !hpoTerms.length) return;
    setError(null);
    setResult(null);
    setStep("extracting");

    // Simulate step progression for UX (the actual steps happen server-side)
    const stepSequence: Step[] = ["extracting", "hpo-lookup", "literature", "llm", "exomiser", "validating"];
    let stepIdx = 0;
    const ticker = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, stepSequence.length - 1);
      setStep(stepSequence[stepIdx]);
    }, 1800);

    try {
      const res = await fetch("/api/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freeText, hpoTerms, inheritance, mode }),
      });

      clearInterval(ticker);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Server error");
      }

      const data: PrioritizationResponse = await res.json();
      setResult(data);
      setHpoTerms(data.resolvedHPOTerms);
      setStep("done");
    } catch (err) {
      clearInterval(ticker);
      setStep("idle");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  const running = step !== "idle" && step !== "done";

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Gene Prioritizer</h1>
            <p className={styles.subtitle}>
              Phenotype-to-gene candidate ranking · HPO + Claude AI + Exomiser
            </p>
          </div>
          <span className={styles.badge}>Research only</span>
        </div>
      </header>

      <div className={styles.layout}>
        {/* ── LEFT PANEL: INPUT ── */}
        <aside className={styles.sidebar}>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Patient phenotypes</h2>
            <p className={styles.hint}>Enter free text, search HPO terms, or both.</p>

            <div className={styles.field}>
              <label className={styles.label}>Free text description</label>
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="e.g. intellectual disability, absent speech at age 3, seizures, low muscle tone, small head circumference"
              />
              <span className={styles.fieldHint}>Claude will auto-extract and map to HPO codes</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>HPO term search</label>
              <HPOSearch
                selectedTerms={hpoTerms}
                onAdd={(t) => setHpoTerms((prev) => prev.find((p) => p.id === t.id) ? prev : [...prev, t])}
                onRemove={removeHPOTerm}
              />
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Analysis settings</h2>

            <div className={styles.field}>
              <label className={styles.label}>Prioritization mode</label>
              <div className={styles.modeGroup}>
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ""}`}
                  >
                    <span className={styles.modeBtnLabel}>{m.label}</span>
                    <span className={styles.modeBtnDesc}>{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Inheritance mode</label>
              <div className={styles.checkGroup}>
                {INHERITANCE_OPTIONS.map((opt) => (
                  <label key={opt.id} className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={inheritance.includes(opt.label)}
                      onChange={() => toggleInheritance(opt.label)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className={styles.runBtn}
              onClick={run}
              disabled={running || (!freeText.trim() && !hpoTerms.length)}
            >
              {running ? "Analyzing..." : "Prioritize genes →"}
            </button>
          </section>
        </aside>

        {/* ── RIGHT PANEL: RESULTS ── */}
        <div className={styles.results}>
          {step !== "idle" && step !== "done" && (
            <ProgressSteps step={step} label={STEP_LABELS[step]} />
          )}

          {error && (
            <div className={styles.errorBanner}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <>
              <div className={styles.resultsMeta}>
                <span>
                  <strong>{result.genes.length}</strong> candidates ·{" "}
                  <strong>{result.resolvedHPOTerms.length}</strong> HPO terms
                </span>
                <span className={styles.metaTags}>
                  {result.exomiserUsed && <span className={styles.tag}>Exomiser</span>}
                  {result.literatureUsed && <span className={styles.tag}>Literature</span>}
                  {result.hallucinations.length > 0 && (
                    <span className={`${styles.tag} ${styles.tagWarn}`}>
                      {result.hallucinations.length} symbol{result.hallucinations.length > 1 ? "s" : ""} corrected
                    </span>
                  )}
                  <span className={styles.tagMuted}>{result.processingMs}ms</span>
                </span>
              </div>

              <div className={styles.geneList}>
                {result.genes.map((gene) => (
                  <GeneCard key={gene.gene} gene={gene} />
                ))}
              </div>

              <p className={styles.disclaimer}>
                For research and educational purposes only. Not for clinical diagnostic use.
                Always validate with a clinical geneticist and confirm with Exomiser running on
                real variant data.
              </p>
            </>
          )}

          {step === "idle" && !result && !error && (
            <div className={styles.emptyState}>
              <p>Enter phenotypes on the left and click <strong>Prioritize genes</strong> to begin.</p>
              <p className={styles.emptyHint}>
                Try: <em>"intellectual disability, absent speech, seizures, hypotonia"</em>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
