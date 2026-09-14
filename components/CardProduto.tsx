import Image from "next/image";
import Link from "next/link";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão do portal: foto em cima, a categoria como etiqueta, o nome em
 * caixa alta e o preço. Branco, com borda, sem sombra até o hover.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigente = precoBRL(produto.preco_promocional ?? produto.preco);
  const atendimento = produto.categoria_slug === "atendimentos" || produto.categoria_slug === "cursos";

  return (
    <article className="cartao h-full">
      <Link href={`/produto/${produto.slug}`} className="flex h-full flex-col">
        <div className="foto aspect-[4/3]">
          {capa ? (
            <Image
              src={capa.url}
              alt={capa.alt ?? produto.nome}
              fill
              sizes={tamanhos}
              placeholder={capa.blur ? "blur" : "empty"}
              blurDataURL={capa.blur ?? undefined}
              priority={prioridade}
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4">
          {categoria ? <p className="etiqueta">{categoria.nome}</p> : null}
          <h3 className="titulo-cartao mt-1.5 text-tinta">{produto.nome}</h3>
          <div className="mt-auto pt-3">
            {vigente ? (
              <p className="preco flex items-baseline gap-2 text-[1.0625rem] text-tinta">
                {promo && cheio ? <span className="text-[0.8125rem] font-medium text-tinta-fraca line-through">{cheio}</span> : null}
                <span>{vigente}</span>
              </p>
            ) : (
              <p className="miudo">{atendimento ? "Valor na conversa" : "Preço no WhatsApp"}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
