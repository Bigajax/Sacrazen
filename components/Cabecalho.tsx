"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoOriginal } from "./Marca";
import { AvisoRotativo } from "./AvisoRotativo";
import type { Categoria } from "@/lib/tipos";

/**
 * O cabeçalho do portal: menu à esquerda, a logo no centro, busca e
 * WhatsApp à direita. O menu abre a lista de categorias; é a única
 * navegação além da busca.
 */
export function Cabecalho({ categorias, linkWhats, avisoTopo = "" }: { categorias: Categoria[]; linkWhats: string; avisoTopo?: string }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  return (
    <header className="relative z-50 border-b border-fio bg-cartao">
      {/* os recados da loja, na noite, acima de tudo */}
      {avisoTopo ? <AvisoRotativo avisos={avisoTopo.split("|")} /> : null}

      <div className="mx-auto flex h-[4.5rem] max-w-[72rem] items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:h-[6.5rem] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <nav aria-label="Principal" className="order-2 flex items-center gap-4 lg:order-1 lg:gap-5">
          <Link href="/catalogo" className="titulo-cartao hidden text-tinta hover:text-ametista sm:block">
            Catálogo
          </Link>
          <Link href="/catalogo/atendimentos" className="titulo-cartao hidden text-tinta hover:text-ametista md:block">
            Atendimentos
          </Link>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-categorias"
            className="titulo-cartao flex items-center gap-1.5 text-tinta hover:text-ametista"
          >
            Categorias
            <span aria-hidden="true" className={`text-[0.625rem] transition-transform ${aberto ? "rotate-180" : ""}`}>▼</span>
          </button>
        </nav>

        <Link href="/" aria-label="SacraZen, página inicial" className="order-1 flex shrink-0 items-center lg:order-2">
          <LogoOriginal className="h-[3.75rem] w-[3.75rem] lg:h-[5.5rem] lg:w-[5.5rem]" />
        </Link>

        <div className="order-3 flex items-center justify-end gap-3">
          <form onSubmit={buscar} className="hidden lg:block">
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Buscar na loja"
              aria-label="Buscar por nome ou marca"
              className="busca-linha w-[13rem]"
            />
          </form>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--latao px-4 py-2.5 text-[0.8125rem]">
            WhatsApp
          </a>
        </div>
      </div>

      {aberto ? (
        <nav id="menu-categorias" aria-label="Categorias" className="border-t border-fio bg-cartao">
          <div className="mx-auto max-w-[72rem] px-4 py-5 sm:px-6 lg:px-10">
            <form onSubmit={buscar} className="mb-4 lg:hidden">
              <input
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Buscar na loja"
                aria-label="Buscar por nome ou marca"
                className="busca-linha w-full"
              />
            </form>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
              <li>
                <Link href="/catalogo" onClick={() => setAberto(false)} className="titulo-cartao block py-1.5 text-tinta hover:text-ametista">
                  Tudo
                </Link>
              </li>
              {categorias.map((c) => (
                <li key={c.slug}>
                  <Link href={`/catalogo/${c.slug}`} onClick={() => setAberto(false)} className="block py-1.5 text-[0.9375rem] text-tinta hover:text-ametista">
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
