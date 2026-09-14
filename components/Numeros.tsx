import { Teto } from "./Teto";
import { site } from "@/data/site.config";

/**
 * A frase da casa e os números que ela pode provar, num cartão da noite:
 * o teto de céu da loja, as luas em cima, os números em latão. Só o que
 * é conferível: o Google, o ano, o tamanho da prateleira.
 */
export function Numeros({ pecas }: { pecas: number }) {
  const itens = [
    { numero: site.google.nota, rotulo: `no Google, em ${site.google.avaliacoes} avaliações` },
    { numero: String(site.desde), rotulo: "no mesmo endereço, em Uberaba" },
    { numero: String(pecas), rotulo: "itens na prateleira, com preço" },
  ];
  return (
    <section aria-label="A SacraZen em números" className="mx-auto max-w-[72rem] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="ceu relative overflow-hidden rounded-[12px] px-6 py-12 text-center text-cera sm:px-10 lg:px-16 lg:py-16">
        <Teto className="pointer-events-none absolute left-1/2 top-3 h-14 w-[22rem] max-w-[90%] -translate-x-1/2 opacity-70" />

        <p className="falada relative mx-auto mt-12 max-w-[42ch] text-[1.125rem] text-cera lg:text-[1.25rem]">
          A <strong className="font-extrabold text-white">SacraZen</strong> é a loja esotérica e religiosa de Uberaba, atendida pela Mãe
          Meli e pelo Pai Gustavo.
        </p>

        <dl className="relative mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {itens.map((i) => (
            <div key={i.rotulo} className="flex flex-col">
              <dt className="order-2 mt-1 text-[0.8125rem] text-cera/75">{i.rotulo}</dt>
              <dd className="manchete text-[2.75rem] text-latao">{i.numero}</dd>
            </div>
          ))}
        </dl>

        <p className="relative mx-auto mt-10 max-w-[56ch] text-[0.9375rem] leading-relaxed text-cera/80">
          Tarô, baralho cigano, mapa astral, limpeza espiritual, reiki, cristais, incensos, velas e imagens. Cristal se
          escolhe na mão e incenso se sente antes de levar.
        </p>
      </div>
    </section>
  );
}
