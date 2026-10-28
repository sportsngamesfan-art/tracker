import { ImageResponse } from "next/og";
export const alt = "Harry Kane — The Pursuit of Gold";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#090c11",
        color: "#f1efe9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
      }}
    >
      <div
        style={{
          color: "#d6ad60",
          fontSize: 22,
          letterSpacing: 6,
          marginBottom: 45,
        }}
      >
        AN INDEPENDENT FOOTBALL DOCUMENTARY
      </div>
      <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
        HARRY KANE.
      </div>
      <div style={{ fontSize: 72, color: "#d6ad60" }}>THE PURSUIT OF GOLD.</div>
      <div style={{ fontSize: 24, marginTop: 45 }}>
        London → Munich. The long way to the top.
      </div>
    </div>,
    size,
  );
}
