import type { Metadata } from "next";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "A loja",
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

  /* só a prateleira: os atendimentos têm página própria */
  const { pecas, categoriasDaLoja } = separar(produtos, categorias);

  return (
    <>
      <header className="mx-auto max-w-[72rem] px-4 pb-6 pt-8 sm:px-6 lg:px-10 lg:pb-8 lg:pt-12">
        <p className="etiqueta">A prateleira</p>
        <h1 className="manchete mt-2 text-[clamp(1.75rem,4vw,2.5rem)] text-tinta">A loja</h1>
        <p className="falada mt-2 max-w-[48ch] text-[1.0625rem] text-tinta-fraca">
          {pecas.length} peças, do jeito que estão na prateleira. Toca numa para pedir pelo WhatsApp.
        </p>
      </header>
      <Catalogo
        produtos={pecas}
        categorias={categoriasDaLoja}
        buscaInicial={sp.busca ?? ""}
        linkWhats={linkGeral(config.whatsapp)}
      />
    </>
  );
}
