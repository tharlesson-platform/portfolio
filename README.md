# Portfólio — Tharlesson Souza

Portfólio técnico de **Tharlesson Souza**, construído para apresentar Site Reliability Engineering, Platform Engineering e arquitetura cloud por meio de decisões, arquitetura e efeito operacional.

O conceito visual **Control Plane** transforma a página em uma interface de observação de uma plataforma viva. O visitante encontra cases reais, fluxos de engenharia, projetos open source e caminhos diretos para contato — sem formato de currículo e sem métricas inventadas.

## Stack

- React 19 + TypeScript
- Vite 8
- Three.js para a topologia procedural do hero
- GSAP + ScrollTrigger para animações orientadas à leitura
- CSS nativo com design tokens
- Manrope Variable + IBM Plex Mono
- GitHub Pages + GitHub Actions

## Desenvolvimento local

Requisitos: Node.js 20.19 ou superior e npm.

```bash
npm ci
npm run dev
```

O Vite publicará a aplicação em `http://localhost:5173/portfolio/`.

## Validação

```bash
npm run check
npm run build
npm run preview
```

O build executa a verificação estrita de TypeScript antes de gerar os assets.

## Estrutura

```text
src/
├── components/    Componentes de layout, contato e design system
├── hooks/         Orquestração GSAP e comportamento de animação
├── styles/        Tokens globais e estilos responsivos
├── three/         Cena Three.js e fallback estático
├── App.tsx        Composição das seções e interações
├── content.ts     Cases e conteúdo estruturado
└── main.tsx       Bootstrap, fontes e estilos globais
docs/
├── direcao-criativa.md
├── sistema-de-animacoes.md
├── design-system.md
├── performance.md
└── auditoria-final.md
```

## Performance e acessibilidade

- Three.js e GSAP ficam fora do JavaScript crítico.
- Mobile e `save-data` usam a topologia estática, sem baixar o runtime 3D.
- A cena pausa fora da viewport e com a aba oculta.
- `prefers-reduced-motion` remove movimento não essencial.
- Navegação por teclado, skip link, dialog nativo, foco visível e estados de erro acessíveis.

Auditoria Lighthouse local, perfil mobile simulado, em 29/07/2026:

| Categoria | Score |
|---|---:|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Detalhes e budgets: [docs/performance.md](docs/performance.md).

## Deploy

O deploy ocorre via GitHub Actions em pushes para `master`, usando build reproduzível com `npm ci`.
Após a publicação, o pipeline consulta a URL gerada com retry e valida a assinatura de conteúdo da página.

URL: <https://tharlesson-platform.github.io/portfolio/>

Procedimento operacional: [docs/runbook-deploy-rollback.md](docs/runbook-deploy-rollback.md).

## Licença

Apache License 2.0. Consulte [LICENSE](LICENSE) e [NOTICE](NOTICE).
