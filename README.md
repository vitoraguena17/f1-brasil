# 🏁 F1 Brasil · Lendas das Pistas

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

Uma experiência interativa e cinematográfica pela história dos brasileiros que venceram na Fórmula 1. Oito títulos mundiais, cinco lendas e um país inteiro acelerando junto, contados em uma timeline animada no scroll, com trilha sonora própria para cada piloto.

🚀 **Acesse o projeto online:** [https://f1brasil.pages.dev/](https://f1brasil.pages.dev/)

---

## 🌟 Principais Features e Diferenciais

O projeto foi pensado como uma **narrativa guiada pelo scroll**: cada rolagem avança a história, e animação, som e layout reagem juntos.

- 🏎️ **Timeline com a pista de corrida:** uma pista com zebras verde e amarelo atravessa a página, e um carro de F1 percorre o traçado acompanhando a leitura.
- 🎵 **Trilha sonora dinâmica por seção:** cada piloto tem sua música, que troca sozinha conforme a seção cruza o centro da tela. As faixas entram e saem com fade, foram niveladas no mesmo volume percebido (−13 LUFS) e abaixam automaticamente quando outra mídia com som começa.
- 🎬 **Legado do Senna em modo cinema:** a página escurece de forma progressiva, a pista perde a cor, e um vídeo com a frase mais marcante do Ayrton toca ao entrar na tela, com fade, controle de som e opção de assistir de novo.
- ✨ **Animações refinadas com GSAP + ScrollTrigger:** fotos que se revelam por máscara com parallax dentro da moldura, números que contam até o valor real, a assinatura do Senna "sendo escrita" e um preloader orquestrado com a entrada do hero.
- 📡 **Dados reais via API:** o número de vitórias de cada piloto é consumido da API pública Jolpica (Ergast), com cache por sessão e fallback local caso a API não responda.
- 🌍 **Internacionalização (PT/EN):** troca instantânea de idioma sem recarregar a página, com transição suave e atualização do atributo `lang` do documento.
- 📱 **Mobile First:** layout adaptado para celular, com pista mais fina, player compacto e vídeo em destaque. É no celular que a maioria das pessoas vai ver.
- ♿ **Acessibilidade:** HTML semântico, rótulos ARIA nos controles, textos alternativos traduzidos e popover nativo (Popover API), que fecha com Esc e clique fora.

---

## 🏆 A Jornada

A página conta a história em capítulos, do pioneirismo ao presente:

| Capítulo | Piloto | Destaque |
|---|---|---|
| 01 | **Emerson Fittipaldi** | O pioneiro e o campeão mais jovem da história na época |
| 02 | **Nelson Piquet** | O tricampeão estrategista e a estreia do Tema da Vitória |
| 03 | **Ayrton Senna** | O herói nacional, seguido de uma seção dedicada ao seu legado |
| 04 | **Rubens Barrichello** | A resiliência, a Ferrari e o renascimento na Brawn GP |
| 05 | **Felipe Massa** | O campeão moral de Interlagos 2008 |

Depois vêm **Gabriel Bortoleto**, o presente e o futuro do Brasil no grid, e uma homenagem aos **33 brasileiros** que já disputaram a categoria.

---

## 🏗️ Arquitetura e Boas Práticas

- **Orientado a dados:** as seções de piloto são geradas a partir de uma única configuração (`src/data/drivers.ts`) e um componente genérico (`DriverSection`). Adicionar um piloto não exige criar um novo componente.
- **Separação de responsabilidades:** hooks dedicados para dados da API (`useDriverWins`) e para a trilha de cada seção (`useSectionTrack`). Caminhos de mídia ficam em `constants/media.ts`, e os tempos de animação em `constants/motion.ts`.
- **Contextos enxutos:** o estado de áudio é dividido em contextos separados, para que as seções não sejam renderizadas de novo a cada troca de faixa.
- **Dicionários de idioma:** todos os textos ficam em `locales/pt.json` e `locales/en.json`, o que facilita revisar conteúdo e adicionar novos idiomas.
- **Animações seguras no React:** uso do `useGSAP` para limpar animações automaticamente, com integração do Lenis ao ticker do GSAP para scroll e animação rodarem no mesmo frame.
- **Tipagem estrita:** TypeScript em todo o projeto, com ESLint sem erros.
- **Performance:** `next/image` com `sizes` ajustados ao layout, carregamento preguiçoso fora do hero e mídias otimizadas (vídeo recortado na resolução nativa, logos em WebP).

---

## 🛠️ Tecnologias e Ferramentas

- **Core:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animações:** [GSAP](https://gsap.com/) + ScrollTrigger
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Hospedagem:** [Cloudflare Pages](https://pages.cloudflare.com/)

### 🔌 API Consumida
- **[Jolpica F1 API (Ergast)](https://github.com/jolpica/jolpica-f1):** fornece o histórico oficial de resultados, usado para as vitórias de cada piloto.

---

## 💻 Rodando localmente

```bash
git clone https://github.com/vitoraguena17/f1-brasil.git
cd f1-brasil
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## ⚖️ Direitos Autorais

Projeto sem fins lucrativos, criado como homenagem aos pilotos brasileiros e como estudo de desenvolvimento front-end. Imagens, vídeos, músicas e marcas pertencem aos seus respectivos autores e detentores de direitos. Se você é titular de algum conteúdo e deseja crédito ou remoção, [entre em contato](https://vitoraguena17.github.io/Personal-Portfolio/#contato).

Este projeto não possui vínculo com a Fórmula 1, a FIA, equipes ou pilotos.

---

## 👤 Autor

**Vitor Aguena**
- 🌐 [Portfólio](https://vitoraguena17.github.io/Personal-Portfolio/)
- 💼 [LinkedIn](https://www.linkedin.com/in/vitoraguena/)
