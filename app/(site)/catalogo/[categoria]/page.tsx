import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { SERVICOS, separar } from "@/lib/servicos";
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

  /* a mesa não é prateleira: quem cai aqui pela categoria vai para a
     página dos atendimentos */
  if (SERVICOS.has(categoria)) redirect("/atendimentos");

  const atual = categorias.find((c) => c.slug === categoria);
  if (!atual) notFound();

  const { pecas, categoriasDaLoja } = separar(produtos, categorias);
  const quantas = pecas.filter((p) => p.categoria_slug === categoria).length;

  return (
    <>
      <header className="mx-auto max-w-[72rem] px-4 pb-6 pt-8 sm:px-6 lg:px-10 lg:pb-8 lg:pt-12">
        <p className="etiqueta">A prateleira</p>
        <h1 className="manchete mt-2 text-[clamp(1.75rem,4vw,2.5rem)] text-tinta">{atual.nome}</h1>
        <p className="falada mt-2 text-[1.0625rem] text-tinta-fraca">
          {quantas} {quantas === 1 ? "peça" : "peças"} nesta prateleira.
        </p>
      </header>
      <Catalogo
        produtos={pecas}
        categorias={categoriasDaLoja}
        categoriaAtual={atual.slug}
        linkWhats={linkGeral(config.whatsapp)}
      />
    </>
  );
}
