import Image from "next/image";
import Link from "next/link";
import { linkAgendar } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O que a SacraZen faz antes de vender qualquer coisa: a mesa dos dois
 * pais de santo. Não é uma grade de cards, é uma lista de atendimentos,
 * com a foto de quem atende ao lado e um botão só, o de agendar.
 * O valor não aparece porque a loja combina na conversa.
 */
export function Atendimentos({ atendimentos, whatsapp }: { atendimentos: Produto[]; whatsapp: string }) {
  if (!atendimentos.length) return null;

  return (
    <section id="atendimentos" aria-labelledby="titulo-atendimentos" className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 id="titulo-atendimentos" className="display-secao text-cera">
          Atendimentos
        </h2>
      </div>
      <p className="falada mt-3 max-w-[38ch] text-[1.25rem] text-cera-fraca">
        Tarô, baralho cigano e limpeza espiritual com a Mãe Meli e o Pai Gustavo, na mesma mesa.
      </p>

      <ul className="mt-8 grid gap-x-10 lg:grid-cols-2">
        {atendimentos.map((a) => {
          const foto = a.imagens[0];
          return (
            <li key={a.id} className="flex gap-4 border-t border-[color:var(--fio)] py-5 sm:gap-6">
              <Link href={`/produto/${a.slug}`} className="foto aspect-[4/5] w-24 shrink-0 sm:w-28" aria-label={a.nome}>
                {foto ? (
                  <Image
                    src={foto.url}
                    alt=""
                    fill
                    sizes="112px"
                    placeholder={foto.blur ? "blur" : "empty"}
                    blurDataURL={foto.blur ?? undefined}
                    className="object-cover"
                  />
                ) : null}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="display text-[1.375rem] text-cera">
                  <Link href={`/produto/${a.slug}`} className="hover:text-latao">
                    {a.nome}
                  </Link>
                </h3>
                {a.descricao ? <p className="miudo mt-1.5 max-w-[46ch]">{a.descricao}</p> : null}
                <div className="mt-auto pt-4">
                  <a href={linkAgendar(a.nome, whatsapp)} target="_blank" rel="noreferrer" className="btn btn--linha px-4 py-2.5 text-[0.875rem]">
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
