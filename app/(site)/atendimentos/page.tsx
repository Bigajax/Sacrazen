import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Desenho } from "@/components/Portas";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkAgendar } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Atendimentos",
  description:
    "Consulta de tarô e baralho cigano com dois pais de santo, limpeza espiritual, mapa astral cármico, reiki e escalda-pés. Na SacraZen, em Uberaba, MG. Agende pelo WhatsApp.",
  alternates: { canonical: "/atendimentos" },
};

/* a frase de cada atendimento, na voz da mesa; o que não estiver aqui usa
   a descrição do catálogo */
const FRASES: Record<string, string> = {
  "consulta-de-taro": "Dois oráculos, uma mesa. Você pergunta, a Mãe e o Pai leem.",
  "limpeza-espiritual": "Defumação para tirar o peso e abrir caminho.",
  "mapa-astral": "O que a alma trouxe, e o que veio resolver.",
  "escalda-pes": "Para desacelerar de verdade, dos pés para cima.",
  "sessao-de-reiki": "Energia na maca, com a terapeuta ao lado.",
  "curso-de-reiki": "Para quem quer levar o Reiki para a própria mão.",
};
const NUMERAIS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * A mesa, numa página só dela: não é catálogo, é agenda. Cada
 * atendimento é uma carta grande, com a foto, a frase e o botão de
 * agendar; não tem preço, filtro nem quantidade.
 */
export default async function PaginaAtendimentos() {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const { atendimentos } = separar(produtos, categorias);

  return (
    <div className="mx-auto max-w-[72rem] px-4 pb-20 pt-8 sm:px-6 lg:px-10 lg:pt-12">
      <header className="max-w-[52ch]">
        <p className="etiqueta">A mesa</p>
        <h1 className="manchete mt-2 text-[clamp(1.75rem,4vw,2.5rem)] text-tinta">Atendimentos</h1>
        <p className="falada mt-3 text-[1.0625rem] text-tinta-fraca">
          Com a Mãe Meli e o Pai Gustavo, em Uberaba. Você escolhe o atendimento, a gente combina dia, horário e valor
          na conversa.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-6">
        {atendimentos.map((a, i) => {
          const foto = a.slug.startsWith("consulta-de-taro")
            ? (a.imagens.find((img) => img.url.endsWith("-3.webp")) ?? a.imagens[0])
            : a.imagens[0];
          const chave = Object.keys(FRASES).find((k) => a.slug.startsWith(k));
          const frase = chave ? FRASES[chave] : a.descricao;
          return (
            <li key={a.id} className="cartao flex flex-col">
              <Link href={`/produto/${a.slug}`} className="foto block aspect-[16/10]">
                {foto ? (
                  <Image
                    src={foto.url}
                    alt={a.nome}
                    fill
                    sizes="(max-width: 640px) 100vw, 46vw"
                    placeholder={foto.blur ? "blur" : "empty"}
                    blurDataURL={foto.blur ?? undefined}
                    className="object-cover"
                  />
                ) : null}
              </Link>
              <div className="flex flex-1 items-start gap-4 p-5">
                <span className="carta" aria-hidden="true">
                  <span className="carta__numero">{NUMERAIS[i] ?? ""}</span>
                  <Desenho slug={a.slug} className="h-9 w-9" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="titulo-cartao text-[0.9375rem] text-tinta">{a.nome}</h2>
                  {frase ? <p className="falada mt-1 text-[0.9375rem] text-tinta-fraca">{frase}</p> : null}
                  {a.descricao && frase !== a.descricao ? <p className="miudo mt-2">{a.descricao}</p> : null}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a href={linkAgendar(a.nome, config.whatsapp)} target="_blank" rel="noreferrer" className="btn btn--cta px-5 py-3 text-[0.9375rem]">
                      Quero agendar
                    </a>
                    <Link href={`/produto/${a.slug}`} className="text-[0.875rem] font-medium text-ametista hover:underline">
                      Saber mais
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
