import Link from "next/link";
import { Moldura } from "@/components/Moldura";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-[86rem] items-center justify-center px-4 py-32 sm:px-6 lg:px-10">
      <div
        className="tem-moldura max-w-md bg-off-white p-10 text-center"
        data-ativa="true"
      >
        <p className="display-peca text-sm text-tinta">Página não encontrada</p>
        <p className="mt-3 text-sm leading-relaxed text-tinta">
          O endereço mudou ou a peça saiu da vitrine. Comece pelo catálogo.
        </p>
        <Link href="/catalogo" className="btn btn--primario mt-7">
          Ver catálogo
        </Link>
        <Moldura legenda="404" />
      </div>
    </div>
  );
}
