# Planejamento de skills

**Estado deste diretório: planejamento e governança.** Os documentos aqui não são skills executáveis, não são instalados por plugins e não aumentam a contagem de skills implementadas.

## Documentos

- [Plano de organização do repositório](REPOSITORY-ORGANIZATION-PLAN.md) — baseline observado, conflitos documentais e sequência recomendada.
- [Fluxo de dados e ADR-0001 da fonte canônica](SKILL-DATA-FLOW-AND-ADR-0001.md) — diagrama proposto, divergência entre diretórios e critérios antes de aprovar qualquer migração.
- [Registro de Issues e PRs](PLANNED-SKILLS-ISSUE-REGISTER.md) — fila existente de planejamento e execução, com links para as Issues originais.
- [Template de plano por Issue/domínio](DOMAIN-PLAN-TEMPLATE.md) — formato usado para registrar cada candidata antes de criar seu `SKILL.md`.
- [Issue #25 — ATM10 troubleshooting](domains/issue-25-atm10-troubleshooting.md) — reconciliação de 100 slugs já presentes em `main`; mapeamento 50/25/25 e validação comportamental pendentes.
- [Issue #26 — ProjectE / EMC](domains/issue-26-projecte-emc.md) — reconciliação de 100 slugs já presentes em `main`; validação de configuração real, cobertura e gameplay pendentes.
- [Issue #48 — Blender: 250 temas](domains/issue-48-blender.md) — 250 tópicos transcritos como candidatas, com slugs provisórios e revisão semântica pendente.
- [Issue #50 — Texturas NEXORA: meta 1.000](domains/issue-50-nexora-textures.md) — escopo e fases registrados; candidatos nominais serão definidos após auditoria.

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

## Primeiras reconciliações concluídas

A auditoria inicial encontrou os arquivos de fonte e bundle das 100 skills da Issue #25 e das 100 skills da Issue #26 em `main`. Os 200 pares têm hashes iguais no snapshot remoto. Isso não substitui testes locais, revisão semântica, proveniência/licenças ou teste no Claude Code; os dois planos permanecem abertos para validação.
