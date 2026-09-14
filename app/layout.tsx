import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* Uma família só, a Montserrat, como nos portais de conteúdo: o peso faz
   a hierarquia (800 na manchete, 700 nos títulos em caixa alta, 400 e 500
   no corpo). */
const display = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fonte-display",
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
      <body className={`${display.variable} antialiased`}>{children}</body>
    </html>
  );
}
