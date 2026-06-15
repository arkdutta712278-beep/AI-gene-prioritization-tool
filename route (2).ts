.card {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  transition: border-color 0.15s;
}
.card:hover { border-color: var(--border-strong); }
.cardUnvalidated { border-left: 3px solid var(--amber); }

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.geneRow { display: flex; align-items: center; gap: 8px; }
.geneName { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
.inheritance { font-size: 12px; color: var(--text2); margin-top: 2px; display: block; }

.badgeWarn {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--amber-bg);
  color: var(--amber-text);
  border-radius: 10px;
  font-weight: 500;
}

.rank {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--surface2);
  color: var(--text2);
}
.rank1 { background: var(--blue-bg); color: var(--blue-text); }
.rank2 { background: var(--teal-bg); color: var(--teal-text); }
.rank3 { background: var(--amber-bg); color: var(--amber-text); }
.rankN { background: var(--surface2); color: var(--text2); }

.barWrap { margin-bottom: 12px; }
.bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.barFill {
  height: 100%;
  background: var(--blue);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.scores {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.scoreItem { display: flex; flex-direction: column; gap: 1px; }
.scoreVal { font-size: 17px; font-weight: 600; }
.scoreLbl { font-size: 11px; color: var(--text3); }

.matchWrap { margin-bottom: 10px; }
.matchLabel {
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 5px;
}
.matchChips { display: flex; flex-wrap: wrap; gap: 5px; }
.matchChip {
  font-size: 11px;
  padding: 3px 8px;
  background: var(--teal-bg);
  color: var(--teal-text);
  border-radius: 12px;
}
.matchMore {
  font-size: 11px;
  padding: 3px 8px;
  background: var(--surface2);
  color: var(--text3);
  border-radius: 12px;
}

.literature { margin-bottom: 10px; }
.literatureText {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
  margin-top: 4px;
  padding: 6px 10px;
  background: var(--purple-bg);
  color: var(--purple-text);
  border-radius: var(--radius-sm);
}

.reasoning {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.65;
  padding-top: 10px;
  border-top: 0.5px solid var(--border);
  margin-bottom: 10px;
}

.links { display: flex; gap: 12px; flex-wrap: wrap; }
.link {
  font-size: 12px;
  color: var(--blue);
  text-decoration: none;
}
.link:hover { text-decoration: underline; }
