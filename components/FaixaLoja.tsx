import { site } from "@/data/site.config";

/**
 * A loja de verdade: o mapa de como chegar, o endereço, o horário dia
 * a dia e a nota do Google. O mapa é o do Google embutido, apontado
 * pelo nome da loja, porque a rua ainda não existe no OpenStreetMap e um
 * mapa desenhado com o pino no lugar errado seria pior que nenhum.
 */
const HORARIOS = [
  { dia: "Segunda a sexta", horas: "10h às 18h30" },
  { dia: "Sábado", horas: "9h30 às 13h" },
  { dia: "Domingo", horas: "fechado" },
];

const MAPA = `https://www.google.com/maps?q=${encodeURIComponent("Sacrazen Gnomos Cristais e velas, Uberaba MG")}&z=16&output=embed`;

export function FaixaLoja({ endereco, linkWhats }: { endereco: string; horario?: string; linkWhats: string; foto?: string }) {
  const destino = endereco || site.endereco;
  const rota = site.maps || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;

  return (
    <section aria-labelledby="titulo-loja-fisica" className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 id="titulo-loja-fisica" className="secao text-tinta">
          A loja de verdade
        </h2>
        <a href={rota} target="_blank" rel="noreferrer" className="text-[0.9375rem] font-medium text-ametista hover:underline">
          Abrir no mapa
        </a>
      </div>

      <div className="cartao mt-5 grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* o mapa, numa moldura da noite */}
        <div className="relative bg-noite p-2 md:p-3">
          <iframe
            title="Mapa: como chegar na SacraZen, em Uberaba"
            src={MAPA}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="aspect-[4/3] w-full rounded-[6px] border-0 md:aspect-auto md:h-full md:min-h-[22rem]"
          />
          <a
            href={rota}
            target="_blank"
            rel="noreferrer"
            className="btn btn--cta absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-3.5 text-[0.9375rem] shadow-[0_10px_24px_-10px_rgba(9,18,38,0.7)] md:bottom-6"
          >
            Como chegar
          </a>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="etiqueta">Bairro Guanabara, Uberaba</p>
          <p className="manchete mt-2 text-[1.5rem] leading-tight text-tinta">Passa aqui.</p>
          <p className="falada mt-2 max-w-[34ch] text-[1.0625rem] text-tinta-fraca">
            Cristal se escolhe na mão e incenso se sente antes de levar. Vem conhecer a mesa.
          </p>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-tinta">{destino}</p>

          <dl className="mt-5 divide-y divide-fio border-y border-fio text-[0.9375rem]">
            {HORARIOS.map((h) => (
              <div key={h.dia} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-tinta-fraca">{h.dia}</dt>
                <dd className="font-semibold text-tinta">{h.horas}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={site.maps} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[0.9375rem] text-tinta hover:text-ametista">
              <span aria-hidden="true" className="tracking-[0.12em] text-latao">★★★★★</span>
              <span>
                <strong className="font-bold">{site.google.nota}</strong> no Google, {site.google.avaliacoes} avaliações
              </span>
            </a>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="text-[0.9375rem] font-medium text-ametista hover:underline">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
