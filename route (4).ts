import type { CandidateGene } from "@/types";
import styles from "./GeneCard.module.css";

const RANK_STYLES = [styles.rank1, styles.rank2, styles.rank3];

export default function GeneCard({ gene }: { gene: CandidateGene }) {
  const rankClass = RANK_STYLES[gene.rank - 1] || styles.rankN;
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  const barPct = Math.min(gene.combinedScore * 100, 100);

  return (
    <article className={`${styles.card} ${!gene.validated ? styles.cardUnvalidated : ""}`}>
      <div className={styles.header}>
        <div>
          <div className={styles.geneRow}>
            <span className={styles.geneName}>{gene.gene}</span>
            {!gene.validated && (
              <span className={styles.badgeWarn} title="Symbol was corrected by HGNC validator">
                corrected
              </span>
            )}
          </div>
          <span className={styles.inheritance}>{gene.inheritance}</span>
        </div>
        <span className={`${styles.rank} ${rankClass}`}>#{gene.rank}</span>
      </div>

      {/* Score bar */}
      <div className={styles.barWrap} aria-label={`Combined score ${pct(gene.combinedScore)}`}>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${barPct}%` }} />
        </div>
      </div>

      {/* Score chips */}
      <div className={styles.scores}>
        <div className={styles.scoreItem}>
          <span className={styles.scoreVal}>{pct(gene.combinedScore)}</span>
          <span className={styles.scoreLbl}>Combined</span>
        </div>
        <div className={styles.scoreItem}>
          <span className={styles.scoreVal}>{pct(gene.hpoPhenotypeScore)}</span>
          <span className={styles.scoreLbl}>HPO match</span>
        </div>
        {gene.llmConfidence !== null && (
          <div className={styles.scoreItem}>
            <span className={styles.scoreVal}>{pct(gene.llmConfidence)}</span>
            <span className={styles.scoreLbl}>LLM confidence</span>
          </div>
        )}
        {gene.exomiserScore !== null && (
          <div className={styles.scoreItem}>
            <span className={styles.scoreVal}>{gene.exomiserScore.toFixed(3)}</span>
            <span className={styles.scoreLbl}>Exomiser</span>
          </div>
        )}
      </div>

      {/* HPO matches */}
      {gene.hpoMatches.length > 0 && (
        <div className={styles.matchWrap}>
          <span className={styles.matchLabel}>Matching phenotypes</span>
          <div className={styles.matchChips}>
            {gene.hpoMatches.slice(0, 6).map((m) => (
              <span key={m} className={styles.matchChip}>{m}</span>
            ))}
            {gene.hpoMatches.length > 6 && (
              <span className={styles.matchMore}>+{gene.hpoMatches.length - 6}</span>
            )}
          </div>
        </div>
      )}

      {/* Literature snippets */}
      {gene.literatureSnippets && gene.literatureSnippets.length > 0 && (
        <div className={styles.literature}>
          <span className={styles.matchLabel}>Literature support</span>
          {gene.literatureSnippets.map((s, i) => (
            <p key={i} className={styles.literatureText}>{s}</p>
          ))}
        </div>
      )}

      {/* Reasoning */}
      <p className={styles.reasoning}>{gene.reasoning}</p>

      {/* Links */}
      <div className={styles.links}>
        {gene.omimId && (
          <a
            href={`https://omim.org/entry/${gene.omimId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            OMIM {gene.omimId} ↗
          </a>
        )}
        <a
          href={`https://omim.org/search?search=${encodeURIComponent(gene.gene)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Search OMIM ↗
        </a>
        <a
          href={`https://hpo.jax.org/app/browse/gene/${encodeURIComponent(gene.gene)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          HPO gene page ↗
        </a>
      </div>
    </article>
  );
}
