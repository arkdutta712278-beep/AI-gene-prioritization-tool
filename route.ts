.wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
}

.dots { display: flex; gap: 6px; }

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-strong);
  transition: background 0.3s;
}
.done { background: var(--teal); }
.active {
  background: var(--blue);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.label { font-size: 13px; color: var(--text2); }
