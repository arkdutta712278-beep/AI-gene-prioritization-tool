*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f8f7f4;
  --surface: #ffffff;
  --surface2: #f2f0ec;
  --border: rgba(0,0,0,0.1);
  --border-strong: rgba(0,0,0,0.2);
  --text: #1a1a18;
  --text2: #5a5955;
  --text3: #9a9890;
  --blue: #1a6fc4;
  --blue-bg: #e8f0fb;
  --blue-text: #0d4a8a;
  --teal: #0f6e56;
  --teal-bg: #e1f5ee;
  --teal-text: #085041;
  --amber: #854f0b;
  --amber-bg: #faeeda;
  --amber-text: #633806;
  --red: #a32d2d;
  --red-bg: #fcebeb;
  --red-text: #791f1f;
  --purple: #534ab7;
  --purple-bg: #eeedfe;
  --purple-text: #3c3489;
  --radius: 10px;
  --radius-sm: 6px;
  --font: -apple-system, "Segoe UI", sans-serif;
  --mono: "SF Mono", "Fira Code", monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #131312;
    --surface: #1e1d1b;
    --surface2: #252422;
    --border: rgba(255,255,255,0.1);
    --border-strong: rgba(255,255,255,0.2);
    --text: #e8e6e0;
    --text2: #9a9890;
    --text3: #5a5955;
    --blue: #5ba3f5;
    --blue-bg: #0c2a4a;
    --blue-text: #90c4f8;
    --teal: #4dcaa5;
    --teal-bg: #04342c;
    --teal-text: #9fe1cb;
    --amber: #ef9f27;
    --amber-bg: #412402;
    --amber-text: #fac775;
    --red: #f09595;
    --red-bg: #501313;
    --red-text: #f7c1c1;
    --purple: #afa9ec;
    --purple-bg: #26215c;
    --purple-text: #cecbf6;
  }
}

html { font-family: var(--font); background: var(--bg); color: var(--text); }
body { min-height: 100vh; }

input, textarea, select, button {
  font-family: inherit;
  font-size: 14px;
  color: var(--text);
}

input[type="text"], input[type="search"], textarea {
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}
input[type="text"]:focus, textarea:focus {
  border-color: var(--blue);
}
textarea { resize: vertical; min-height: 80px; line-height: 1.6; }

button {
  cursor: pointer;
  border: 0.5px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: transparent;
  padding: 7px 14px;
  transition: background 0.12s, opacity 0.12s;
}
button:hover { background: var(--surface2); }
button:disabled { opacity: 0.45; cursor: not-allowed; }

.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}
