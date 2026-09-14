"use client";

import { useState } from "react";
import Link from "next/link";
import type { Categoria } from "@/lib/tipos";

/**
 * "Navegue pela loja": seis categorias à vista, centradas, e o resto
 * atrás de "Ver todas", como no portal de referência. As seis primeiras
 * são as da ordem do catálogo, que já é a ordem do que mais sai.
 */
const A_VISTA = 6;

export function Chips({ categorias, titulo = "Navegue pela loja" }: { categorias: Categoria[]; titulo?: string }) {
  const [todas, setTodas] = useState(false);
  if (!categorias.length) return null;
  const lista = todas ? categorias : categorias.slice(0, A_VISTA);
  const sobram = categorias.length - A_VISTA;

  return (
    <nav aria-label={titulo} className="mx-auto max-w-[40rem] px-4 pt-10 text-center sm:px-6 lg:pt-14">
      <p className="text-[0.9375rem] font-medium text-tinta-fraca">{titulo}</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {lista.map((c) => (
          <li key={c.slug}>
            <Link href={`/catalogo/${c.slug}`} className="chip chip--cheio chip--quadrado">
              {c.nome}
            </Link>
          </li>
        ))}
      </ul>
      {sobram > 0 ? (
        <button
          type="button"
          onClick={() => setTodas((v) => !v)}
          aria-expanded={todas}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-tinta hover:text-ametista"
        >
          {todas ? "Ver menos" : "Ver todas"}
          <svg viewBox="0 0 12 8" className={`h-2 w-3 transition-transform ${todas ? "rotate-180" : ""}`} aria-hidden="true">
            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </nav>
  );
}
