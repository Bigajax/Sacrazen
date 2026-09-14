import Link from "next/link";
import { Marca } from "./Marca";
import { PREVIA, site } from "@/data/site.config";
import type { Categoria } from "@/lib/tipos";

export function Rodape({ categorias, linkWhats, instagram }: { categorias: Categoria[]; linkWhats: string; instagram: string }) {
  return (
    <footer className="mt-6 border-t border-[color:var(--fio)] bg-noite-funda">
      <div className="mx-auto grid max-w-[72rem] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.6fr)] lg:gap-16 lg:px-10 lg:py-16">
        <div>
          <div className="text-madeira">
            <Marca parte="completa" altura={140} rotulo="SacraZen" />
          </div>
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-cera-fraca">{site.posicionamento}.</p>
          <p className="miudo mt-3">{site.endereco}</p>

          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--linha mt-7">
            Chamar no WhatsApp
          </a>
        </div>

        <nav aria-labelledby="rodape-loja">
          <p id="rodape-loja" className="mono-rotulo text-madeira">
            A loja
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="text-[0.9375rem] text-cera hover:text-latao">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-rotulo text-madeira">Por aí</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-[0.9375rem] text-cera hover:text-latao">
                Instagram, @{instagram}
              </a>
            </li>
            <li>
              <a href={site.maps} target="_blank" rel="noreferrer" className="text-[0.9375rem] text-cera hover:text-latao">
                Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-3 border-t border-[color:var(--fio)] px-4 py-5 sm:px-6 lg:px-10">
        <p className="miudo">
          © {new Date().getFullYear()} SacraZen. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
        </p>
        <p className="miudo">
          Vitrine por{" "}
          <a href="https://rafaelrazeira.com.br" target="_blank" rel="noreferrer" className="text-madeira hover:text-latao">
            Rafael Razeira
          </a>
        </p>
      </div>
    </footer>
  );
}
