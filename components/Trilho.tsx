import Link from "next/link";
import { CardProduto } from "./CardProduto";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * Uma prateleira por categoria: o nome, quantas peças, e o trilho que
 * rola de lado com o dedo. Três peças à vista num celular. Sem filtro
 * na home: a categoria já é o filtro, e "ver todas" leva à estante.
 */
export function Trilho({
  categoria,
  produtos,
  quantas,
  prioridade = false,
}: {
  categoria: Categoria;
  produtos: Produto[];
  quantas: number;
  prioridade?: boolean;
}) {
  if (!produtos.length) return null;

  return (
    <section aria-labelledby={`trilho-${categoria.slug}`} className="py-8 lg:py-10">
      <div className="mx-auto flex max-w-[72rem] items-baseline justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <h3 id={`trilho-${categoria.slug}`} className="display text-[clamp(1.5rem,2.4vw,1.875rem)] text-cera">
          {categoria.nome}
          <span className="preco ml-3 text-[1rem] text-madeira">{quantas}</span>
        </h3>
        <Link href={`/catalogo/${categoria.slug}`} className="btn btn--texto shrink-0 text-[0.875rem]">
          Ver todas
        </Link>
      </div>

      <ul className="faixa-scroll mx-auto mt-4 flex max-w-[72rem] gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10">
        {produtos.map((p, i) => (
          <li key={p.id} className="w-[40vw] shrink-0 sm:w-[15rem] lg:w-[16rem]">
            <CardProduto produto={p} prioridade={prioridade && i < 3} tamanhos="(max-width: 640px) 40vw, 16rem" />
          </li>
        ))}
        {quantas > produtos.length ? (
          <li className="flex w-[40vw] shrink-0 items-stretch sm:w-[15rem] lg:w-[16rem]">
            <Link
              href={`/catalogo/${categoria.slug}`}
              className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-md border border-[color:var(--fio)] text-center text-cera hover:border-madeira"
            >
              <span className="preco text-[2rem] text-latao">+{quantas - produtos.length}</span>
              <span className="miudo mt-1">na estante</span>
            </Link>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
