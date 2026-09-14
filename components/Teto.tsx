/**
 * O teto da loja, em fio de latão.
 *
 * A SacraZen tem o teto pintado de céu: as fases da lua em volta do
 * zodíaco. Aqui elas viram um arco de oito luas desenhadas em código,
 * sobre o nome, como a pessoa vê quando entra e olha para cima.
 *
 * Cada lua é a mesma geometria: o disco em contorno e a parte iluminada
 * como um caminho fechado (metade do disco mais um arco de elipse cujo
 * raio horizontal é o cosseno da fase). Nada de imagem, nada de fonte
 * de símbolos: um SVG que pesa menos que um ícone.
 */
const FASES = 8;
const R = 13;

export function lua(cx: number, cy: number, k: number, r = R): string | null {
  const R = r;
  if (k === 0) return null; // lua nova: só o contorno
  if (k === FASES / 2) return `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx} ${cy + R} A ${R} ${R} 0 1 1 ${cx} ${cy - R} Z`;
  const fase = (k / FASES) * Math.PI * 2;
  const rx = Math.abs(Math.cos(fase)) * R;
  const crescente = fase < Math.PI; // lado direito iluminado
  /* a metade iluminada percorre o círculo de cima a baixo; o terminador
     volta de baixo a cima como arco de elipse, pelo lado em que a luz
     está encolhendo (crescente) ou crescendo (gibosa) */
  const meia = crescente
    ? `M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R}`
    : `M ${cx} ${cy - R} A ${R} ${R} 0 0 0 ${cx} ${cy + R}`;
  const gibosa = Math.cos(fase) < 0;
  const sweep = crescente ? (gibosa ? 1 : 0) : gibosa ? 0 : 1;
  return `${meia} A ${Math.max(rx, 0.01)} ${R} 0 0 ${sweep} ${cx} ${cy - R} Z`;
}

export function Teto({ className = "" }: { className?: string }) {
  const largura = 640;
  const altura = 160;
  const centro = { x: largura / 2, y: 340 };
  const raio = { x: 296, y: 300 };
  const de = 203;
  const ate = 337;

  const pontos = Array.from({ length: FASES }, (_, i) => {
    const t = (de + ((ate - de) * i) / (FASES - 1)) * (Math.PI / 180);
    return { x: centro.x + raio.x * Math.cos(t), y: centro.y + raio.y * Math.sin(t) };
  });
  const arco = `M ${pontos[0].x} ${pontos[0].y} A ${raio.x} ${raio.y} 0 0 1 ${pontos[FASES - 1].x} ${pontos[FASES - 1].y}`;

  return (
    <svg
      viewBox={`0 0 ${largura} ${altura}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="var(--latao)"
      strokeWidth="1"
    >
      <path d={arco} opacity="0.3" />
      {pontos.map((p, k) => {
        const cheia = lua(p.x, p.y, k);
        return (
          <g key={k} className="fase" style={{ ["--i" as string]: k }}>
            <circle cx={p.x} cy={p.y} r={R} fill="var(--noite)" opacity="0.85" />
            {cheia ? <path d={cheia} fill="var(--latao)" stroke="none" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * As oito luas em linha, pequenas: o fio que separa as partes de um
 * cartão, em vez de uma borda. A mesma geometria do teto.
 */
export function FioDeLuas({ className = "" }: { className?: string }) {
  const r = 5;
  const passo = 22;
  const largura = passo * (FASES - 1) + r * 2 + 2;
  return (
    <svg viewBox={`0 0 ${largura} ${r * 2 + 2}`} className={className} aria-hidden="true" focusable="false" fill="none" stroke="var(--latao)" strokeWidth="0.8">
      {Array.from({ length: FASES }, (_, k) => {
        const cx = r + 1 + k * passo;
        const cy = r + 1;
        const cheia = lua(cx, cy, k, r);
        return (
          <g key={k}>
            <circle cx={cx} cy={cy} r={r} />
            {cheia ? <path d={cheia} fill="var(--latao)" stroke="none" /> : null}
          </g>
        );
      })}
    </svg>
  );
}
