import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_DIR = join(process.cwd(), "src", "app", "fonts");

export default async function OpenGraphImage() {
  const [serifRegular, serifItalic] = await Promise.all([
    readFile(join(FONT_DIR, "InstrumentSerif-Regular.ttf")),
    readFile(join(FONT_DIR, "InstrumentSerif-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0b09",
          backgroundImage:
            "radial-gradient(900px 700px at 8% 4%, rgba(255,138,42,0.10), transparent 70%), radial-gradient(800px 700px at 96% 96%, rgba(64,120,255,0.10), transparent 70%)",
          padding: "72px 80px",
          color: "#f0efeb",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a857e",
          }}
        >
          {site.hero.greeting}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 172,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name.first}
          </span>
          <span style={{ width: 28 }} />
          <span
            style={{
              fontFamily: "Instrument Serif Italic",
              fontStyle: "italic",
              fontSize: 172,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#d4d0c8",
            }}
          >
            {site.name.last}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(240,239,235,0.16)",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: "0.14em",
            color: "#8a857e",
          }}
        >
          <span>{site.hero.meta.join("   /   ").toUpperCase()}</span>
          <span>{site.domain.toUpperCase()}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: serifRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif Italic",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
