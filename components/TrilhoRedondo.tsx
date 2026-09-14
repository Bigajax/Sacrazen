import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * O trilho de rodinhas do portal: a foto redonda com o aro de latão,
 * quem atende em cima e o nome embaixo. Rola de lado e sangra na
 * margem direita, avisando que tem mais.
 */

/* quem faz cada atendimento, pela chave do slug */
const QUEM: Record<string, string> = {
  "consulta-de-taro": "Mãe Meli e Pai Gustavo",
  "limpeza-espiritual": "Mãe Meli e Pai Gustavo",
  "mapa-astral": "Mãe Meli",
  "escalda-pes": "Na loja",
  "sessao-de-reiki": "Na loja",
  "curso-de-reiki": "SacraZen",
};
function quemFaz(p: Produto, padrao: string) {
  const chave = Object.keys(QUEM).find((k) => p.slug.startsWith(k));
  return chave ? QUEM[chave] : padrao;
}

/* a foto que representa cada um: a da mesa para a consulta (a terceira
   do carrossel, sem texto por cima); o resto usa a capa */
function fotoDe(p: Produto) {
  if (p.slug.startsWith("consulta-de-taro")) return p.imagens.find((i) => i.url.endsWith("-3.webp")) ?? p.imagens[0];
  return p.imagens[0];
}

export function TrilhoRedondo({
  titulo,
  href,
  itens,
  quem = "SacraZen",
}: {
  titulo: string;
  href: string;
  itens: Produto[];
  quem?: string;
}) {
  if (!itens.length) return null;

  return (
    <section aria-label={titulo} className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 className="secao text-tinta">{titulo}</h2>
        <Link href={href} className="text-[0.9375rem] font-medium text-ametista hover:underline">
          Todos os atendimentos
        </Link>
      </div>

      <ul className="faixa-scroll -mx-4 mt-7 flex gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:gap-8 lg:px-0">
        {itens.map((a) => {
          const foto = fotoDe(a);
          return (
            <li key={a.id} className="w-[9.5rem] shrink-0 text-center lg:w-[10.5rem]">
              <Link href={`/produto/${a.slug}`} className="group block">
                <span className="foto mx-auto block h-[8.5rem] w-[8.5rem] rounded-full ring-2 ring-latao/60 ring-offset-2 ring-offset-fundo transition-[box-shadow] group-hover:ring-latao lg:h-[9.5rem] lg:w-[9.5rem]">
                  {foto ? <Image src={foto.url} alt="" fill sizes="152px" className="object-cover" /> : null}
                </span>
                <span className="miudo mt-3 block text-[0.8125rem]">{quemFaz(a, quem)}</span>
                <span className="block text-[0.9375rem] font-semibold leading-snug text-tinta group-hover:text-ametista">
                  {a.nome.split(" com ")[0]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
