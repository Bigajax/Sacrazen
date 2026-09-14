import type { Metadata } from "next";
import { Catalogo } from "@/components/Catalogo";
import { Regua } from "@/components/Moldura";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Tudo que está na prateleira da SacraZen: cristais, incensos, velas, tarô, imagens e o que mais a loja tem. Pedidos pelo WhatsApp.",
  alternates: { canonical: "/catalogo" },
};

export default async function PaginaCatalogo({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string }>;
}) {
  const [{ categorias, produtos }, config, sp] = await Promise.all([
    carregarCatalogo(),
    obterConfig(),
    searchParams,
  ]);

  const ativos = produtos.filter((p) => p.ativo);

  return (
    <>
      <header className="mx-auto max-w-[72rem] px-4 pb-10 pt-12 sm:px-6 lg:px-10 lg:pb-14 lg:pt-16">
        <Regua>Catálogo</Regua>
      </header>
      <Catalogo
        produtos={ativos}
        categorias={categorias}
        buscaInicial={sp.busca ?? ""}
        linkWhats={linkGeral(config.whatsapp)}
      />
    </>
  );
}
