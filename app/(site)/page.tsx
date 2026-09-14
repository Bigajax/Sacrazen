import { Atendimentos } from "@/components/Atendimentos";
import { FaixaLoja } from "@/components/FaixaLoja";
import { Hero } from "@/components/Hero";
import { Trilho } from "@/components/Trilho";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao } from "@/data/site.config";

/* Quantas peças cada prateleira mostra antes do "+N na estante". */
const POR_TRILHO = 8;
/* Categorias que são serviço, não peça de prateleira. */
const SERVICOS = new Set(["atendimentos", "cursos"]);

export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const atendimentos = ativos.filter((p) => SERVICOS.has(p.categoria_slug ?? "")).sort((a, b) => a.ordem - b.ordem);

  /* a foto do hero é a primeira estrela que NÃO é atendimento: a peça
     prova que a loja existe melhor do que a mesa de tarô */
  const fotoHero = hero.find((h) => !atendimentos.some((a) => a.slug === h.slug)) ?? hero[0];

  const prateleiras = categorias
    .filter((c) => c.ativo && !SERVICOS.has(c.slug))
    .map((c) => {
      const dentro = ativos.filter((p) => p.categoria_slug === c.slug).sort((a, b) => a.ordem - b.ordem);
      return { categoria: c, produtos: dentro.slice(0, POR_TRILHO), quantas: dentro.length };
    })
    .filter((t) => t.quantas > 0);

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} foto={fotoHero} linkWhats={whats} />

      <Atendimentos atendimentos={atendimentos} whatsapp={config.whatsapp} />

      <div id="loja" className="mx-auto mt-14 scroll-mt-24 max-w-[72rem] px-4 sm:px-6 lg:mt-20 lg:px-10">
        <div className="regua">
          <h2 className="display-secao text-cera">A loja</h2>
        </div>
        <p className="falada mt-3 max-w-[40ch] text-[1.25rem] text-cera-fraca">
          {ativos.length - atendimentos.length} peças, do jeito que estão na prateleira. Toque numa para pedir.
        </p>
      </div>

      {prateleiras.map((t, i) => (
        <Trilho key={t.categoria.id} categoria={t.categoria} produtos={t.produtos} quantas={t.quantas} prioridade={i === 0} />
      ))}

      <FaixaLoja endereco={config.endereco ?? ""} horario={config.horario ?? ""} linkWhats={whats} />
    </>
  );
}
