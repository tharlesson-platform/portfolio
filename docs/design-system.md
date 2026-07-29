# Design system

## Tokens

Os tokens estão em `src/styles/tokens.css` e são a fonte única para cor, tipografia, espaçamento, raio, sombra, transição, z-index, container e ritmo de seção.

- escala de espaçamento: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 e 128 px;
- raios: 10, 16, 24, 32 px e pill;
- movimento: 160, 280 e 700 ms;
- tipografia fluida com `clamp()` para H1, H2, H3 e corpo editorial;
- cores semânticas: signal, iris, amber, success e error.

## Componentes

| Componente | Função | Estados cobertos |
|---|---|---|
| Button / ButtonLink | ação principal, secundária e discreta | default, hover, focus, pressed, disabled, loading |
| Card | agrupamento de método e conteúdo | default, hover, focus via link |
| Navbar | orientação global e acesso ao CTA | desktop, mobile aberto/fechado, Escape |
| Footer | canais, autoria e retorno ao topo | hover e focus |
| Container / Grid | largura, alinhamento e ritmo responsivo | desktop, tablet e mobile |
| Input / Textarea | preparação do contato | default, hover, focus, error e success do formulário |
| Modal | contato sem backend e sem transmissão automática | open, close, Escape e backdrop |
| Badge / Tag | categoria, estado e stack | default, signal e amber |
| Accordion | capacidades por resultado | closed, open, hover, focus e teclado |
| Tabs | seleção de case | selected, unselected, hover, focus, setas, Home e End |
| Tooltip | contexto de links externos | hover e focus-within |
| Dropdown | navegação complementar | closed, open, hover e focus |

## Acessibilidade

- contraste validado pelo Lighthouse/axe;
- foco visível de 2 px com offset de 4 px;
- alvos de ação com no mínimo 44 px;
- tabs seguem o padrão ARIA e roving `tabIndex`;
- accordion usa `aria-expanded`, `aria-controls` e painel associado;
- modal usa o elemento nativo `dialog`;
- erros de formulário usam `aria-invalid` e mensagem textual;
- menu fechado usa `visibility: hidden`, removendo links da navegação por teclado;
- forced colors preserva bordas essenciais.
