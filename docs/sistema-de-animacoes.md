# Sistema de animações

As animações conduzem atenção, explicam relações ou confirmam uma ação. Nenhum movimento é necessário para compreender ou operar a página.

| Movimento | Objetivo | Momento e gatilho | Duração | Easing |
|---|---|---|---:|---|
| Hero reveal | ordenar promessa, explicação e ação | carregamento inicial | 740 ms, stagger de 70–80 ms | `cubic-bezier(.22,1,.36,1)` |
| Visual reveal | introduzir a topologia como prova da promessa | carregamento inicial | 950 ms | `cubic-bezier(.22,1,.36,1)` |
| Fade + reveal | marcar a entrada de um novo argumento | seção atinge 86% da viewport | 780 ms | `power3.out` |
| Cards stagger | mostrar que cards pertencem ao mesmo sistema | grupo atinge 84% da viewport | 680 ms, stagger de 80 ms | `power3.out` |
| Parallax da cena | criar profundidade sem deslocar conteúdo | progresso do hero na viewport | contínuo, `scrub: 0.7` | linear |
| Rotação do núcleo | comunicar sistema estável e vivo | cena visível | 0,075–0,16 rad/s | linear |
| Mouse follow | comunicar que o control plane é operável | ponteiro dentro da cena | interpolação de 4,5% por frame | amortecimento vetorial |
| Pulso de conexão | representar automação e telemetria | cena visível | ciclo contínuo lento | linear + seno na escala |
| Troca de case | preservar contexto durante mudança de conteúdo | seleção de tab | 580 ms | easing global de saída |
| Accordion | revelar detalhe sem perder visão do sistema | clique ou teclado | 280 ms | easing global de saída |
| Hover de card | indicar profundidade e clicabilidade | hover/focus | 280 ms | easing global de saída |
| Botão pressed | confirmar a ação no ponto de contato | `active` | 160 ms | easing padrão |
| Section transition | sinalizar mudança de capítulo | limite visual de seção | estática com pulso apenas no método | 4 s | easing padrão |

## Regras de execução

- O hero usa CSS para não depender do download do GSAP no LCP.
- GSAP é carregado somente em desktop, após 1,8 s ou no primeiro scroll.
- Mobile usa hierarquia estática e não baixa GSAP nem Three.js no carregamento inicial.
- `prefers-reduced-motion: reduce` reduz animações a 0,01 ms e mantém todo o conteúdo visível.
- A cena pausa quando sai da viewport ou quando a aba fica oculta.
- Se a média inicial exceder 22 ms por frame, DPR e sombras são reduzidos automaticamente.
