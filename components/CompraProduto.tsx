"use client";

import { useState } from "react";
import { linkAgendar, linkPeca } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * Seletor de tamanho e cor + o botão. Não existe carrinho: a conversa é
 * no WhatsApp, e a mensagem já vai com o nome da peça e o link da página.
 * Atendimento não se compra, se agenda: muda a mensagem, não o botão.
 */
export function CompraProduto({
  produto,
  whatsapp,
  base,
  atendimento = false,
}: {
  produto: Produto;
  whatsapp: string;
  base: string;
  atendimento?: boolean;
}) {
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [cor, setCor] = useState<string | null>(null);

  const link = atendimento
    ? linkAgendar(produto.nome, whatsapp)
    : linkPeca(produto, { whatsapp, base, tamanho: tamanho ?? undefined, cor: cor ?? undefined });

  return (
    <div className="space-y-7">
      {produto.tamanhos.length ? (
        <fieldset>
          <legend className="miudo mb-3">Tamanho</legend>
          <div className="flex flex-wrap gap-2">
            {produto.tamanhos.map((t) => (
              <button
                key={t}
                type="button"
                className="chip min-w-[3rem] justify-center"
                aria-pressed={tamanho === t}
                onClick={() => setTamanho(tamanho === t ? null : t)}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {produto.cores.length > 1 ? (
        <fieldset>
          <legend className="miudo mb-3">Cor</legend>
          <div className="flex flex-wrap gap-2">
            {produto.cores.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cor === c} onClick={() => setCor(cor === c ? null : c)}>
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <a href={link} target="_blank" rel="noreferrer" className="btn btn--latao w-full py-4">
        Chamar no WhatsApp
      </a>

      <p className="miudo">
        {atendimento
          ? "A Mãe Meli e o Pai Gustavo combinam dia, horário e valor na conversa."
          : "A loja confirma se ainda tem, e combina retirada ou envio na conversa."}
      </p>
    </div>
  );
}
