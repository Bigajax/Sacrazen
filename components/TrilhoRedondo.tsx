import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * O trilho de rodinhas do portal: foto redonda, uma linha em cima
 * (quem faz) e o nome embaixo. Usado para os atendimentos.
 */
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
        <Link href={href} className="btn btn--texto">
          Todos os atendimentos
        </Link>
      </div>

      <ul className="faixa-scroll -mx-4 mt-6 flex gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        {itens.map((a) => {
          const foto = a.imagens[0];
          return (
            <li key={a.id} className="w-[8.5rem] shrink-0 text-center">
              <Link href={`/produto/${a.slug}`} className="group block">
                <span className="foto mx-auto block h-[7rem] w-[7rem] rounded-full border-2 border-cartao shadow-[0_6px_16px_-8px_rgba(27,46,92,0.5)]">
                  {foto ? <Image src={foto.url} alt="" fill sizes="112px" className="object-cover" /> : null}
                </span>
                <span className="miudo mt-3 block text-[0.75rem]">{quem}</span>
                <span className="block text-[0.8125rem] font-semibold leading-snug text-tinta group-hover:text-ametista">
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
