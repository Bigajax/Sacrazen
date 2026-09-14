import Image from "next/image";
import { site } from "@/data/site.config";

/**
 * Onde a loja fica e quando abre: um cartão com a foto da placa de
 * entrada, endereço, horário e o caminho. Sem mapa embutido: o endereço
 * abre o app de mapas da pessoa.
 */
export function FaixaLoja({ endereco, horario, linkWhats, foto }: { endereco: string; horario: string; linkWhats: string; foto?: string }) {
  const destino = endereco || site.endereco;
  const rota = site.maps || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;

  return (
    <section aria-labelledby="titulo-loja-fisica" className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 id="titulo-loja-fisica" className="secao text-tinta">
          A loja de verdade
        </h2>
      </div>

      <div className="cartao mt-5 grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="foto aspect-[4/3] md:aspect-auto md:min-h-[18rem]">
          {foto ? <Image src={foto} alt="A placa de entrada da SacraZen" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" /> : null}
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="etiqueta">Uberaba, MG</p>
          <p className="manchete mt-2 text-[1.375rem] text-tinta">Passa aqui: cristal se escolhe na mão.</p>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="etiqueta">Endereço</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-tinta">{destino}</dd>
            </div>
            <div>
              <dt className="etiqueta">Horário</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-tinta">{horario}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={rota} target="_blank" rel="noreferrer" className="btn btn--primario">
              Como chegar
            </a>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--linha">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
