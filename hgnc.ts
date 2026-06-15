.main { min-height: 100vh; }

.header {
  background: var(--surface);
  border-bottom: 0.5px solid var(--border);
  padding: 0 2rem;
}
.headerInner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.subtitle { font-size: 13px; color: var(--text2); margin-top: 2px; }
.badge {
  font-size: 11px;
  padding: 4px 10px;
  background: var(--amber-bg);
  color: var(--amber-text);
  border-radius: 20px;
  font-weight: 500;
}

.layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .layout { grid-template-columns: 1fr; padding: 1rem; }
}

.sidebar { display: flex; flex-direction: column; gap: 1rem; }

.card {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.sectionTitle {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.hint { font-size: 12px; color: var(--text2); margin-bottom: 1rem; }

.field { margin-bottom: 1rem; }
.field:last-child { margin-bottom: 0; }

.label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text2);
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.fieldHint { font-size: 11px; color: var(--text3); margin-top: 4px; display: block; }

.modeGroup { display: flex; flex-direction: column; gap: 6px; }
.modeBtn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  text-align: left;
  width: 100%;
  gap: 2px;
}
.modeBtnActive {
  background: var(--blue-bg);
  border-color: var(--blue);
  color: var(--blue-text);
}
.modeBtnLabel { font-size: 13px; font-weight: 500; }
.modeBtnDesc { font-size: 11px; color: var(--text3); }
.modeBtnActive .modeBtnDesc { color: var(--blue-text); opacity: 0.75; }

.checkGroup { display: flex; flex-direction: column; gap: 6px; }
.checkLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
}
.checkLabel input { accent-color: var(--blue); }

.runBtn {
  width: 100%;
  padding: 10px 16px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
}
.runBtn:hover:not(:disabled) { opacity: 0.88; background: var(--blue); }

.results { min-height: 400px; }

.resultsMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text2);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 8px;
}
.metaTags { display: flex; gap: 6px; flex-wrap: wrap; }
.tag {
  font-size: 11px;
  padding: 3px 8px;
  background: var(--teal-bg);
  color: var(--teal-text);
  border-radius: 12px;
}
.tagWarn { background: var(--amber-bg); color: var(--amber-text); }
.tagMuted { background: var(--surface2); color: var(--text3); }

.geneList { display: flex; flex-direction: column; gap: 12px; }

.errorBanner {
  padding: 12px 16px;
  background: var(--red-bg);
  color: var(--red-text);
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: 1rem;
}

.disclaimer {
  font-size: 11px;
  color: var(--text3);
  line-height: 1.6;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--border);
}

.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 8px;
  text-align: center;
  color: var(--text2);
  font-size: 14px;
}
.emptyHint { font-size: 13px; color: var(--text3); }
