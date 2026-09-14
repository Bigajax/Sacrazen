import type { Produto } from "./tipos";

/**
 * A frase da casa para cada prateleira: o que a Mãe Meli diria ao
 * entregar a peça na mão. Uma por categoria, curta, sem promessa de
 * resultado. E o par de cada prateleira, para o "leva junto".
 */
export const VOZ_DA_PRATELEIRA: Record<string, { frase: string; par: string; rotuloDoPar: string }> = {
  cristais: { frase: "Cristal se escolhe na mão. Este aqui já passou pela nossa.", par: "incensos-e-oleos", rotuloDoPar: "Para defumar a pedra quando ela chegar" },
  "incensos-e-oleos": { frase: "Incenso se sente antes de levar. Se não der pra sentir, a gente descreve.", par: "altar-e-defumacao", rotuloDoPar: "Para acender" },
  velas: { frase: "Vela se acende com intenção. A cor é a metade da conversa.", par: "altar-e-defumacao", rotuloDoPar: "Para o altar" },
  "taro-e-oraculos": { frase: "O mesmo baralho que a mesa usa, pra você ler em casa.", par: "imagens-e-gnomos", rotuloDoPar: "Para a mesa" },
  "imagens-e-gnomos": { frase: "Os gnomos são da casa. Cada um chega com a sua cara.", par: "velas", rotuloDoPar: "Para acender ao lado" },
  "altar-e-defumacao": { frase: "Pro altar de casa: barro, cerâmica e o que a defumação pede.", par: "incensos-e-oleos", rotuloDoPar: "Para queimar nele" },
  "joias-e-guias": { frase: "Guia se usa por dentro da roupa ou por fora, quem decide é você.", par: "cristais", rotuloDoPar: "Para carregar junto" },
  "ervas-e-oferendas": { frase: "O que a mesa pediu, do jeito que a mesa pediu.", par: "velas", rotuloDoPar: "Para acompanhar" },
  "roupas-e-bolsas-indianas": { frase: "Peça única, do jeito que veio.", par: "joias-e-guias", rotuloDoPar: "Para completar" },
  "doces-e-presentes": { frase: "Pra dar de presente, ou pra você.", par: "incensos-e-oleos", rotuloDoPar: "Para acompanhar" },
  "facas-artesanais": { frase: "Forjadas à mão. Uma por vez.", par: "altar-e-defumacao", rotuloDoPar: "Para a mesa" },
};

export function vozDe(p: Pick<Produto, "categoria_slug">) {
  return VOZ_DA_PRATELEIRA[p.categoria_slug ?? ""] ?? null;
}
