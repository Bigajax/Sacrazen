import { Estante } from "@/components/Estante";
import { FaixaLoja } from "@/components/FaixaLoja";
import { Hero } from "@/components/Hero";
import { Numeros } from "@/components/Numeros";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { TrilhoRedondo } from "@/components/TrilhoRedondo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkGeral } from "@/lib/whatsapp";

/* As portas da loja na home, nesta ordem. As outras categorias moram na
   estante (/catalogo) e no menu. */
const NA_HOME = ["cristais", "incensos-e-oleos", "velas", "taro-e-oraculos", "imagens-e-gnomos", "altar-e-defumacao"];

export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const { atendimentos, pecas, categoriasDaLoja: loja } = separar(produtos, categorias);

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


  return (
    <>
      <Hero foto={fotoHero} fotoMobile={fotoHeroMobile} atendimentos={atendimentos} whatsapp={config.whatsapp} />
      <Portas atendimentos={atendimentos} />

      <Prateleira titulo="Destaques da loja" href="/catalogo" produtos={destaques} categorias={categorias} prioridade />

      <TrilhoRedondo titulo="Atendimentos" href="/atendimentos" itens={atendimentos} />

      <Estante categorias={loja} produtos={pecas} ordem={NA_HOME} />

      <FaixaLoja endereco={config.endereco ?? ""} horario={config.horario ?? ""} linkWhats={whats} foto={placa} />

      <Numeros pecas={pecas.filter((p) => p.preco !== null).length} />
    </>
  );
}
