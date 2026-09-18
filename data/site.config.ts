/**
 * Dados fixos do negócio. O que a dona da loja edita no dia a dia
 * (aviso do topo, frase do hero, endereço, horário, WhatsApp) vive na
 * tabela `config` e é editável em /painel/config — não aqui.
 */

/**
 * Endereço público do site — descoberto sozinho, sem precisar configurar
 * nada. Na Vercel ele cai no domínio do próprio projeto; em casa, em
 * localhost. Só vale a pena definir NEXT_PUBLIC_SITE_URL quando a loja
 * tiver domínio próprio.
 *
 * Uma variável de ambiente pode existir e estar VAZIA — e aí `??` não
 * salva, porque `""` não é `null`. Era isso que derrubava o build na
 * Vercel com `TypeError: Invalid URL, input: ''`. Aqui todo valor passa
 * por trim, só entra se tiver conteúdo, e ganha protocolo se vier sem.
 *
 * As variantes NEXT_PUBLIC_ valem também no bundle do navegador; as sem
 * prefixo só no servidor, e existem sempre na Vercel — por isso as duas
 * versões estão na fila.
 */
function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3000";
}

export const site = {
  nome: "SacraZen",
  marca: "SacraZen",
  posicionamento: "Tarô, umbanda, cristais e incenso em Uberaba, desde 2018",
  cidade: "Uberaba | MG",
  /* o número da LOJA. Na prévia ele não é usado: ver PREVIA abaixo. */
  whatsapp: "5534991370767",
  instagram: "sacrazen",
  url: resolverUrl(),
  endereco: "R. Dr. João Severiano Rodrigues da Cunha, 120, Guanabara, Uberaba, MG",
  maps: "https://maps.google.com/?cid=7784155243325611068",
  desde: 2018,
  google: { nota: "5,0", avaliacoes: 127 },
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem: quem clica é a dona da loja
 * dizendo que quer a vitrine no ar, não uma cliente pedindo produto.
 * Prévia com o número da loja funcionando é a vitrine entregue de graça.
 * Quando a loja contratar: PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544991246187",
  mensagem: "Oi! Vi a prévia da vitrine da SacraZen e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  aviso_topo: "Enviamos para todo o Brasil | Retirada na loja em Uberaba | Seg a sex, 10h às 18h30 · Sáb, 9h30 às 13h",
  frase_hero: "Tarô, umbanda, cristais e incenso. Em Uberaba, desde 2018.",
  endereco: site.endereco,
  horario: "Segunda a sexta, 10h às 18h30. Sábado, 9h30 às 13h. Domingo fechado.",
};
