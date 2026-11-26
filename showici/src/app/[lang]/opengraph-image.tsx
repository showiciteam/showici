import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The picture shown when a ShowIci link is shared (WhatsApp, Facebook, iMessage, LinkedIn, X…).
export const alt = "ShowIci · La scène d’ici, à découvrir · Local artists, venues and shows in Québec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0B0D";
const RED = "#E3262F";
const WHITE = "#FFFFFF";

const TEXT = {
  fr: { title: "La scène d’ici. À découvrir.", sub: "Groupes, DJ, humoristes, magiciens · Salles et événements privés", chips: ["Sans commission", "Français · English"] },
  en: { title: "The local scene. Go discover it.", sub: "Bands, DJs, comedians, magicians · Venues and private events", chips: ["No commission", "Français · English"] },
};

/** Loads one Google Font weight as TTF so the preview matches the site's headings. */
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

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TEXT[lang === "en" ? "en" : "fr"];
  const logo = await readFile(join(process.cwd(), "public/logo-light.png"))
    .then((file) => `data:image/png;base64,${file.toString("base64")}`)
    .catch(() => null); // the image still renders, without the logo
  const [bold, boldItalic, sans] = await Promise.all([googleFont("Plus+Jakarta+Sans", 800), googleFont("Plus+Jakarta+Sans", 800, true), googleFont("Inter", 500)]);
  const fonts = [
    bold && { name: "Plus Jakarta Sans", data: bold, weight: 800 as const, style: "normal" as const },
    boldItalic && { name: "Plus Jakarta Sans", data: boldItalic, weight: 800 as const, style: "italic" as const },
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
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
          backgroundColor: INK,
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(215,20,31,0.55), rgba(215,20,31,0) 60%)",
          color: WHITE,
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        {logo && <img src={logo} alt="ShowIci" width={420} height={138} style={{ marginLeft: -8 }} />}

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>{t.title}</div>
          <div style={{ fontSize: 32, color: "#C9C9CF", fontFamily: "Inter, sans-serif" }}>{t.sub}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Inter, sans-serif" }}>
          <div style={{ display: "flex", gap: 14, fontSize: 28 }}>
            {t.chips.map((chip) => (
              <div key={chip} style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: `2px solid ${RED}`, color: WHITE }}>
                {chip}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#C9C9CF" }}>Québec · Montréal</div>
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size,
  );
}
