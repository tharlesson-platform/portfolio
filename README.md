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

## Validação em runner local isolado

Apenas os jobs automáticos `build` (`.github/workflows/deploy.yml`) e
`guardrails` são migrados para a label exclusiva `portfolio-run-${{ github.run_id }}`.
Os gatilhos push/PR em `master`, guardrails em `main`/`master`, permissões e
concorrência existentes são preservados. Não há nova admissão neste patch:
o controlador separado precisa aprovar repo, workflow, job, evento e SHA exatos.

Checkout usa commit completo da action, head do PR ou SHA do push e
`persist-credentials: false`. A validação exige VM Linux ARM64 com marker,
sem mounts compartilhados, SSH agent, credenciais/perfis AWS ou variáveis do gateway
local de artifacts. Node 24, `npm ci` e `npm run build` (TypeScript + Vite)
continuam iguais, com timeout de 20 minutos. A configuração Code Quality existente
não é alterada nem ativada pela migração.

**Pages permanece manual:** dispatch em `master` mantém a rota hosted para o
build; os passos Setup Pages/Upload artifact e todo o job `deploy`, incluindo
condição, environment, permissões e smoke, são byte-idênticos à base revisada.
Push/PR nunca executam esses passos. Nenhum gateway de artifacts do host é usado.
Não foi executado dispatch, upload, deploy ou smoke remoto nesta preparação.

As provas nativas usam Node 24 oficial verificado por SHA256, cópia descartável
e cache npm próprio. Build local não comprova execução da CI em VM nem publicação
Pages. Fonte limitada a dois workflows e este README, sujeita a revisão independente
antes de PR; rollback nesta fase é não publicar/admitir a fonte.
