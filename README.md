# SacraZen — vitrine digital

Site público + painel da loja para a **SacraZen**, loja esotérica e religiosa de
Uberaba, MG (tarô, umbanda, cristais, incensos, velas e imagens), atendida pela
Mãe Meli e pelo Pai Gustavo. A conversão é pelo WhatsApp: não existe carrinho,
checkout nem login de cliente. Atendimento se agenda; peça se pede.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (opcional)
- **Catálogo:** 297 itens. 284 vieram do catálogo Kyte da loja, com preço; 13 do
  Instagram [@sacrazen](https://instagram.com/sacrazen) (os atendimentos e algumas
  fotos de prateleira). Exportado pela oficina do estúdio
  (`scripts/exportar-vitrine.ts` no repositório rafael-razeira-estudio).
- **Base:** duplicada da vitrine da KANTON. A lógica (dados, filtros, painel) é a
  mesma; identidade, textos, dados e todos os componentes visíveis são desta loja.

## Modo prévia

Enquanto a vitrine é uma amostra, `PREVIA` em `data/site.config.ts` faz TODO
botão de WhatsApp apontar para o estúdio, com uma mensagem só. Quando a loja
contratar: `PREVIA = null`, e o número da loja (já no mesmo arquivo) passa a valer.

## Como rodar

```bash
npm install
npm run dev
```

Sem as chaves do Supabase o projeto roda em modo local: lê `data/catalogo.json`
e serve as fotos de `public/produtos`. É o modo da prévia. A senha do painel
nesse modo é `PAINEL_SENHA_LOCAL` (padrão: `sacrazen`).

Para ligar o Supabase, o caminho é o mesmo da base: `.env.example` e as
migrações em `supabase/` (ainda são as da base; gerar as da SacraZen quando a
loja contratar).

## A identidade, em uma linha

Estrutura de portal (referência: Personare): hero com foto e o cartão de
agendar por cima, a faixa de três atendimentos atravessando o pé do hero,
grades de cartões brancos com etiqueta de categoria, pílulas de navegação,
trilho de rodinhas dos atendimentos, a loja física, os números, rodapé na
noite. Montserrat em tudo, o peso faz a hierarquia. A cor da loja entra
pela tinta (azul-marinho da parede), o latão da placa e o roxo-ametista.
A versão anterior, escura e serifada, está no branch `noite`.

## Capturas

```bash
npm i --no-save puppeteer-core
node scripts/capturar.mjs http://localhost:3000/ saida.png 390 844 full
```
