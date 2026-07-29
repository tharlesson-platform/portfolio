# Auditoria final

## Primeira auditoria — problemas críticos encontrados e corrigidos

1. **Tailwind via CDN em produção** — removido; CSS nativo compilado e versionado.
2. **Componente único com 725 linhas** — dividido em conteúdo, componentes, hooks, estilos e cena.
3. **JSX inconsistente no painel de projetos** — substituído por TypeScript estrito e build obrigatório.
4. **Placeholders visíveis para screenshots e resultados** — removidos; cases usam problema, arquitetura, decisão e efeito reais.
5. **Portfólio com aparência de currículo** — reposicionado como control plane de uma empresa de engenharia de plataformas.
6. **Three.js disputando rede com o LCP mobile** — movido para chunk diferido e substituído por fallback estático em mobile.
7. **GSAP carregado antes do conteúdo crítico** — postergado para desktop após LCP ou primeiro scroll.
8. **Menu mobile comprimido pelo containing block da navbar** — painel recebeu altura explícita e posicionamento local correto.
9. **Menu fechado ainda alcançável por teclado** — `visibility: hidden` aplicado ao estado fechado.
10. **Seções sem nome acessível e tabs incompletas** — IDs associados e navegação por setas, Home e End implementadas.

## Dez melhorias que elevaram a percepção de qualidade

1. Topologia 3D com significado operacional e não decorativo.
2. Paleta com função semântica para fluxo, escala, decisão e estado.
3. Tipografia editorial com fonte técnica restrita a metadados.
4. Cases organizados como narrativa de decisão, não galeria de repositórios.
5. Fluxos arquiteturais legíveis sem depender da animação.
6. Microinterações coerentes em botões, cards, links, accordion e tabs.
7. Contato funcional que abre um rascunho local e não coleta dados.
8. Conteúdo open source integrado à narrativa da marca.
9. Metadados SEO, canonical e dados estruturados de pessoa.
10. Degradação progressiva por viewport, economia de dados e preferência de movimento.

## Segunda auditoria

### Visual e experiência

- grid consistente em 1440, 768 e 390 px;
- ausência de overflow horizontal nos três breakpoints;
- hero mantém a promessa como primeiro foco; mobile posiciona a cena depois da ação;
- contraste, foco e estados de erro legíveis;
- menu, modal, tabs e accordion operáveis por teclado;
- animações não bloqueiam compreensão nem interação.

### Código e entrega

- `npm run build`: aprovado;
- TypeScript estrito: aprovado;
- console da build auditada: sem erros;
- Lighthouse: 99 / 100 / 100 / 100;
- FCP: 1,5 s; LCP: 1,9 s; TBT: 30 ms; CLS: 0;
- dependências instaladas: 0 vulnerabilidades reportadas pelo npm audit.

## Veredito do diretor de arte

**APROVADO.** Não foram encontrados problemas críticos remanescentes na auditoria local. A validação de dados de campo e diferenças do ambiente GitHub Pages deve ocorrer após publicação, porque latência, cache e GPU do usuário não podem ser comprovados localmente.

## Revisão SRE independente

**APPROVED.** A revisão confirmou build em pull requests com Node.js 24 LTS, permissões mínimas por job, actions fixadas por SHA, smoke test pós-deploy, branch protection com `guardrails` e `build` obrigatórios e rollback documentado.

Riscos residuais baixos:

- exigir aprovação humana caso o repositório passe a receber colaboração externa;
- avaliar RUM de Core Web Vitals após a publicação.
