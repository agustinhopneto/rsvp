import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 18% 15%, rgba(102,238,255,0.2), transparent 46%), radial-gradient(circle at 84% 12%, rgba(255,79,163,0.24), transparent 40%), #050712",
          border: "1.5px solid rgba(102,238,255,0.7)",
          borderRadius: 8,
          boxShadow:
            "inset 0 0 0 1px rgba(255,79,163,0.28), 0 0 10px rgba(102,238,255,0.35)",
          color: "#66eeff",
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: -0.6,
          fontFamily:
            "Outfit, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textShadow:
            "0 0 2px rgba(102,238,255,0.9), 0 0 8px rgba(102,238,255,0.45)",
        }}
      >
        30
      </div>
    ),
    size,
  );
}
