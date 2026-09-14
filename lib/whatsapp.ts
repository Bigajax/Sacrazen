import { PREVIA, site } from "@/data/site.config";
import type { Produto } from "./tipos";

function numero(whatsapp?: string) {
  return (whatsapp ?? site.whatsapp).replace(/\D/g, "");
}

export function linkWhatsApp(texto: string, whatsapp?: string): string {
  /* na prévia, o destino e a mensagem são fixos: ver PREVIA em site.config */
  if (PREVIA) return `https://wa.me/${PREVIA.whatsapp}?text=${encodeURIComponent(PREVIA.mensagem)}`;
  return `https://wa.me/${numero(whatsapp)}?text=${encodeURIComponent(texto)}`;
}

/** CTA de produto: identifica a peça pelo nome e manda o link da página. */
export function linkPeca(
  produto: Pick<Produto, "codigo" | "nome" | "slug">,
  opcoes: { whatsapp?: string; base?: string; tamanho?: string; cor?: string } = {},
): string {
  const base = opcoes.base ?? site.url;
  const url = `${base.replace(/\/$/, "")}/produto/${produto.slug}`;
  const escolhas = [
    opcoes.tamanho ? `tamanho ${opcoes.tamanho}` : null,
    opcoes.cor ? `cor ${opcoes.cor}` : null,
  ].filter(Boolean);
  const detalhe = escolhas.length ? ` (${escolhas.join(", ")})` : "";
  return linkWhatsApp(`Oi! Vi no site e queria essa peça: ${produto.nome}${detalhe}. Ainda tem? ${url}`, opcoes.whatsapp);
}

/** CTA de atendimento: a consulta se agenda, não se compra. */
export function linkAgendar(nome: string, whatsapp?: string): string {
  return linkWhatsApp(`Oi! Vi no site e queria agendar: ${nome}. Como funciona?`, whatsapp);
}

export function linkGeral(whatsapp?: string): string {
  return linkWhatsApp("Oi! Vim pelo site da SacraZen.", whatsapp);
}
