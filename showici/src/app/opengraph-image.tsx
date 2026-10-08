import { ImageResponse } from "next/og";

// The picture shown when a ShowIci link is shared (WhatsApp, Facebook, iMessage, LinkedIn, X…).
export const alt = "ShowIci · Book local talent for every stage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#14213D";
const BRASS = "#D9A441";
const WARM_WHITE = "#FBF8F2";

/** Loads one Google Font weight as TTF so the preview matches the site's Fraunces headings. */
async function googleFont(family: string, weight: number, italic = false): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:ital,wght@${italic ? 1 : 0},${weight}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
    }).then((r) => r.text());
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return src ? await fetch(src).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null; // fall back to the default font
  }
}

export default async function OpengraphImage() {
  const [bold, boldItalic, sans] = await Promise.all([googleFont("Fraunces", 700), googleFont("Fraunces", 700, true), googleFont("DM+Sans", 500)]);
  const fonts = [
    bold && { name: "Fraunces", data: bold, weight: 700 as const, style: "normal" as const },
    boldItalic && { name: "Fraunces", data: boldItalic, weight: 700 as const, style: "italic" as const },
    sans && { name: "DM Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: NAVY,
          color: WARM_WHITE,
          fontFamily: "Fraunces, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* Spotlight pin */}
          <div style={{ display: "flex", position: "relative", width: 72, height: 92 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 36,
                background: BRASS,
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 14, background: NAVY }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 58,
                width: 28,
                height: 28,
                background: BRASS,
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>
            <span>Show</span>
            <span style={{ color: BRASS, fontStyle: "italic" }}>Ici</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>Book local talent for every stage.</div>
          <div style={{ fontSize: 32, color: "#C9CEDA", fontFamily: "DM Sans, sans-serif" }}>
            Bands, DJs, comedians, magicians · Venues and private events
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "DM Sans, sans-serif" }}>
          <div style={{ display: "flex", gap: 14, fontSize: 28 }}>
            {["Free", "No commission", "Français · English"].map((t) => (
              <div key={t} style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: `2px solid ${BRASS}`, color: BRASS }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#C9CEDA" }}>Montréal · Canada</div>
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size,
  );
}
