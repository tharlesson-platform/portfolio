# Auditoria de performance

## Resultado medido

Lighthouse local na build de produção, perfil mobile simulado, em 29/07/2026:

| Categoria / métrica | Resultado | Gate |
|---|---:|---:|
| Performance | 99 | > 95 |
| Accessibility | 100 | > 95 |
| Best Practices | 100 | > 95 |
| SEO | 100 | > 95 |
| FCP | 1,5 s | < 2,0 s |
| LCP | 1,9 s | < 2,5 s |
| TBT | 30 ms | < 200 ms |
| CLS | 0 | < 0,1 |

INP depende de dados de campo. O gate definido é menor que 200 ms; TBT de 0 ms e interações sem trabalho síncrono pesado são os proxies laboratoriais atuais.

## Budgets

| Recurso | Budget gzip | Build atual gzip |
|---|---:|---:|
| HTML | 5 KB | 0,86 KB |
| CSS crítico | 20 KB | 10,93 KB |
| JavaScript inicial | 90 KB | 72,64 KB |
| GSAP + ScrollTrigger, diferido | 55 KB | 44,96 KB |
| Three.js + cena, diferido | 140 KB | 126,59 KB |
| Transferência inicial mobile | 160 KB | ~140 KB |
| Total desktop após recursos diferidos | 350 KB | ~312 KB |

## Otimizações aplicadas

- **Three.js:** chunk independente, geometria procedural, um canvas, sem GLTF, shaders customizados ou texturas; DPR limitado; sombras removidas em dispositivos compactos; cena pausada fora da viewport.
- **Versão otimizada:** mobile e `save-data` recebem o mesmo conceito em CSS, sem baixar o runtime 3D.
- **GSAP:** chunk independente e posterior ao LCP; desativado em mobile e redução de movimento.
- **Fontes:** self-hosted, `font-display: swap`, Manrope variável e apenas os pesos Latin necessários de IBM Plex Mono.
- **Imagens e vídeo:** nenhum asset raster ou vídeo é necessário; isso evita decode, layout shift e preloads sem função narrativa.
- **JavaScript:** TypeScript estrito, imports ESM, tree shaking e code splitting por recurso pesado.
- **CSS:** sem framework em runtime e sem CDN; tokens centralizados e media queries por capacidade.
- **Lazy loading:** cena carregada com `React.lazy`, `Suspense` e idle callback; fallback preserva layout e significado.
- **Memoization:** seleção do case derivada com `useMemo`; dados estáticos ficam fora da árvore de renderização.
- **Render loop:** IntersectionObserver, Page Visibility e degradação adaptativa por média de frame.
- **SEO:** HTML semântico, canonical, Open Graph, JSON-LD, descrição e idioma pt-BR.

## Metas de produção

- carregamento utilizável abaixo de 3 s em conexão padrão;
- 60 FPS em desktop intermediário;
- degradação de qualidade antes de aceitar média superior a 22 ms por frame;
- LCP < 2,5 s, INP < 200 ms e CLS < 0,1 no percentil 75 de dados reais.
