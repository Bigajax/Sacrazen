import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalogo } from "@/components/Catalogo";
import { Regua } from "@/components/Moldura";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";

type Props = { params: Promise<{ categoria: string }> };

export async function generateStaticParams() {
  const { categorias } = await carregarCatalogo();
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const { categorias, produtos } = await carregarCatalogo();
  const atual = categorias.find((c) => c.slug === categoria);
  if (!atual) return {};

  const quantas = produtos.filter(
    (p) => p.ativo && p.categoria_slug === categoria,
  ).length;

  return {
    title: atual.nome,
    description: `${atual.nome} na SacraZen: ${quantas} ${quantas === 1 ? "peça" : "peças"} em Uberaba, MG. Pedidos pelo WhatsApp.`,
    alternates: { canonical: `/catalogo/${atual.slug}` },
    openGraph: {
      title: `${atual.nome} · SacraZen`,
      description: `${atual.nome} na SacraZen, Uberaba, MG.`,
      url: `/catalogo/${atual.slug}`,
      images: [
        {
          url: `/og/categoria-${atual.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${atual.nome} · SacraZen`,
        },
      ],
    },
  };
}

export default async function PaginaCategoria({ params }: Props) {
  const { categoria } = await params;
  const [{ categorias, produtos }, config] = await Promise.all([
    carregarCatalogo(),
    obterConfig(),
  ]);

  const atual = categorias.find((c) => c.slug === categoria);
  if (!atual) notFound();

  const ativos = produtos.filter((p) => p.ativo);
  const quantas = ativos.filter((p) => p.categoria_slug === categoria).length;

  return (
    <>
      <header className="mx-auto max-w-[72rem] px-4 pb-10 pt-12 sm:px-6 lg:px-10 lg:pb-14 lg:pt-16">
        <Regua>{atual.nome}</Regua>
        <p className="miudo mt-3">
          {quantas} {quantas === 1 ? "peça" : "peças"}
        </p>
      </header>
      <Catalogo
        produtos={ativos}
        categorias={categorias}
        categoriaAtual={atual.slug}
        linkWhats={linkGeral(config.whatsapp)}
      />
    </>
  );
}
