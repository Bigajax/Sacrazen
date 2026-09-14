import Image from "next/image";
import Link from "next/link";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { ehServico } from "@/lib/servicos";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão do portal: foto em cima, a categoria como etiqueta, o nome em
 * caixa alta, o preço e o botão. O botão leva à página da peça, onde a
 * pessoa escolhe quantidade e tamanho antes de mandar para o WhatsApp:
 * mandar direto daqui chegaria pela metade.
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
  const atendimento = ehServico(produto);
  const href = `/produto/${produto.slug}`;

  return (
    <article className="cartao flex h-full flex-col">
      <Link href={href} className="foto block aspect-[4/3]" aria-label={produto.nome}>
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
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {categoria ? <p className="etiqueta">{categoria.nome}</p> : null}
        <h3 className="titulo-cartao mt-1.5 text-tinta">
          <Link href={href} className="hover:text-ametista">
            {produto.nome}
          </Link>
        </h3>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
          {vigente ? (
            <p className="preco flex flex-col leading-none text-tinta">
              {promo && cheio ? <span className="mb-1 text-[0.75rem] font-medium text-tinta-fraca line-through">{cheio}</span> : null}
              <span className="text-[1.125rem]">{vigente}</span>
            </p>
          ) : (
            <p className="miudo leading-tight">{atendimento ? "Valor na conversa" : "Preço na conversa"}</p>
          )}
          <Link href={href} className="btn btn--cta w-full shrink-0 px-3.5 py-2.5 text-[0.8125rem] sm:w-auto">
            {atendimento ? "Agendar" : "Quero"}
          </Link>
        </div>
      </div>
    </article>
  );
}
