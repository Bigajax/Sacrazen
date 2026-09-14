import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";
import { site } from "@/data/site.config";

export default async function LayoutSite({ children }: { children: React.ReactNode }) {
  const [{ categorias }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const whats = linkGeral(config.whatsapp);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-latao focus:px-4 focus:py-3 focus:text-noite"
      >
        Ir para o conteúdo
      </a>
      <Cabecalho avisoTopo={config.aviso_topo ?? ""} linkWhats={whats} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Rodape categorias={categorias} linkWhats={whats} instagram={config.instagram || site.instagram} />
    </div>
  );
}
