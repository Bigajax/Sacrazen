import { site } from "@/data/site.config";

/**
 * A frase da casa e os números que ela pode provar. Só o que é
 * conferível: o Google, o ano, o tamanho da prateleira.
 */
export function Numeros({ pecas }: { pecas: number }) {
  const itens = [
    { numero: site.google.nota, rotulo: `no Google, em ${site.google.avaliacoes} avaliações` },
    { numero: String(site.desde), rotulo: "no mesmo endereço, em Uberaba" },
    { numero: String(pecas), rotulo: "itens na prateleira, com preço" },
  ];
  return (
    <section aria-label="A SacraZen em números" className="mt-16 bg-cartao py-14 lg:mt-20 lg:py-20">
      <div className="mx-auto max-w-[72rem] px-4 text-center sm:px-6 lg:px-10">
        <p className="falada mx-auto max-w-[44ch] text-[1.125rem] text-tinta">
          A <strong className="font-800">SacraZen</strong> é a loja esotérica e religiosa de Uberaba, atendida pela Mãe Meli e pelo
          Pai Gustavo.
        </p>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {itens.map((i) => (
            <div key={i.rotulo} className="flex flex-col">
              <dt className="order-2 miudo mt-1">{i.rotulo}</dt>
              <dd className="manchete text-[2.5rem] text-ametista">{i.numero}</dd>
            </div>
          ))}
        </dl>
        <p className="falada mx-auto mt-10 max-w-[56ch] text-[1.0625rem] text-tinta-fraca">
          Tarô, baralho cigano, mapa astral, limpeza espiritual, reiki, cristais, incensos, velas e imagens. Cristal se
          escolhe na mão e incenso se sente antes de levar.
        </p>
      </div>
    </section>
  );
}
