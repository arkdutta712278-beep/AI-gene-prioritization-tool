.wrap { position: relative; }

.searchRow { position: relative; }
.spinner {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border: 2px solid var(--border);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }

.dropdown {
  position: absolute;
  z-index: 50;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  list-style: none;
  max-height: 220px;
  overflow-y: auto;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  border-bottom: 0.5px solid var(--border);
  gap: 8px;
}
.option:last-child { border-bottom: none; }
.option:hover, .option:focus { background: var(--surface2); }
.optionSelected { opacity: 0.45; pointer-events: none; }
.optionName { flex: 1; }
.optionCode {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--blue-text);
  background: var(--blue-bg);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  padding: 3px 8px 3px 6px;
  background: var(--blue-bg);
  color: var(--blue-text);
  border-radius: 20px;
  max-width: 260px;
}
.chipCode {
  font-family: var(--mono);
  font-size: 10px;
  opacity: 0.75;
}
.chipName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chipRemove {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  color: inherit;
  opacity: 0.6;
  flex-shrink: 0;
}
.chipRemove:hover { opacity: 1; }
