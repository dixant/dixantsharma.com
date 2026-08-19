import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** A single serif-italic D on the dark brand field. */
export default async function Icon() {
  const italic = await readFile(
    join(process.cwd(), "src", "app", "fonts", "InstrumentSerif-Italic.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0b09",
          color: "#f0efeb",
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontSize: 48,
          lineHeight: 1,
        }}
      >
        D
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
