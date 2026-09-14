import { site } from "@/data/site.config";

/**
 * Onde a loja fica, quando abre, e o caminho. Sem mapa embutido: o
 * endereço abre o app de mapas da pessoa, que é o que ela vai usar.
 * O bloco é a parede azul da loja, um tom acima da noite.
 */
export function FaixaLoja({ endereco, horario, linkWhats }: { endereco: string; horario: string; linkWhats: string }) {
  const destino = endereco || site.endereco;
  const rota = site.maps || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;

  return (
    <section aria-labelledby="titulo-loja-fisica" className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="rounded-lg bg-parede px-6 py-10 sm:px-10 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:py-14">
        <div>
          <h2 id="titulo-loja-fisica" className="display-secao text-cera">
            A loja de verdade, em Uberaba
          </h2>
          <p className="falada mt-3 max-w-[34ch] text-[1.25rem] text-cera-fraca">
            Cristal se escolhe na mão e incenso se sente antes de levar. Passa aqui.
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="miudo">Endereço</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-cera">{destino}</dd>
            </div>
            <div>
              <dt className="miudo">Horário</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-cera">{horario}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={rota} target="_blank" rel="noreferrer" className="btn btn--primario">
              Como chegar
            </a>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--linha">
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--fio)] pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="preco text-[3.5rem] leading-none text-latao">{site.google.nota}</p>
          <p className="mt-2 text-[0.9375rem] text-cera">
            no Google, em {site.google.avaliacoes} avaliações.
          </p>
          <p className="miudo mt-6 max-w-[34ch]">
            Desde {site.desde} no mesmo endereço: nasceu como Loja Astral e virou SacraZen. Atendida pela Mãe Meli e pelo Pai
            Gustavo.
          </p>
        </div>
      </div>
    </section>
  );
}
