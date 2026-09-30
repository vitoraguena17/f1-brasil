# F1 Brasil — Lendas das Pistas

Uma timeline interativa pela história dos brasileiros que venceram na Fórmula 1: Emerson Fittipaldi, Nelson Piquet, Ayrton Senna, Rubens Barrichello e Felipe Massa. Depois vêm Gabriel Bortoleto, o presente, e as menções honrosas a todos que chegaram ao grid.

Cada piloto tem sua própria trilha sonora, que troca conforme o scroll. As vitórias vêm da API [Jolpica (Ergast)](https://github.com/jolpica/jolpica-f1).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + ScrollTrigger para as animações
- [Lenis](https://lenis.darkroom.engineering) para o smooth scroll

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
├── app/                 # layout, página e estilos globais
├── components/
│   ├── audio/           # player da trilha sonora
│   ├── header/
│   ├── hero/
│   ├── timeline/        # DriverSection, legado do Senna, Bortoleto, menções
│   └── ui/              # cards, pista, preloader e blocos editoriais
├── constants/
│   ├── media.ts         # caminhos das imagens e trilhas
│   └── motion.ts        # tempos da animação de entrada
├── contexts/            # idioma (PT/EN) e faixa ativa
├── data/drivers.ts      # configuração de cada piloto da timeline
├── hooks/               # vitórias via API e trilha por seção
└── locales/             # textos em pt.json e en.json
```

### Adicionando um piloto

1. Coloque as imagens em `public/<piloto>/` e registre os caminhos em `src/constants/media.ts`.
2. Adicione a trilha em `TRACKS`, no mesmo arquivo.
3. Crie a entrada em `src/data/drivers.ts`. Cada card aponta para uma chave de texto.
4. Escreva os textos em `src/locales/pt.json` e `en.json`, no namespace com o `id` do piloto (`label`, `nickname` e `<card>.period|title|text`).
5. Renderize `<DriverSection driver={DRIVERS.<id>} />` em `src/app/page.tsx`.
