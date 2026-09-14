"use client";

import { useEffect, useRef, useState } from "react";
import { FioDeLuas } from "./Teto";
import { linkWhatsApp } from "@/lib/whatsapp";
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
    <div className="mx-auto max-w-[24rem] rounded-[10px] bg-cartao text-tinta shadow-[0_18px_50px_-20px_rgba(9,18,38,0.6)] lg:mx-0">
      <div role="tablist" aria-label="Atendimento" className="flex rounded-t-[10px] bg-parede">
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
        <p className="manchete text-[1.125rem] uppercase leading-[1.2] text-tinta">Agende sua consulta com dois pais de santo</p>
        <p className="falada mt-2 text-[0.9375rem] text-tinta-fraca">{texto.frase}</p>

        <FioDeLuas className="my-4 h-3 w-[10.5rem]" />

        <div className="space-y-4">
          <label className="campo-flutuante">
            <span>Seu nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como a gente deve te chamar" />
          </label>
          <Seletor rotulo="Sobre o que você quer falar" valor={assunto} opcoes={ASSUNTOS} aoEscolher={setAssunto} />
        </div>

        <button type="submit" className="btn btn--cta mt-5 w-full">
          {texto.botao}
        </button>
        <p className="miudo mt-3">Dia, horário e valor se combinam na conversa, pelo WhatsApp.</p>
      </form>
    </div>
  );
}

/**
 * A lista de assuntos, no lugar do <select> nativo: a caixa que abre é
 * nossa (branca, cantos arredondados, sombra baixa, o escolhido com a
 * marca), não a do sistema. Teclado: setas, Enter, Esc. Fecha ao clicar
 * fora.
 */
function Seletor({
  rotulo,
  valor,
  opcoes,
  aoEscolher,
}: {
  rotulo: string;
  valor: string;
  opcoes: string[];
  aoEscolher: (v: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [foco, setFoco] = useState(0);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("mousedown", fora);
    return () => document.removeEventListener("mousedown", fora);
  }, [aberto]);

  function tecla(e: React.KeyboardEvent) {
    if (e.key === "Escape") setAberto(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!aberto) setAberto(true);
      setFoco((f) => Math.min(f + 1, opcoes.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFoco((f) => Math.max(f - 1, 0));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (aberto) {
        aoEscolher(opcoes[foco]);
        setAberto(false);
      } else setAberto(true);
    }
  }

  return (
    <div ref={raiz} className="campo-flutuante">
      <span>{rotulo}</span>
      <button
        type="button"
        role="combobox"
        aria-expanded={aberto}
        aria-haspopup="listbox"
        aria-controls="lista-assuntos"
        onClick={() => setAberto((v) => !v)}
        onKeyDown={tecla}
        className={`seletor ${valor ? "" : "seletor--vazio"}`}
      >
        <span className="truncate">{valor || "Escolha, ou deixe em branco"}</span>
        <svg viewBox="0 0 12 8" className={`h-2 w-3 shrink-0 transition-transform ${aberto ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {aberto ? (
        <ul id="lista-assuntos" role="listbox" aria-label={rotulo} className="seletor__lista">
          {opcoes.map((o, i) => {
            const escolhido = o === valor;
            return (
              <li
                key={o}
                role="option"
                aria-selected={escolhido}
                data-foco={i === foco}
                onMouseEnter={() => setFoco(i)}
                onClick={() => {
                  aoEscolher(escolhido ? "" : o);
                  setAberto(false);
                }}
                className="seletor__opcao"
              >
                <span>{o}</span>
                {escolhido ? (
                  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
