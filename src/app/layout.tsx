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

export const metadata: Metadata = {
  title: "RSVP Cyberpunk",
  description: "Projeto full-stack Next.js + Supabase para RSVP.",
  icons: {
    icon: "/icon",
    shortcut: "/icon",
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
