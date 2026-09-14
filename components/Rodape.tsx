import Link from "next/link";
import { Marca } from "./Marca";
import { PREVIA, site } from "@/data/site.config";
import type { Categoria } from "@/lib/tipos";

/** O fecho, na noite da loja: a logo em máscara, a busca, os caminhos. */
export function Rodape({ categorias, linkWhats, instagram, horario }: { categorias: Categoria[]; linkWhats: string; instagram: string; horario: string }) {
  return (
    <footer className="mt-16 bg-noite text-cera lg:mt-20">
      <div className="mx-auto grid max-w-[72rem] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-10 lg:py-16">
        <div>
          <div className="text-cera">
            <Marca parte="completa" altura={120} rotulo="SacraZen" />
          </div>
          <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-cera/80">{site.posicionamento}.</p>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--latao mt-6">
            Chamar no WhatsApp
          </a>
          <p className="miudo mt-3 text-cera-fraca">{horario}</p>
        </div>

        <nav aria-labelledby="rodape-loja">
          <p id="rodape-loja" className="mono-rotulo text-latao">
            A loja
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="text-[0.875rem] text-cera hover:text-latao">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-rotulo text-latao">Por aí</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-[0.875rem] text-cera hover:text-latao">
                Instagram, @{instagram}
              </a>
            </li>
            <li>
              <a href={site.maps} target="_blank" rel="noreferrer" className="text-[0.875rem] text-cera hover:text-latao">
                Google Maps
              </a>
            </li>
          </ul>
          <p className="mono-rotulo mt-8 text-latao">Endereço</p>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-cera/80">{site.endereco}</p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-noite-funda">
        <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <p className="miudo text-cera-fraca">
            © {new Date().getFullYear()} SacraZen. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
          </p>
          <p className="miudo text-cera-fraca">
            Vitrine por{" "}
            <a href="https://rafaelrazeira.com.br" target="_blank" rel="noreferrer" className="text-latao hover:text-cera">
              Rafael Razeira
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
