# Planejamento de skills

**Estado deste diretório: planejamento e governança.** Os documentos aqui não são skills executáveis, não são instalados por plugins e não aumentam a contagem de skills implementadas.

## Documentos

- [Plano de organização do repositório](REPOSITORY-ORGANIZATION-PLAN.md) — baseline observado, conflitos documentais e sequência recomendada.
- [Registro de Issues e PRs](PLANNED-SKILLS-ISSUE-REGISTER.md) — fila existente de planejamento e execução, com links para as Issues originais.
- [Template de plano por Issue/domínio](DOMAIN-PLAN-TEMPLATE.md) — formato usado para listar cada skill candidata antes de criar seu `SKILL.md`.

## Convenção para os próximos planos

Cada Issue de planejamento será decomposta, por etapas, em um documento próprio:

`docs/skill-planning/domains/issue-<número>-<slug-do-domínio>.md`

Esse documento conterá a lista nominal de candidatas da Issue, com identificador provisório, capacidade específica, possíveis sobreposições, dependências, critério de aceite e estado explícito. O arquivo não substituirá a Issue: será a representação versionada do plano detalhado ligado a ela.

## Estados obrigatórios

| Estado | Significado |
|---|---|
| `PLANNED` | Intenção registrada; a skill não foi implementada. |
| `CANDIDATE_REVIEW` | Nome e responsabilidade foram propostos; faltam auditoria de sobreposição e escopo. |
| `APPROVED_FOR_IMPLEMENTATION` | Candidata revisada, com limite e critérios de aceite definidos. |
| `IN_PROGRESS` | Implementação iniciada em branch de trabalho. |
| `IMPLEMENTED_UNVALIDATED` | Arquivo de skill existe, mas ainda não passou pela validação exigida. |
| `STRUCTURALLY_VALIDATED` | Estrutura e metadados passaram nos validadores correspondentes. |
| `BEHAVIOR_TESTED` | Exemplos/testes de comportamento foram executados e registrados. |
| `PUBLISHED` | Mudança foi revisada e incorporada ao destino acordado. |
| `REUSED` | Uma skill existente atende ao objetivo; registrar caminho canônico, sem duplicar. |
| `DEFERRED` / `REJECTED` | Candidata adiada ou descartada, com justificativa. |

## Regras

1. Planejamento não é implementação. Uma meta de 2.000 skills em uma Issue não significa que existam 2.000 nomes únicos nem arquivos prontos.
2. Não criar placeholders `SKILL.md` em diretórios de skills reais. Os planos ficam sob `docs/skill-planning/`.
3. Conferir `SKILL_LIBRARY_CATALOG.json`, o catálogo Markdown, fontes canônicas, bundles e PRs antes de aprovar uma candidata.
4. Reutilizar ou referenciar uma skill existente quando ela já cobre a responsabilidade; não contar cópias de bundle ou aliases como skills novas.
5. Converter o backlog gradualmente, usando as Issues existentes como fila. Não gerar centenas de Issues novas para representar cada candidata.
6. Trabalhar em branches revisáveis e PRs pequenos. Não alterar `main`, fazer merge ou reescrever histórico sem autorização explícita.
7. Fechar cada Issue somente quando seus critérios de aceitação tiverem evidências verificáveis.
