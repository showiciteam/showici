"use client";

import { useEffect, useState } from "react";

/**
 * Temporary font preview. Open any page with ?font=a…f to see the whole site in that font
 * (only in your browser; it sticks while you click around). ?font=off goes back to normal.
 */
const OPTIONS: Record<string, { name: string; display: string; sans: string; css?: string; families: string }> = {
  a: { name: "A · Current (Fraunces + DM Sans)", display: "'Fraunces', serif", sans: "'DM Sans', sans-serif", families: "" },
  b: { name: "B · Plus Jakarta Sans + Inter", display: "'Plus Jakarta Sans', sans-serif", sans: "'Inter', sans-serif", families: "family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Inter:wght@400;500;700" },
  c: { name: "C · Bricolage Grotesque + Inter", display: "'Bricolage Grotesque', sans-serif", sans: "'Inter', sans-serif", families: "family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;700" },
  d: { name: "D · Outfit", display: "'Outfit', sans-serif", sans: "'Outfit', sans-serif", families: "family=Outfit:wght@400;500;600;700;800" },
  e: { name: "E · DM Serif Display + DM Sans", display: "'DM Serif Display', serif", sans: "'DM Sans', sans-serif", css: ".h-display,h1,h2,h3{font-weight:400!important}", families: "family=DM+Serif+Display" },
  f: { name: "F · Archivo", display: "'Archivo', sans-serif", sans: "'Archivo', sans-serif", css: ".h-display,h1,h2{font-weight:900!important;letter-spacing:-0.03em}", families: "family=Archivo:wght@400;500;600;700;800;900" },
};

export function FontPreview() {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("font")?.toLowerCase();
    let k: string | null = null;
    try {
      if (q === "off") sessionStorage.removeItem("font-preview");
      else if (q && OPTIONS[q]) sessionStorage.setItem("font-preview", q);
      k = sessionStorage.getItem("font-preview");
    } catch {
      k = q && OPTIONS[q] ? q : null;
    }
    setKey(k && OPTIONS[k] ? k : null);
  }, []);

  if (!key) return null;
  const o = OPTIONS[key];
  const go = (k: string) => {
    const u = new URL(window.location.href);
    u.searchParams.set("font", k);
    window.location.href = u.toString();
  };
  return (
    <>
      {o.families && <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${o.families}&display=swap`} />}
      <style>{`:root{--font-display:${o.display}!important;--font-sans:${o.sans}!important}body,.input,button,select,textarea{font-family:${o.sans}!important}.h-display,h1,h2,h3{font-family:${o.display}!important}${o.css ?? ""}`}</style>
      <div style={{ position: "fixed", left: 12, bottom: 12, zIndex: 1000, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, background: "#14213D", color: "#fff", padding: "8px 10px", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,.25)", font: "600 13px system-ui, sans-serif", maxWidth: "calc(100vw - 24px)" }}>
        <span style={{ marginRight: 4 }}>Font preview: {o.name}</span>
        {Object.keys(OPTIONS).map((k) => (
          <button key={k} type="button" onClick={() => go(k)} style={{ font: "700 13px system-ui, sans-serif", width: 28, height: 28, borderRadius: 8, border: 0, cursor: "pointer", background: k === key ? "#A485FF" : "rgba(255,255,255,.12)", color: k === key ? "#14213D" : "#fff" }}>
            {k.toUpperCase()}
          </button>
        ))}
        <button type="button" onClick={() => go("off")} style={{ font: "600 12px system-ui, sans-serif", marginLeft: 4, background: "transparent", color: "#C9CEDA", border: 0, textDecoration: "underline", cursor: "pointer" }}>Exit</button>
      </div>
    </>
  );
}
