import Image from "next/image";
import Link from "next/link";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import type { Produto } from "@/lib/tipos";

/**
 * A peça na prateleira: a foto como veio, o nome em uma ou duas linhas,
 * o preço em Cormorant. Sem caixa, sem sombra: o que separa uma peça da
 * outra é o espaço, e o fio de madeira embaixo do preço.
 */
export function CardProduto({
  produto,
  prioridade = false,
  tamanhos = "(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigente = precoBRL(produto.preco_promocional ?? produto.preco);
  const atendimento = produto.categoria_slug === "atendimentos" || produto.categoria_slug === "cursos";

  return (
    <article className="group">
      <Link href={`/produto/${produto.slug}`} className="block rounded-md focus:outline-none focus-visible:outline">
        <div className="foto aspect-[4/5]">
          {capa ? (
            <Image
              src={capa.url}
              alt={capa.alt ?? produto.nome}
              fill
              sizes={tamanhos}
              placeholder={capa.blur ? "blur" : "empty"}
              blurDataURL={capa.blur ?? undefined}
              priority={prioridade}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : null}
        </div>

        <div className="border-b border-[color:var(--fio)] pb-3 pt-3">
          <h3 className="display-peca text-cera">{produto.nome}</h3>
          {vigente ? (
            <p className="preco mt-1 flex items-baseline gap-2 text-[1.25rem] text-latao">
              {promo && cheio ? <span className="text-[0.9375rem] text-cera-fraca line-through">{cheio}</span> : null}
              <span>{vigente}</span>
            </p>
          ) : (
            <p className="miudo mt-1">{atendimento ? "Valor e horários no WhatsApp" : "Preço no WhatsApp"}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
