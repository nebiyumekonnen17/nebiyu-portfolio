import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0e17 0%, #10151f 60%, #161c2a 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 16,
              background: "#e3a83b",
              color: "#141008",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            NM
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#94a1b8", fontWeight: 600 }}>
            {profile.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, color: "#f3f5f8", lineHeight: 1.15, maxWidth: 980 }}>
            I build real software systems on AWS that solve problems.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 1000 }}>
            {profile.positioning.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: "#e3a83b",
                  border: "1px solid rgba(227,168,59,0.4)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  background: "rgba(227,168,59,0.08)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
