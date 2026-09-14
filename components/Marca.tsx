/**
 * A logo da SacraZen: o Buda dentro da lótus e o letreiro condensado.
 *
 * O arquivo que a loja tem é um JPEG de 350px em fundo branco, marrom e
 * vermelho-terra. Sobre a noite ele não funciona como imagem, então ele
 * entra como MÁSCARA (public/marca/*.png, alfa tirado do desenho) e a cor
 * vem do CSS: cera no cabeçalho e no hero, madeira no rodapé. Fica nítido
 * até uns 170px de largura; acima disso o desenho de 350px estoura, e por
 * isso o nome grande do hero continua sendo tipografia.
 */
const PARTES = {
  buda: { arquivo: "/marca/buda.png", proporcao: 176 / 170 },
  letreiro: { arquivo: "/marca/letreiro.png", proporcao: 274 / 78 },
  completa: { arquivo: "/marca/sacrazen.png", proporcao: 1 },
} as const;

export function Marca({
  parte,
  altura,
  className = "",
  rotulo,
}: {
  parte: keyof typeof PARTES;
  /** em px, a altura desenhada; a largura sai da proporção do desenho */
  altura: number;
  className?: string;
  rotulo?: string;
}) {
  const { arquivo, proporcao } = PARTES[parte];
  return (
    <span
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * proporcao),
        WebkitMaskImage: `url(${arquivo})`,
        maskImage: `url(${arquivo})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
