"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvisoRotativo } from "./AvisoRotativo";
import { Marca } from "./Marca";

/**
 * O nome, o caminho para a loja, a busca e o WhatsApp. Só isso.
 * As categorias moram na home e na coluna do catálogo, onde servem.
 */
export function Cabecalho({ avisoTopo, linkWhats }: { avisoTopo: string; linkWhats: string }) {
  const [rolou, setRolou] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  return (
    <header className="sticky top-0 z-50">
      <AvisoRotativo avisos={avisoTopo.split("|")} />

      <div
        className={`border-b transition-colors duration-300 ${
          rolou ? "border-[color:var(--fio)] bg-noite/92 backdrop-blur" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[72rem] items-center gap-4 px-4 sm:gap-8 sm:px-6 lg:h-16 lg:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-cera" aria-label="SacraZen, página inicial">
            <Marca parte="buda" altura={34} />
            <span className="placa text-[1rem]">SacraZen</span>
          </Link>

          <Link href="/catalogo" className="mono-rotulo ml-auto hidden shrink-0 text-cera hover:text-latao sm:block">
            A loja
          </Link>

          <form onSubmit={buscar} className="ml-auto hidden min-w-0 items-center sm:ml-0 sm:flex sm:w-[16rem]">
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Buscar na loja"
              aria-label="Buscar por nome ou marca"
              className="busca-linha min-w-0 flex-1"
            />
          </form>

          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--primario shrink-0 px-4 py-2.5 text-[0.875rem]">
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
