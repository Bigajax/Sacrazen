"use client";

import { useState } from "react";
import { precoBRL } from "@/lib/formato";
import { linkAgendar, linkPeca } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O pedido, montado antes de sair: quantidade, tamanho ou cor (quando a
 * peça tem), e uma observação livre para o que não cabe em campo. Tudo
 * isso vai numa mensagem estruturada para o WhatsApp, uma linha por
 * coisa, para quem atende não precisar perguntar o básico. Não existe
 * carrinho: a conversa é o pedido.
 *
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
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState("");

  const preco = produto.preco_promocional ?? produto.preco;
  const total = preco !== null ? preco * quantidade : null;

  const link = atendimento
    ? linkAgendar(produto.nome, whatsapp)
    : linkPeca(produto, {
        whatsapp,
        base,
        tamanho: tamanho ?? undefined,
        cor: cor ?? undefined,
        quantidade,
        observacao,
        preco,
      });

  if (atendimento) {
    return (
      <div className="space-y-4">
        <a href={link} target="_blank" rel="noreferrer" className="btn btn--cta w-full">
          Quero agendar
        </a>
        <p className="miudo">A Mãe Meli e o Pai Gustavo combinam dia, horário e valor na conversa.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {produto.tamanhos.length ? (
        <fieldset>
          <legend className="etiqueta mb-2">Tamanho</legend>
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
          <legend className="etiqueta mb-2">Cor</legend>
          <div className="flex flex-wrap gap-2">
            {produto.cores.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cor === c} onClick={() => setCor(cor === c ? null : c)}>
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
        <div>
          <p className="etiqueta mb-2">Quantidade</p>
          <div className="inline-flex items-stretch overflow-hidden rounded-[8px] border border-fio-forte bg-cartao">
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              aria-label="Uma a menos"
              className="px-4 text-[1.125rem] font-semibold text-tinta hover:bg-fundo disabled:opacity-40"
              disabled={quantidade <= 1}
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={99}
              inputMode="numeric"
              value={quantidade}
              onChange={(e) => setQuantidade(Math.min(99, Math.max(1, Number(e.target.value) || 1)))}
              aria-label="Quantidade"
              className="w-14 border-x border-fio-forte bg-cartao text-center text-[1rem] font-semibold text-tinta [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.min(99, q + 1))}
              aria-label="Uma a mais"
              className="px-4 text-[1.125rem] font-semibold text-tinta hover:bg-fundo"
            >
              +
            </button>
          </div>
        </div>

        <label className="campo-flutuante">
          <span>Alguma observação?</span>
          <input
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Cor, tamanho, aroma, detalhe que você quer"
            maxLength={140}
          />
        </label>
      </div>

      <div className="rounded-[10px] bg-fundo p-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.9375rem] text-tinta-fraca">
            {quantidade} {quantidade === 1 ? "unidade" : "unidades"}
            {preco !== null ? ` de ${precoBRL(preco)}` : ""}
          </span>
          <span className="preco text-[1.375rem] text-tinta">{total !== null ? precoBRL(total) : "a combinar"}</span>
        </div>
        <a href={link} target="_blank" rel="noreferrer" className="btn btn--cta mt-4 w-full">
          Pedir pelo WhatsApp
        </a>
        <p className="miudo mt-3">
          A mensagem já vai com a peça, a quantidade e o que você escolheu. A loja confirma se tem e combina retirada ou
          envio.
        </p>
      </div>
    </div>
  );
}
