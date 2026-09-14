import type { Categoria, Produto } from "./tipos";

/**
 * O que é atendimento (a mesa) e o que é peça (a prateleira). As duas
 * moram na mesma tabela, com categorias diferentes; a vitrine separa
 * aqui, num lugar só, para o catálogo, o menu e a home concordarem.
 */
export const SERVICOS = new Set(["atendimentos", "cursos"]);

export const ehServico = (p: Pick<Produto, "categoria_slug">) => SERVICOS.has(p.categoria_slug ?? "");
export const ehCategoriaDeServico = (c: Pick<Categoria, "slug">) => SERVICOS.has(c.slug);

export function separar(produtos: Produto[], categorias: Categoria[]) {
  const ativos = produtos.filter((p) => p.ativo);
  return {
    atendimentos: ativos.filter(ehServico).sort((a, b) => a.ordem - b.ordem),
    pecas: ativos.filter((p) => !ehServico(p)),
    categoriasDaLoja: categorias.filter((c) => c.ativo && !ehCategoriaDeServico(c)),
  };
}
