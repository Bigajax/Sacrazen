import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Desenho } from "@/components/Portas";
import { FioDeLuas, Teto } from "@/components/Teto";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkAgendar, linkWhatsApp } from "@/lib/whatsapp";

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

const PASSOS = [
  { titulo: "Você escolhe e chama", texto: "Um toque no botão abre o WhatsApp com o atendimento já escrito." },
  { titulo: "A gente combina", texto: "Dia, horário e valor, na conversa, em horário de loja." },
  { titulo: "A mesa te recebe", texto: "Na loja, no bairro Guanabara, em Uberaba." },
];

/**
 * A mesa, numa página só dela: não é catálogo, é agenda. Cada
 * atendimento é uma carta grande, com a foto, a frase e o botão de
 * agendar; não tem preço, filtro nem quantidade.
 */
export default async function PaginaAtendimentos() {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const { atendimentos } = separar(produtos, categorias);
  const consulta = atendimentos.find((a) => a.slug.startsWith("consulta-de-taro"));
  const fotoDaMesa = consulta?.imagens.find((i) => i.url.endsWith("-3.webp")) ?? consulta?.imagens[0];

  return (
    <div className="mx-auto max-w-[72rem] px-4 pb-20 pt-8 sm:px-6 lg:px-10 lg:pt-12">
      {/* a abertura é a mesa: a noite da loja, o teto de luas, os dois na foto */}
      <header className="ceu relative overflow-hidden rounded-[12px] text-cera">
        <Teto className="pointer-events-none absolute left-6 top-3 h-14 w-[20rem] max-w-[80%] opacity-70 lg:left-10" />
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="px-6 pb-8 pt-20 sm:px-10 lg:px-12 lg:pb-12 lg:pt-24">
            <p className="etiqueta text-latao">A mesa</p>
            <h1 className="manchete mt-2 text-[clamp(1.875rem,4.4vw,2.75rem)] text-white">Dois pais de santo, uma mesa, a sua pergunta.</h1>
            <p className="falada mt-4 max-w-[44ch] text-[1.0625rem] text-cera/85">
              A Mãe Meli e o Pai Gustavo atendem juntos, cada um pelo seu oráculo. Você escolhe o atendimento e chama; dia,
              horário e valor se combinam na conversa.
            </p>
          </div>
          {fotoDaMesa ? (
            <div className="relative min-h-[14rem] lg:min-h-0">
              <Image src={fotoDaMesa.url} alt="A Mãe Meli e o Pai Gustavo na mesa de tarô" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-[center_30%]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,54,0.35),transparent_40%)] lg:bg-[linear-gradient(90deg,#0e1b36_0%,transparent_35%)]" />
            </div>
          ) : null}
        </div>
      </header>

      {/* como funciona, em três cartas */}
      <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-10 lg:gap-4">
        {PASSOS.map((passo, i) => (
          <li key={passo.titulo} className="cartao flex items-start gap-4 p-4">
            <span className="carta" aria-hidden="true">
              <span className="manchete text-[1.375rem] text-latao">{i + 1}</span>
            </span>
            <span>
              <span className="titulo-cartao block text-tinta">{passo.titulo}</span>
              <span className="miudo mt-1 block">{passo.texto}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="regua mt-12 lg:mt-16">
        <h2 className="secao text-tinta">Os atendimentos</h2>
        <FioDeLuas className="hidden h-3 w-[10.5rem] sm:block" />
      </div>

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

      <div className="mt-12 rounded-[12px] bg-parede px-6 py-8 text-center text-cera sm:px-10 lg:mt-16">
        <p className="manchete text-[1.375rem] text-white">Não sabe qual é o seu?</p>
        <p className="falada mx-auto mt-2 max-w-[40ch] text-[1rem] text-cera/80">
          Chama e conta o que está acontecendo. A mesa diz por onde começar.
        </p>
        <a
          href={linkWhatsApp("Oi! Vi o site e não sei qual atendimento é o meu. Posso contar o que está acontecendo?", config.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="btn btn--latao mt-5"
        >
          Contar pra mesa
        </a>
      </div>
    </div>
  );
}
