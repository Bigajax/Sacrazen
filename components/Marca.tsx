import Image from "next/image";

/**
 * A logo da SacraZen: o Buda dentro da lótus e o letreiro condensado.
 *
 * Em fundo claro ela entra como é, nas cores originais (marrom e
 * vermelho-terra sobre branco): o arquivo tem 350px e aguenta até uns
 * 150px de largura. Em fundo escuro (hero, rodapé) entra como máscara
 * alfa pintada pela cor do texto (`public/marca/*.png`).
 */
const PARTES = {
  buda: { arquivo: "/marca/buda.png", proporcao: 176 / 170 },
  letreiro: { arquivo: "/marca/letreiro.png", proporcao: 274 / 78 },
  completa: { arquivo: "/marca/sacrazen.png", proporcao: 1 },
  /* a assinatura do estúdio, no rodapé */
  estudio: { arquivo: "/marca/rafael-razeira.png", proporcao: 956 / 519 },
} as const;

export function Marca({
  parte,
  altura,
  className = "",
  rotulo,
}: {
  parte: keyof typeof PARTES;
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

/** A logo original, em cores, para fundo claro. */
export function LogoOriginal({ className = "" }: { className?: string }) {
  /* o tamanho vem das classes de altura e largura, para mudar por breakpoint */
  return <Image src="/marca/original.jpg" alt="SacraZen" width={350} height={350} sizes="180px" priority className={className} />;
}
