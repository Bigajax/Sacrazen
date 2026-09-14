import Image from "next/image";
import Link from "next/link";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * A entrada da loja. Em vez de uma prateleira atrás da outra (cristais,
 * incensos, velas...), que cansa antes de chegar ao fim, a home mostra
 * as portas: uma foto por categoria, com o nome e quantas peças, e um
 * botão só para a loja inteira. Quem quer ver tudo vai para a estante;
 * quem já sabe o que quer entra pela porta certa.
 */
export function Estante({ categorias, produtos, ordem }: { categorias: Categoria[]; produtos: Produto[]; ordem: string[] }) {
  const portas = ordem
    .map((slug) => categorias.find((c) => c.slug === slug))
    .filter((c): c is Categoria => Boolean(c))
    .map((c) => {
      const dentro = produtos.filter((p) => p.categoria_slug === c.slug);
      /* a capa é a estrela da categoria, se houver; senão a primeira peça */
      const capa = (dentro.find((p) => p.destaque) ?? dentro.find((p) => p.preco !== null) ?? dentro[0])?.imagens[0];
      return { ...c, quantas: dentro.length, capa };
    })
    .filter((c) => c.quantas > 0);

  const total = produtos.length;

  return (
    <section id="loja" aria-labelledby="titulo-loja" className="mx-auto max-w-[72rem] scroll-mt-6 px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="regua">
        <h2 id="titulo-loja" className="secao text-tinta">
          A loja
        </h2>
        <Link href="/catalogo" className="text-[0.9375rem] font-medium text-ametista hover:underline">
          Ver a loja inteira
        </Link>
      </div>
      <p className="falada mt-3 max-w-[44ch] text-[1.0625rem] text-tinta-fraca">
        {total} peças na prateleira. Entra pela porta que você procura, ou vê tudo de uma vez.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {portas.map((c) => (
          <li key={c.slug}>
            <Link href={`/catalogo/${c.slug}`} className="group relative block overflow-hidden rounded-[10px] bg-noite">
              <span className="foto block aspect-[4/3] bg-noite lg:aspect-[3/2]">
                {c.capa ? (
                  <Image
                    src={c.capa.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 44vw, 30vw"
                    placeholder={c.capa.blur ? "blur" : "empty"}
                    blurDataURL={c.capa.blur ?? undefined}
                    className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                ) : null}
              </span>
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(9,18,38,0.85)_100%)]" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                <span className="titulo-cartao text-[0.8125rem] text-white sm:text-[0.9375rem]">{c.nome}</span>
                <span className="shrink-0 rounded-full bg-latao px-2 py-0.5 text-[0.6875rem] font-bold text-noite">{c.quantas}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link href="/catalogo" className="btn btn--cta w-full sm:w-auto sm:min-w-[20rem]">
          Ver a loja inteira
        </Link>
        <p className="miudo mt-3">Busca, filtro por categoria e preço, e o WhatsApp em cada peça.</p>
      </div>
    </section>
  );
}
