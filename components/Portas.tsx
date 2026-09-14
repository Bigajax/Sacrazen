import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * A faixa elevada que atravessa o pé do hero: três portas, cada uma com
 * o seu desenho em fio de latão e uma frase na voz da mesa (inteira,
 * sem reticências), e no fim a placa de seta, como as setas de madeira
 * pintadas na entrada da loja.
 */

/* A frase de cada porta. Chave pelo começo do slug; o que não estiver
   aqui cai na descrição do catálogo. */
const FRASES: Record<string, string> = {
  "consulta-de-taro": "Dois oráculos, uma mesa. Você pergunta, a Mãe e o Pai leem.",
  "limpeza-espiritual": "Defumação para tirar o peso e abrir caminho.",
  "mapa-astral": "O que a alma trouxe, e o que veio resolver.",
  "escalda-pes": "Para desacelerar de verdade, dos pés para cima.",
  "sessao-de-reiki": "Energia na maca, com a terapeuta ao lado.",
};

function fraseDe(p: Produto) {
  const chave = Object.keys(FRASES).find((k) => p.slug.startsWith(k));
  return chave ? FRASES[chave] : p.descricao;
}

/* Os desenhos: a carta, a fumaça, a roda do mapa. Fio de latão sobre
   a noite, todos no mesmo círculo de 56px. */
export function Desenho({ slug, className = "h-16 w-16 shrink-0 rounded-full bg-noite p-2" }: { slug: string; className?: string }) {
  const comum = { fill: "none", stroke: "var(--latao)", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let forma: React.ReactNode;
  if (slug.startsWith("limpeza") || slug.startsWith("escalda")) {
    forma = (
      <g {...comum}>
        <path d="M8 25.5c0 1.6 3.6 2.5 8 2.5s8-.9 8-2.5-3.6-2.5-8-2.5-8 .9-8 2.5z" />
        <path d="M16 22c-2.8-3.2 2.8-5.4 0-9.2-2.6-3.5 2.4-5.4 0-8.8" />
        <path d="M11.5 21c-1.8-2.4 1.8-3.8 0-6.6" opacity="0.6" />
        <path d="M20.5 21c1.8-2.4-1.8-3.8 0-6.6" opacity="0.6" />
      </g>
    );
  } else if (slug.startsWith("mapa")) {
    forma = (
      <g {...comum}>
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="6" />
        <path d="M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2 8.2 23.8" opacity="0.6" />
        <circle cx="22.5" cy="9.5" r="1.4" fill="var(--latao)" stroke="none" />
      </g>
    );
  } else {
    forma = (
      <g {...comum}>
        <rect x="8" y="5" width="16" height="22" rx="2" />
        <path d="M16 11.5l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z" fill="var(--latao)" stroke="none" />
        <path d="M11 24h10" opacity="0.6" />
      </g>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {forma}
    </svg>
  );
}

export function Portas({ atendimentos }: { atendimentos: Produto[] }) {
  const tres = atendimentos.slice(0, 3);
  if (!tres.length) return null;

  return (
    <div className="relative z-10 mx-auto -mt-14 max-w-[72rem] px-4 sm:px-6 lg:-mt-16 lg:px-10">
      <div className="cartao grid divide-y divide-fio shadow-[0_18px_40px_-24px_rgba(9,18,38,0.5)] md:grid-cols-[1fr_1fr_1fr_auto] md:divide-x md:divide-y-0">
        {tres.map((a) => (
          <Link key={a.id} href={`/produto/${a.slug}`} className="group flex items-center gap-4 px-5 py-4 hover:bg-fundo">
            <Desenho slug={a.slug} />
            <span className="min-w-0">
              <span className="titulo-cartao block text-tinta group-hover:text-ametista">{a.nome.split(" com ")[0]}</span>
              <span className="falada mt-1 block text-[0.875rem] leading-snug text-tinta-fraca">{fraseDe(a)}</span>
            </span>
          </Link>
        ))}

        {/* a placa de seta, como as da entrada */}
        <div className="flex items-center justify-center p-4 md:pl-6 md:pr-5">
          <Link
            href="/catalogo/atendimentos"
            className="titulo-cartao relative flex items-center bg-latao py-3 pl-4 pr-8 text-noite transition-colors hover:bg-[#ecc35e] [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)]"
          >
            Todos os atendimentos
          </Link>
        </div>
      </div>
    </div>
  );
}
