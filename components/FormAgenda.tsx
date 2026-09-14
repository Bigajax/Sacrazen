"use client";

import { useState } from "react";
import { FioDeLuas } from "./Teto";
import { linkWhatsApp } from "@/lib/whatsapp";
import { site } from "@/data/site.config";
import type { Produto } from "@/lib/tipos";

/**
 * O cartão de agendar que fica sobre o hero. Duas abas, o título em
 * caixa alta com o selo redondo ao lado, a frase da mesa, dois campos
 * com o rótulo sentado na borda e o botão que fala na primeira pessoa
 * de quem está pedindo. Não guarda nada: o botão monta a mensagem e
 * abre o WhatsApp. A conversa é o cadastro.
 */
const ABAS: Record<string, { nome: string; frase: string; botao: string }> = {
  "consulta-de-taro": {
    nome: "Consulta de tarô",
    frase: "Você não precisa chegar com a pergunta pronta. A mesa ajuda a achar.",
    botao: "Quero minha leitura",
  },
  "limpeza-espiritual": {
    nome: "Limpeza espiritual",
    frase: "Para tirar o peso, abrir caminho e voltar a dormir.",
    botao: "Quero a minha limpeza",
  },
  "mapa-astral": { nome: "Mapa astral", frase: "O que a alma trouxe, e o que veio resolver.", botao: "Quero meu mapa" },
};
const abaDe = (p: Produto) => {
  const chave = Object.keys(ABAS).find((k) => p.slug.startsWith(k));
  return chave ? ABAS[chave] : { nome: p.nome.split(" com ")[0], frase: p.descricao ?? "", botao: "Quero agendar" };
};

const ASSUNTOS = ["Amor", "Trabalho e dinheiro", "Família", "Um caminho", "Uma decisão", "Saúde e energia", "Ainda não sei"];

export function FormAgenda({ opcoes, whatsapp }: { opcoes: Produto[]; whatsapp: string }) {
  const [aba, setAba] = useState(0);
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");

  const escolhido = opcoes[aba] ?? opcoes[0];
  if (!escolhido) return null;
  const texto = abaDe(escolhido);

  const mensagem = [
    `Oi! Vi no site e quero agendar: ${escolhido.nome}.`,
    nome.trim() ? `Meu nome é ${nome.trim()}.` : null,
    assunto && assunto !== "Ainda não sei" ? `Quero falar sobre ${assunto.toLowerCase()}.` : null,
    "Como funciona?",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mx-auto max-w-[24rem] overflow-hidden rounded-[10px] bg-cartao text-tinta shadow-[0_18px_50px_-20px_rgba(9,18,38,0.6)] lg:mx-0">
      <div role="tablist" aria-label="Atendimento" className="flex bg-parede">
        {opcoes.slice(0, 2).map((o, i) => {
          const ativa = aba === i;
          return (
            <button
              key={o.id}
              role="tab"
              type="button"
              aria-selected={ativa}
              onClick={() => setAba(i)}
              className={`flex-1 px-3 py-3.5 text-center text-[0.9375rem] font-semibold transition-colors ${
                ativa ? "rounded-t-[10px] bg-cartao text-tinta" : "text-cera/85 hover:text-white"
              }`}
            >
              {abaDe(o).nome}
            </button>
          );
        })}
      </div>

      <form
        className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(linkWhatsApp(mensagem, whatsapp), "_blank", "noopener");
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="manchete max-w-[14ch] text-[1.125rem] uppercase leading-[1.2] text-tinta">
            Agende sua consulta com dois pais de santo
          </p>
          {/* o selo redondo é um fato, não um slogan: a nota da loja no Google */}
          <span
            role="img"
            aria-label={`Nota ${site.google.nota} no Google`}
            className="flex h-[4.25rem] w-[4.25rem] shrink-0 -rotate-6 flex-col items-center justify-center rounded-full bg-latao text-center leading-none text-noite"
          >
            <span className="text-[1.25rem] font-extrabold">{site.google.nota}</span>
            <span className="mt-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.06em]">no Google</span>
          </span>
        </div>
        <p className="falada mt-2 text-[0.9375rem] text-tinta-fraca">{texto.frase}</p>

        <FioDeLuas className="my-4 h-3 w-[10.5rem]" />

        <div className="space-y-4">
          <label className="campo-flutuante">
            <span>Seu nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como a gente deve te chamar" />
          </label>
          <label className="campo-flutuante">
            <span>Sobre o que você quer falar</span>
            <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
              <option value="">Escolha, ou deixe em branco</option>
              {ASSUNTOS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="btn btn--latao mt-5 w-full py-4 text-[0.9375rem]">
          {texto.botao}
        </button>
        <p className="miudo mt-3">Dia, horário e valor se combinam na conversa, pelo WhatsApp.</p>
      </form>
    </div>
  );
}
