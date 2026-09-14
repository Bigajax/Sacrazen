import Link from "next/link";
import { CardProduto } from "./CardProduto";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * Uma seção do portal: o título em caixa alta com o fio embaixo e o
 * "ver todas" à direita; embaixo, uma grade de quatro cartões (no
 * celular, um trilho que rola de lado).
 */
export function Prateleira({
  titulo,
  href,
  produtos,
  categorias,
  prioridade = false,
  mostrarCategoria = true,
}: {
  titulo: string;
  href: string;
  produtos: Produto[];
  categorias: Categoria[];
  prioridade?: boolean;
  /** nas prateleiras de uma categoria só, a etiqueta repetiria o título */
  mostrarCategoria?: boolean;
}) {
  if (!produtos.length) return null;
  const porSlug = new Map(categorias.map((c) => [c.slug, c]));

  return (
    <section aria-label={titulo} className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 className="secao text-tinta">{titulo}</h2>
        <Link href={href} className="btn btn--texto">
          Ver todas
        </Link>
      </div>

      <ul className="faixa-scroll -mx-4 mt-5 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {produtos.slice(0, 4).map((p, i) => (
          <li key={p.id} className="w-[64vw] shrink-0 sm:w-[16rem] lg:w-auto">
            <CardProduto
              produto={p}
              categoria={mostrarCategoria ? porSlug.get(p.categoria_slug ?? "") : null}
              prioridade={prioridade && i < 2}
              tamanhos="(max-width: 640px) 64vw, (max-width: 1024px) 16rem, 17rem"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
