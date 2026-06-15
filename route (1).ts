import styles from "./ProgressSteps.module.css";

const STEPS = ["extracting", "hpo-lookup", "literature", "llm", "exomiser", "validating"];

interface Props {
  step: string;
  label: string;
}

export default function ProgressSteps({ step, label }: Props) {
  const currentIdx = STEPS.indexOf(step);

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.dots}>
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`${styles.dot} ${i < currentIdx ? styles.done : ""} ${i === currentIdx ? styles.active : ""}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
