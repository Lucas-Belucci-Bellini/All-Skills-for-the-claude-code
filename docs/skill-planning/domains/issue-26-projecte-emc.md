# Plano e reconciliação — Issue #26: ProjectE / EMC Balance

- Issue original: [#26 — ProjectE EMC Balance](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/26)
- Notas de lote: [projecte-emc-skill-batch-notes-2026-10-17.md](../../research/projecte-emc-skill-batch-notes-2026-10-17.md)
- Manifesto de referência: `tools/skill-batch-manifests/1500.json`, SHA `ecc535a796cd5404140f0e0a1a6ef3b6e95350ce`
- Estado do plano: **RECONCILIATION_REQUIRED**
- Snapshot: `main` em `66156930b39c2ad817cacb9d56f94b0625514467`

## Resultado da verificação

Encontrei **100 slugs `projecte-emc-*`** no catálogo de `main` e no manifesto do marco 1.500. As 100 fontes e cópias do bundle existem na árvore observada, estão no catálogo e apresentam hashes iguais. Portanto, a próxima tarefa não é criar mais 100 arquivos com nomes parecidos: é validar a implementação presente, revisar os limites e demonstrar os comportamentos com dados reais.

As notas de lote são explícitas: as skills descrevem procedimentos; não afirmam que os EMCs de um modpack real já foram atribuídos ou balanceados. A versão instalada do Minecraft, loader e ProjectE, o esquema real da configuração, o inventário de itens e o equilíbrio de gameplay continuam a exigir verificação no ambiente alvo.

## Distribuição do lote conforme as notas de planejamento

O manifesto de 1.500 lista as 100 skills ProjectE em quatro grupos, reconciliados aqui pela ordem do lote e pelas notas do lote:

- **40** — inventário e atribuição de EMC.
- **25** — progressão e economia.
- **20** — exploits e integração entre mods.
- **15** — auditoria e validação final.

| # | Slug canônico | Grupo planejado | Fonte em `main` | Bundle em `main` | Paridade de SHA | Catálogo |
|---:|---|---|---|---|---|---|
| 001 | `projecte-emc-registry-snapshot` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 002 | `projecte-emc-item-coverage-ledger` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 003 | `projecte-emc-missing-item-triage` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 004 | `projecte-emc-material-equivalence-map` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 005 | `projecte-emc-processing-chain-invariant` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 006 | `projecte-emc-ingot-nugget-block-coherence` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 007 | `projecte-emc-gem-fragment-value-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 008 | `projecte-emc-byproduct-allocation` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 009 | `projecte-emc-recipe-graph-value-derivation` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 010 | `projecte-emc-renewable-finite-classification` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 011 | `projecte-emc-dimension-gate-classification` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 012 | `projecte-emc-biome-gated-resource-review` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 013 | `projecte-emc-progression-item-lock-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 014 | `projecte-emc-tool-durability-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 015 | `projecte-emc-enchantment-charge-state-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 016 | `projecte-emc-fluid-container-integrity` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 017 | `projecte-emc-nbt-component-state-classification` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 018 | `projecte-emc-inventory-container-content-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 019 | `projecte-emc-machine-component-tiering` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 020 | `projecte-emc-magic-artifact-tiering` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 021 | `projecte-emc-boss-drop-value-review` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 022 | `projecte-emc-quest-reward-protection-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 023 | `projecte-emc-item-variant-coverage` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 024 | `projecte-emc-item-alias-collision-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 025 | `projecte-emc-recipe-output-quantity-normalizer` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 026 | `projecte-emc-recipe-alternative-normalization` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 027 | `projecte-emc-crafting-remainder-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 028 | `projecte-emc-compression-chain-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 029 | `projecte-emc-smelting-cooking-chain-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 030 | `projecte-emc-machine-yield-ratio-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 031 | `projecte-emc-ore-yield-normalization` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 032 | `projecte-emc-tag-family-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 033 | `projecte-emc-custom-item-namespace-policy` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 034 | `projecte-emc-zero-value-sentinel-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 035 | `projecte-emc-outlier-bound-audit` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 036 | `projecte-emc-unresolved-registry-path-diagnostics` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 037 | `projecte-emc-candidate-confidence-record` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 038 | `projecte-emc-config-schema-version-check` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 039 | `projecte-emc-value-source-confidence-matrix` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 040 | `projecte-emc-acquisition-route-census` | Inventário/atribuição de EMC | presente | presente | SHA igual | registrada |
| 041 | `projecte-emc-progression-band-policy` | Progressão/economia | presente | presente | SHA igual | registrada |
| 042 | `projecte-emc-progression-curve-audit` | Progressão/economia | presente | presente | SHA igual | registrada |
| 043 | `projecte-emc-exploration-versus-conversion-tradeoff` | Progressão/economia | presente | presente | SHA igual | registrada |
| 044 | `projecte-emc-automation-throughput-impact` | Progressão/economia | presente | presente | SHA igual | registrada |
| 045 | `projecte-emc-renewable-loop-balance-review` | Progressão/economia | presente | presente | SHA igual | registrada |
| 046 | `projecte-emc-boss-preparation-progression-cost` | Progressão/economia | presente | presente | SHA igual | registrada |
| 047 | `projecte-emc-dimension-milestone-review` | Progressão/economia | presente | presente | SHA igual | registrada |
| 048 | `projecte-emc-tech-magic-parity-review` | Progressão/economia | presente | presente | SHA igual | registrada |
| 049 | `projecte-emc-craft-time-risk-cost-model` | Progressão/economia | presente | presente | SHA igual | registrada |
| 050 | `projecte-emc-multiplayer-economy-profile` | Progressão/economia | presente | presente | SHA igual | registrada |
| 051 | `projecte-emc-early-game-scarcity-check` | Progressão/economia | presente | presente | SHA igual | registrada |
| 052 | `projecte-emc-exploration-milestone-preservation` | Progressão/economia | presente | presente | SHA igual | registrada |
| 053 | `projecte-emc-combat-reward-economy` | Progressão/economia | presente | presente | SHA igual | registrada |
| 054 | `projecte-emc-farming-crop-value-balance` | Progressão/economia | presente | presente | SHA igual | registrada |
| 055 | `projecte-emc-mining-throughput-balance` | Progressão/economia | presente | presente | SHA igual | registrada |
| 056 | `projecte-emc-dimension-entry-cost-balance` | Progressão/economia | presente | presente | SHA igual | registrada |
| 057 | `projecte-emc-tech-tree-bypass-check` | Progressão/economia | presente | presente | SHA igual | registrada |
| 058 | `projecte-emc-magic-ritual-bypass-check` | Progressão/economia | presente | presente | SHA igual | registrada |
| 059 | `projecte-emc-endgame-material-inflation` | Progressão/economia | presente | presente | SHA igual | registrada |
| 060 | `projecte-emc-value-distribution-curve` | Progressão/economia | presente | presente | SHA igual | registrada |
| 061 | `projecte-emc-resource-sink-faucet-audit` | Progressão/economia | presente | presente | SHA igual | registrada |
| 062 | `projecte-emc-item-availability-phase-matrix` | Progressão/economia | presente | presente | SHA igual | registrada |
| 063 | `projecte-emc-playstyle-difficulty-profile` | Progressão/economia | presente | presente | SHA igual | registrada |
| 064 | `projecte-emc-automation-unlock-protection` | Progressão/economia | presente | presente | SHA igual | registrada |
| 065 | `projecte-emc-progression-acceptance-scenarios` | Progressão/economia | presente | presente | SHA igual | registrada |
| 066 | `projecte-emc-recipe-cycle-detection` | Exploits/integração | presente | presente | SHA igual | registrada |
| 067 | `projecte-emc-reversible-conversion-gain-scan` | Exploits/integração | presente | presente | SHA igual | registrada |
| 068 | `projecte-emc-renewable-to-gated-resource-path` | Exploits/integração | presente | presente | SHA igual | registrada |
| 069 | `projecte-emc-duplicate-output-signal-check` | Exploits/integração | presente | presente | SHA igual | registrada |
| 070 | `projecte-emc-state-reset-value-laundering-test` | Exploits/integração | presente | presente | SHA igual | registrada |
| 071 | `projecte-emc-storage-pipe-network-loop-audit` | Exploits/integração | presente | presente | SHA igual | registrada |
| 072 | `projecte-emc-processing-byproduct-cascade-test` | Exploits/integração | presente | presente | SHA igual | registrada |
| 073 | `projecte-emc-cross-mod-conversion-arbitrage` | Exploits/integração | presente | presente | SHA igual | registrada |
| 074 | `projecte-emc-crafting-remainder-loop-check` | Exploits/integração | presente | presente | SHA igual | registrada |
| 075 | `projecte-emc-exploit-regression-matrix` | Exploits/integração | presente | presente | SHA igual | registrada |
| 076 | `projecte-emc-variant-identity-bypass` | Exploits/integração | presente | presente | SHA igual | registrada |
| 077 | `projecte-emc-duplicate-recipe-provenance-check` | Exploits/integração | presente | presente | SHA igual | registrada |
| 078 | `projecte-emc-container-fill-state-arbitrage` | Exploits/integração | presente | presente | SHA igual | registrada |
| 079 | `projecte-emc-alternative-recipe-cost-collapse` | Exploits/integração | presente | presente | SHA igual | registrada |
| 080 | `projecte-emc-free-catalyst-cycle-check` | Exploits/integração | presente | presente | SHA igual | registrada |
| 081 | `projecte-emc-time-windowed-resource-farm-test` | Exploits/integração | presente | presente | SHA igual | registrada |
| 082 | `projecte-emc-creative-command-contamination-audit` | Exploits/integração | presente | presente | SHA igual | registrada |
| 083 | `projecte-emc-server-client-value-parity` | Exploits/integração | presente | presente | SHA igual | registrada |
| 084 | `projecte-emc-automation-side-effect-regression` | Exploits/integração | presente | presente | SHA igual | registrada |
| 085 | `projecte-emc-exploit-risk-priority-matrix` | Exploits/integração | presente | presente | SHA igual | registrada |
| 086 | `projecte-emc-config-merge-diff-review` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 087 | `projecte-emc-export-syntax-parse-test` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 088 | `projecte-emc-runtime-sample-lookup-smoke` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 089 | `projecte-emc-config-update-impact-audit` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 090 | `projecte-emc-reviewed-proposed-diff` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 091 | `projecte-emc-missing-coverage-regression` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 092 | `projecte-emc-ignored-item-reason-register` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 093 | `projecte-emc-config-backup-rollback-drill` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 094 | `projecte-emc-version-upgrade-item-delta` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 095 | `projecte-emc-release-manifest-integrity` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 096 | `projecte-emc-playtest-balance-observation` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 097 | `projecte-emc-sample-item-validation-plan` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 098 | `projecte-emc-loader-compatibility-gate` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 099 | `projecte-emc-final-coverage-report` | Auditoria/validação | presente | presente | SHA igual | registrada |
| 100 | `projecte-emc-balance-change-approval-record` | Auditoria/validação | presente | presente | SHA igual | registrada |

## Validações pendentes

- [ ] Conferir o mapeamento do manifesto com as notas de lote e revisar que os 40/25/20/15 são os grupos pretendidos, não um teste comportamental.
- [ ] Executar o sincronizador e o validador de lote em checkout limpo; registrar a saída real.
- [ ] Verificar a versão exata do Minecraft, loader, ProjectE e esquema de configuração antes de qualquer mudança em arquivos EMC.
- [ ] Inventariar todos os itens elegíveis realmente encontrados no modpack alvo, com contagens de itens elegíveis, configurados, pendentes, ignorados e erros de leitura.
- [ ] Distinguir valores confirmados de propostas; registrar regra, fonte, justificativa, confiança e exceções para cada sugestão.
- [ ] Testar ciclos de receitas, conversões, subprodutos, geração renovável, variantes, NBT/data components, durabilidade e containers.
- [ ] Fazer mudanças de configuração somente com backup, diff revisável, cópia de teste e rollback.
- [ ] Realizar playtests em uma instância descartável e registrar as limitações; não afirmar balanceamento adequado apenas pela presença das skills.
- [ ] Conferir proveniência/licenças e instalação/descoberta no Claude Code.
- [ ] Atualizar a Issue #26 e fechar somente depois de verificar seus critérios de aceite.

## Limite importante

A presença dos 100 nomes no catálogo é diferente de cobertura de todos os itens de um modpack. Não afirmar que “todas as EMCs foram definidas” sem um inventário real, métricas de cobertura, lista de exceções e evidências de teste.
