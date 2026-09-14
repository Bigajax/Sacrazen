import { Marca } from "./Marca";
import { FioDeLuas } from "./Teto";
import { PREVIA, site } from "@/data/site.config";

/**
 * O fecho, curto: a placa da loja, uma linha, os três caminhos (WhatsApp,
 * Instagram, mapa) e a assinatura do estúdio. O que era lista de
 * categorias e endereço já mora no menu e na seção da loja de verdade.
 */
export function Rodape({ linkWhats, instagram }: { linkWhats: string; instagram: string; categorias?: unknown; horario?: string }) {
  return (
    <footer className="mt-16 bg-noite-funda text-cera lg:mt-20">
      <div className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
            <span className="text-cera">
              <Marca parte="buda" altura={56} />
            </span>
            <div>
              <p className="placa text-[1.125rem] text-cera">SacraZen</p>
              <p className="mt-0.5 text-[0.875rem] text-cera/70">{site.posicionamento}.</p>
            </div>
          </div>

          <nav aria-label="Caminhos" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.9375rem] font-medium">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="text-latao hover:text-white">
              WhatsApp
            </a>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-cera hover:text-latao">
              @{instagram}
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer" className="text-cera hover:text-latao">
              Como chegar
            </a>
          </nav>
        </div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <FioDeLuas className="h-3 w-[10.5rem] opacity-80" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-4 px-4 py-5 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-10 lg:text-left">
          <p className="text-[0.8125rem] text-cera/60">
            © {new Date().getFullYear()} SacraZen, Uberaba. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
          </p>
          {/* a assinatura do estúdio: a logo em máscara, no lugar do nome escrito */}
          <a
            href="https://rafaelrazeira.com.br/landing-page"
            target="_blank"
            rel="noreferrer"
            aria-label="Vitrine feita por Rafael Razeira Estúdio"
            className="flex items-center gap-3 text-cera/60 transition-colors hover:text-cera"
          >
            <span className="text-[0.75rem]">vitrine por</span>
            <Marca parte="estudio" altura={38} rotulo="Rafael Razeira Estúdio" />
          </a>
        </div>
      </div>
    </footer>
  );
}
