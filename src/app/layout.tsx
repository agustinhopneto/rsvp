import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const eventTitle = "Churrascão dos 30 do Agustinho";
const eventDescription =
  "Você foi convidado! 11 de Abril de 2026 às 14h30, na Av. Vereador José Diniz, 599. Confirme sua presença em poucos segundos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${eventTitle} | RSVP`,
  description: eventDescription,
  icons: {
    icon: "/icon",
    shortcut: "/icon",
  },
  openGraph: {
    title: `${eventTitle} | RSVP`,
    description: eventDescription,
    type: "website",
    locale: "pt_BR",
    siteName: "RSVP Cyberpunk",
    url: "/",
    images: [
      {
        url: "/opengraph-image?v=20260401",
        width: 1200,
        height: 630,
        alt: `${eventTitle} - Convite e confirmação de presença`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${eventTitle} | RSVP`,
    description: eventDescription,
    images: ["/twitter-image?v=20260401"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050712",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
