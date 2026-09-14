import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkGeral } from "@/lib/whatsapp";
import { site } from "@/data/site.config";

export default async function LayoutSite({ children }: { children: React.ReactNode }) {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const { categoriasDaLoja } = separar(produtos, categorias);
  const whats = linkGeral(config.whatsapp);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-tinta focus:px-4 focus:py-3 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <Cabecalho categorias={categoriasDaLoja} linkWhats={whats} avisoTopo={config.aviso_topo ?? ""} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Rodape
        linkWhats={whats}
        instagram={config.instagram || site.instagram}
        horario={config.horario ?? ""}
      />
    </div>
  );
}
