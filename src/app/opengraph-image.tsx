import { ImageResponse } from "next/og";

export const alt = "Churrascão dos 30 do Agustinho - RSVP";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 15% 20%, rgba(102,238,255,0.25), transparent 40%), radial-gradient(circle at 85% 15%, rgba(255,79,163,0.22), transparent 34%), linear-gradient(180deg, #050712 0%, #070b17 100%)",
        color: "#ebefff",
        fontFamily: "Outfit, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 28,
          border: "1px solid rgba(102,238,255,0.45)",
          borderRadius: 28,
          boxShadow:
            "inset 0 0 0 1px rgba(255,79,163,0.22), 0 0 28px rgba(102,238,255,0.22)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 2,
            color: "#ff4fa3",
          }}
        >
          {"// CONVITE.EXE v3.0"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 0.95,
              fontWeight: 700,
              color: "#66eeff",
              textShadow:
                "0 0 2px rgba(102,238,255,0.9), 0 0 14px rgba(102,238,255,0.5)",
            }}
          >
            Churrascão dos 30
            <br />
            do Agustinho
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              color: "#d6dcf1",
            }}
          >
            Você foi convidado. Confirme sua presença.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#66eeff",
            }}
          >
            11 de Abril de 2026 • 14h30
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              color: "#ebefff",
            }}
          >
            Av. Vereador José Diniz, 599 - Salão de Festas
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
