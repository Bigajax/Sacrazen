import Image from "next/image";
import Link from "next/link";
import { Marca } from "./Marca";
import { Teto } from "./Teto";
import { site } from "@/data/site.config";
import type { Imagem } from "@/lib/tipos";

type FotoHero = Imagem & { slug?: string };

/**
 * A primeira tela é a entrada da loja: o teto de céu com as luas por
 * cima, a placa de latão com o nome, a frase de quem atende. Uma foto
 * só, pequena, para provar que a loja existe; nada de banner.
 *
 * Fecha em 520px no celular por regra: a primeira fileira do catálogo
 * precisa aparecer sem rolar, senão muita gente não desce.
 */
export function Hero({ frase, foto, linkWhats }: { frase: string; foto?: FotoHero; linkWhats: string }) {
  return (
    <section className="ceu relative overflow-hidden">
      <div className="mx-auto max-w-[72rem] px-4 pb-10 pt-4 sm:px-6 lg:px-10 lg:pb-16 lg:pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="text-center lg:text-left">
            {/* a entrada da loja: o teto de luas por cima, o Buda da placa embaixo
                do ápice, e o nome. É a fachada, vista de quem chega. */}
            <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:max-w-[38rem]">
              <Teto className="h-[5.5rem] w-full lg:h-[7rem]" />
              <div className="flex justify-center text-cera">
                <Marca parte="buda" altura={80} className="-mt-9 lg:-mt-11" />
              </div>
            </div>
            <h1 className="placa mt-3 text-[clamp(2.6rem,11vw,5.25rem)] text-cera">SacraZen</h1>

            <p className="falada mx-auto mt-4 max-w-[26ch] text-[clamp(1.375rem,3.4vw,1.875rem)] text-cera lg:mx-0">
              {frase}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--primario">
                Chamar no WhatsApp
              </a>
              <Link href="#loja" className="btn btn--linha">
                Ver a loja
              </Link>
            </div>

            <p className="miudo mt-6">
              {site.google.nota} no Google, {site.google.avaliacoes} avaliações. Uberaba, desde {site.desde}.
            </p>
          </div>

          {foto ? (
            <Link
              href={foto.slug ? `/produto/${foto.slug}` : "/catalogo"}
              className="foto mx-auto hidden aspect-[4/5] w-full max-w-[16rem] lg:block"
              aria-label={foto.alt ?? "Ver a peça"}
            >
              <Image
                src={foto.url}
                alt={foto.alt ?? ""}
                fill
                priority
                sizes="16rem"
                placeholder={foto.blur ? "blur" : "empty"}
                blurDataURL={foto.blur ?? undefined}
                className="object-cover"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
