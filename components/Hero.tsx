import Image from "next/image";
import { FormAgenda } from "./FormAgenda";
import { Teto } from "./Teto";
import { site } from "@/data/site.config";
import type { Produto } from "@/lib/tipos";

/**
 * A fachada: foto da mesa ao fundo, a noite da loja por cima, a
 * manchete à esquerda e o cartão de agendar à direita, como um portal.
 * O teto de luas fica em fio, no alto, como assinatura da casa.
 */
export function Hero({ foto, atendimentos, whatsapp }: { foto?: string; atendimentos: Produto[]; whatsapp: string }) {
  return (
    <section className="ceu relative overflow-hidden text-cera">
      {foto ? (
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={foto} alt="" fill priority sizes="100vw" className="object-cover object-[center_18%] opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,27,54,0.96)_0%,rgba(14,27,54,0.78)_45%,rgba(14,27,54,0.35)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(14,27,54,0.9))]" />
        </div>
      ) : null}

      <Teto className="pointer-events-none absolute left-1/2 top-3 h-16 w-[26rem] max-w-[90vw] -translate-x-1/2 opacity-70 lg:h-20 lg:w-[34rem]" />

      <div className="relative mx-auto grid max-w-[72rem] gap-8 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-28">
        <div>
          <p className="etiqueta text-latao">Mãe Meli e Pai Gustavo, desde {site.desde}</p>

          {/* três verbos, as três portas da loja: a mesa, o altar, a prateleira.
              A última linha é a placa de latão da entrada. */}
          <h1 className="manchete mt-4 text-[clamp(1.875rem,4.6vw,3.25rem)] text-white">
            Pergunta pro tarô.
            <br />
            Acende a vela.
            <br />
            Leva o cristal.
          </h1>
          <p className="mt-4 inline-block rounded-md border-2 border-latao px-3 py-1.5 text-[clamp(1rem,2vw,1.375rem)] font-bold text-latao">
            A loja esotérica de Uberaba
          </p>

          <p className="falada mt-6 max-w-[44ch] text-[1.0625rem] text-cera/85">
            Dois pais de santo lendo juntos. E a prateleira com o que a mesa pediu: incenso, vela, imagem, cristal.
          </p>

          <p className="mt-5 flex items-center gap-2 text-[0.8125rem] text-cera-fraca">
            <span aria-hidden="true" className="tracking-[0.15em] text-latao">★★★★★</span>
            {site.google.nota} no Google, {site.google.avaliacoes} pessoas avaliaram.
          </p>
        </div>

        <div className="lg:justify-self-end lg:w-[26rem]">
          <FormAgenda opcoes={atendimentos} whatsapp={whatsapp} />
        </div>
      </div>
    </section>
  );
}
