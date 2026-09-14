import Link from "next/link";
import type { Categoria } from "@/lib/tipos";

/** "Navegue pela loja": as categorias como pílulas cheias, em uma linha. */
export function Chips({ categorias, titulo = "Navegue pela loja" }: { categorias: Categoria[]; titulo?: string }) {
  if (!categorias.length) return null;
  return (
    <nav aria-label={titulo} className="mx-auto max-w-[72rem] px-4 pt-8 sm:px-6 lg:px-10">
      <p className="miudo mb-3">{titulo}</p>
      <ul className="flex flex-wrap gap-2">
        {categorias.map((c) => (
          <li key={c.slug}>
            <Link href={`/catalogo/${c.slug}`} className="chip chip--cheio">
              {c.nome}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
