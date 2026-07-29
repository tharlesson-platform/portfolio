# Runbook — deploy e rollback do portfólio

## Escopo

Publicação estática em GitHub Pages por meio do workflow `Deploy Portfolio to GitHub Pages`.

## Pré-requisitos

- environment `github-pages` restrito à branch `master`;
- checks `guardrails` e `build` aprovados;
- `npm ci` e `npm run build` concluídos no pipeline;
- URL esperada: `https://tharlesson.github.io/portfolio/`.

> Estado verificado em 22/07/2026: `master` ainda não possui branch protection. Antes de permitir colaboração ou pushes de terceiros, habilite proteção com pull request obrigatório e os checks `guardrails` e `build` como required. Até lá, restrinja pushes diretos administrativamente.

## Fluxo de deploy

1. O push em `master` inicia o workflow.
2. O job `build` instala pelo lockfile, valida TypeScript e gera `dist/`.
3. O artifact é enviado ao GitHub Pages.
4. O job `deploy` publica o artifact no environment `github-pages`.
5. O smoke test consulta a URL retornada pelo deployment com retry, timeout e validação da assinatura `Tharlesson Souza`.

O deploy só deve ser comunicado como concluído quando os jobs `build`, `deploy` e `Smoke test published page` estiverem verdes.

## Sinais para rollback

- smoke test pós-deploy falhou após todos os retries;
- página retorna status HTTP diferente de 2xx;
- assets críticos retornam 404 sob `/portfolio/`;
- navegação principal, cases ou contato ficaram indisponíveis;
- regressão crítica de acessibilidade, segurança ou performance confirmada após publicação.

## Rollback seguro

Não force-push e não reescreva `master`.

1. Identifique o último commit publicado com todos os gates verdes.
2. Crie uma branch de rollback a partir de `master`.
3. Reverta o commit defeituoso com `git revert <sha>`; para vários commits, reverta explicitamente o intervalo aplicável.
4. Execute localmente:

   ```bash
   npm ci
   npm run check
   npm run build
   ```

5. Abra e aprove a mudança de rollback pelo fluxo normal do repositório.
6. Faça merge em `master` e acompanhe o workflow até o smoke test.
7. Confirme a URL pública em desktop e mobile.

## Validação pós-rollback

- status HTTP 2xx na URL canônica;
- título contém `Tharlesson Souza`;
- assets carregam sob o base path `/portfolio/`;
- navegação para `#cases`, `#capacidades`, `#metodo` e `#contato` funciona;
- console sem erros;
- workflow do commit de rollback permanece verde.

## Forward fix

Depois de estabilizar a versão anterior:

1. registre a causa da regressão;
2. corrija em uma branch separada;
3. repita build, auditoria Lighthouse proporcional ao impacto e revisão;
4. publique novamente pelo mesmo pipeline — nunca por upload manual.
