/**
 * Herdadas da base, usadas pelo painel e pelas páginas de lista.
 * A régua é o título com o fio da casa saindo dele até a margem.
 */
export function Moldura(_props: { legenda?: string; aresta?: "topo" | "base"; clara?: boolean }) {
  return <span className="moldura" aria-hidden="true" />;
}

export function Regua({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="regua">
      <h2 id={id} className="secao text-tinta">
        {children}
      </h2>
    </div>
  );
}
