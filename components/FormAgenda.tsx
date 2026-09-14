"use client";

import { useState } from "react";
import { Desenho } from "./Portas";
import { FioDeLuas } from "./Teto";
import { linkWhatsApp } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O cartão de agendar que fica sobre o hero. A parte de cima é a noite
 * da loja (as abas moram nela); embaixo, o formulário no branco. Em vez
 * de uma caixa de texto para "o que você quer perguntar", os assuntos
 * que a mesa mais ouve viram pílulas: ninguém chega sabendo formular a
 * pergunta, e a Mãe Meli diz que a mesa ajuda a achar.
 *
 * Não guarda nada: o botão monta a mensagem e abre o WhatsApp. A
 * conversa é o cadastro.
 */
/* o nome curto de cada aba: o nome inteiro do atendimento não cabe numa carta */
const ABAS: Record<string, string> = { "consulta-de-taro": "Consulta de tarô", "limpeza-espiritual": "Limpeza espiritual", "mapa-astral": "Mapa astral" };
const nomeDaAba = (p: Produto) => {
  const chave = Object.keys(ABAS).find((k) => p.slug.startsWith(k));
  return chave ? ABAS[chave] : p.nome.split(" com ")[0];
};

const ASSUNTOS = ["Amor", "Trabalho e dinheiro", "Família", "Um caminho", "Uma decisão", "Saúde e energia"];

export function FormAgenda({ opcoes, whatsapp }: { opcoes: Produto[]; whatsapp: string }) {
  const [aba, setAba] = useState(0);
  const [nome, setNome] = useState("");
  const [assuntos, setAssuntos] = useState<string[]>([]);

  const escolhido = opcoes[aba] ?? opcoes[0];
  if (!escolhido) return null;

  const alterna = (a: string) => setAssuntos((v) => (v.includes(a) ? v.filter((x) => x !== a) : [...v, a]));

  const mensagem = [
    `Oi! Vi no site e quero agendar: ${escolhido.nome}.`,
    nome.trim() ? `Meu nome é ${nome.trim()}.` : null,
    assuntos.length ? `Quero falar sobre: ${assuntos.join(", ").toLowerCase()}.` : null,
    "Como funciona?",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="overflow-hidden rounded-[10px] bg-cartao text-tinta shadow-[0_18px_50px_-20px_rgba(9,18,38,0.6)]">
      {/* a noite em cima: as duas abas são duas cartas viradas na mesa, cada
          uma com o seu desenho; a escolhida está de frente (branca) */}
      <div className="bg-noite px-2 pt-2">
        <div role="tablist" aria-label="Atendimento" className="flex gap-2">
          {opcoes.slice(0, 2).map((o, i) => {
            const ativa = aba === i;
            return (
              <button
                key={o.id}
                role="tab"
                type="button"
                aria-selected={ativa}
                onClick={() => setAba(i)}
                className={`flex flex-1 items-center gap-3 rounded-t-[8px] px-3 py-3 text-left transition-colors ${
                  ativa ? "bg-cartao text-tinta" : "text-cera/80 hover:text-cera"
                }`}
              >
                <Desenho slug={o.slug} className={`h-10 w-10 shrink-0 rounded-md p-1.5 ${ativa ? "bg-noite" : "border border-cera/25"}`} />
                <span className="titulo-cartao leading-tight">{nomeDaAba(o)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form
        className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(linkWhatsApp(mensagem, whatsapp), "_blank", "noopener");
        }}
      >
        <p className="manchete text-[1.125rem] uppercase leading-tight text-tinta">Agende sua consulta</p>
        <p className="falada mt-1 text-[0.9375rem] text-tinta-fraca">
              {aba === 0 ? "Você não precisa chegar com a pergunta pronta. A mesa ajuda a achar." : "Para tirar o peso, abrir caminho e voltar a dormir."}
        </p>

        <FioDeLuas className="my-4 h-3 w-[10.5rem]" />

        <label className="block">
          <span className="etiqueta">Seu nome</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} className="campo mt-1" placeholder="Como a gente deve te chamar" />
        </label>

        <fieldset className="mt-4">
          <legend className="etiqueta">Sobre o que você quer falar</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ASSUNTOS.map((a) => (
              <button key={a} type="button" className="chip" aria-pressed={assuntos.includes(a)} onClick={() => alterna(a)}>
                {a}
              </button>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn--latao mt-5 w-full py-4">
          Chamar no WhatsApp
        </button>
        <p className="miudo mt-3 text-center">Dia, horário e valor se combinam na conversa.</p>
      </form>
    </div>
  );
}
