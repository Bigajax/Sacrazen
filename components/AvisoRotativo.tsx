/**
 * A tarja de recados da loja, na noite, passando devagar e separada por
 * uma lua pequena. O texto vem de `config.aviso_topo`, um recado por " | ".
 */
export function AvisoRotativo({ avisos }: { avisos: string[] }) {
  const limpos = avisos.map((a) => a.trim()).filter(Boolean);
  if (!limpos.length) return null;

  const volta = [...limpos, ...limpos, ...limpos, ...limpos];

  return (
    <div className="bg-noite py-1.5">
      <div className="marquee-janela">
        <ul className="marquee marquee--rapida" aria-hidden="true">
          {volta.map((texto, i) => (
            <li key={`${texto}-${i}`} className="flex shrink-0 items-center">
              <span className="px-5 text-[0.75rem] font-medium text-cera/85">{texto}</span>
              <span aria-hidden="true" className="text-[0.5rem] text-latao">
                ●
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="sr-only">{limpos.join(". ")}.</p>
    </div>
  );
}
