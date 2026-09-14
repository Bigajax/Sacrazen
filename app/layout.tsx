import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* Cormorant é a display: o nome na placa, os títulos, os preços e a
   frase falada em itálico. A Inter faz todo o resto e não aparece. */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Inter({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SacraZen — Tarô, umbanda, cristais e incenso em Uberaba",
    template: "%s · SacraZen",
  },
  description:
    "Loja esotérica e religiosa em Uberaba, MG, desde 2018. Consultas de tarô e baralho cigano com dois pais de santo, limpeza espiritual, cristais, incensos, velas e imagens. Atendimento pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "SacraZen",
    url: site.url,
    title: "SacraZen — Tarô, umbanda, cristais e incenso em Uberaba",
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "SacraZen" }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
