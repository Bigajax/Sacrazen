import { Chips } from "@/components/Chips";
import { FaixaLoja } from "@/components/FaixaLoja";
import { Hero } from "@/components/Hero";
import { Numeros } from "@/components/Numeros";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { TrilhoRedondo } from "@/components/TrilhoRedondo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";

/* Categorias que são serviço, não peça de prateleira. */
const SERVICOS = new Set(["atendimentos", "cursos"]);

/* As prateleiras da home, nesta ordem. O resto fica para as pílulas e
   para a estante. */
const NA_HOME = ["cristais", "incensos-e-oleos", "velas", "taro-e-oraculos", "imagens-e-gnomos", "altar-e-defumacao"];

export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const atendimentos = ativos.filter((p) => SERVICOS.has(p.categoria_slug ?? "")).sort((a, b) => a.ordem - b.ordem);
  const pecas = ativos.filter((p) => !SERVICOS.has(p.categoria_slug ?? ""));

  /* a foto do hero é a mesa de tarô: a primeira estrela que é atendimento */
  const fotoHero = hero.find((h) => atendimentos.some((a) => a.slug === h.slug))?.url;
  /* para o celular, a foto em pé da consulta (a Mãe Meli com o baralho, a
     sexta do carrossel); se a ordem mudar na oficina, cai na mesma do desktop */
  const consulta = atendimentos.find((a) => a.slug.startsWith("consulta-de-taro"));
  const fotoHeroMobile = consulta?.imagens.find((i) => i.url.endsWith("-6.webp"))?.url ?? fotoHero;
  /* as estrelas que não são atendimento abrem a loja */
  const destaques = hero
    .map((h) => pecas.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const placa = pecas.find((p) => p.slug.startsWith("gato-da-sorte"))?.imagens[0]?.url;

  const prateleiras = NA_HOME.map((slug) => {
    const categoria = categorias.find((c) => c.slug === slug);
    if (!categoria) return null;
    const dentro = pecas.filter((p) => p.categoria_slug === slug && !destaques.includes(p)).sort((a, b) => a.ordem - b.ordem);
    return dentro.length ? { categoria, produtos: dentro } : null;
  }).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const loja = categorias.filter((c) => c.ativo && !SERVICOS.has(c.slug));

  return (
    <>
      <Hero foto={fotoHero} fotoMobile={fotoHeroMobile} atendimentos={atendimentos} whatsapp={config.whatsapp} />
      <Portas atendimentos={atendimentos} />

      <Prateleira titulo="Destaques da loja" href="/catalogo" produtos={destaques} categorias={categorias} prioridade />
      <Chips categorias={loja} />

      <TrilhoRedondo titulo="Atendimentos" href="/catalogo/atendimentos" itens={atendimentos} />

      {prateleiras.map((t) => (
        <Prateleira
          key={t.categoria.slug}
          titulo={t.categoria.nome}
          href={`/catalogo/${t.categoria.slug}`}
          produtos={t.produtos}
          categorias={categorias}
          mostrarCategoria={false}
        />
      ))}

      <FaixaLoja endereco={config.endereco ?? ""} horario={config.horario ?? ""} linkWhats={whats} foto={placa} />

      <Numeros pecas={pecas.filter((p) => p.preco !== null).length} />
    </>
  );
}
