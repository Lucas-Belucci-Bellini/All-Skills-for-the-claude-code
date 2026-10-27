# Plano e reconciliação — Issue #25: ATM10 Modpack Troubleshooting

- Issue original: [#25 — ATM10 Modpack Troubleshooting](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/25)
- PR relacionada: [#42 — lote ATM10 de 100 skills](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/42)
- Roadmap: [Issue #39](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/39)
- Estado do plano: **RECONCILIATION_REQUIRED**
- Snapshot: `main` em `66156930b39c2ad817cacb9d56f94b0625514467`
- Manifesto consultado: `tools/skill-batch-manifests/1250.json`, SHA `3d5daebe6132959005224892fead98c14a60c6bb`

## Resultado da verificação

No snapshot de `main`, os **100 slugs do manifesto de ATM10** aparecem no catálogo, no caminho de fonte e no bundle distribuído; os 100 pares de fonte/bundle têm SHA idêntico. Isso é evidência estrutural remota. **Não significa que os 100 fluxos foram executados/testados, nem que os critérios de aceitação da Issue estejam completos.**

A PR #42 permanece aberta em Draft e usa a branch-base `feat/skills-expansion-1150-from-1000-2026`, em vez de apontar diretamente para `main`. Seu estado é diferente do conteúdo observado no snapshot de `main`; comparar SHAs, dependências e diffs antes de decidir qualquer ação nela. Não fechar nem mesclar a PR automaticamente.

## Classificação exigida pela Issue

A Issue exige 50 skills de resolução geral, 25 de interação/conflito entre mods e 25 de bugs individuais de mods. O manifesto consultado registra apenas a categoria ampla `Minecraft & modpack engineering`; ele não declara o subgrupo para cada slug. Por isso, a correspondência exata dos 100 nomes com o split 50/25/25 permanece **PENDENTE**, e não será inferida apenas pelo nome do arquivo.

## Inventário individual

| # | Slug canônico | Subgrupo da Issue | Fonte em `main` | Bundle em `main` | Paridade de SHA | Catálogo |
|---:|---|---|---|---|---|---|
| 001 | `atm10-attribute-modifier-stacking-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 002 | `atm10-automated-farm-tick-load` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 003 | `atm10-automation-recipe-loop-interaction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 004 | `atm10-backup-restore-drill` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 005 | `atm10-biome-feature-injection-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 006 | `atm10-chunk-corruption-scope-assessment` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 007 | `atm10-chunk-generation-stutter-analysis` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 008 | `atm10-client-server-mod-parity-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 009 | `atm10-client-world-join-failure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 010 | `atm10-config-migration-compatibility` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 011 | `atm10-config-scope-client-server-check` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 012 | `atm10-config-syntax-regression` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 013 | `atm10-crash-loop-recovery` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 014 | `atm10-crash-report-evidence-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 015 | `atm10-datapack-priority-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 016 | `atm10-datapack-recipe-load-validation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 017 | `atm10-dedicated-server-startup-failure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 018 | `atm10-dimension-transition-crash` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 019 | `atm10-dimension-worldgen-overlap` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 020 | `atm10-duplicate-jar-detection` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 021 | `atm10-enchantment-loot-interaction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 022 | `atm10-entity-ai-behavior-interference` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 023 | `atm10-entity-buildup-performance-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 024 | `atm10-entity-tick-crash-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 025 | `atm10-event-handler-double-processing` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 026 | `atm10-fluid-transfer-compatibility` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 027 | `atm10-freeze-vs-crash-classification` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 028 | `atm10-gc-pause-correlator` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 029 | `atm10-graphics-driver-vs-mod-diagnosis` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 030 | `atm10-inventory-slot-compatibility` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 031 | `atm10-issue-report-evidence-package` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 032 | `atm10-item-handler-capability-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 033 | `atm10-java-architecture-runtime-check` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 034 | `atm10-java-memory-gc-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 035 | `atm10-jvm-argument-baseline-review` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 036 | `atm10-launcher-exit-code-context-analysis` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 037 | `atm10-launcher-instance-integrity` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 038 | `atm10-log-timeline-correlation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 039 | `atm10-loot-table-override-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 040 | `atm10-machine-energy-network-interoperability` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 041 | `atm10-minimal-modset-binary-search` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 042 | `atm10-missing-dependency-detection` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 043 | `atm10-mixin-conflict-isolation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 044 | `atm10-mod-advancement-trigger-failure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 045 | `atm10-mod-api-contract-regression` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 046 | `atm10-mod-background-thread-exception` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 047 | `atm10-mod-block-entity-persistence-bug` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 048 | `atm10-mod-client-server-state-divergence` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 049 | `atm10-mod-configuration-value-ignored` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 050 | `atm10-mod-crafting-duplication-reproduction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 051 | `atm10-mod-crash-on-specific-item-use` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 052 | `atm10-mod-duplicate-item-generation-bug` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 053 | `atm10-mod-entity-ai-freeze` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 054 | `atm10-mod-illegal-state-transition-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 055 | `atm10-mod-item-loss-during-transfer` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 056 | `atm10-mod-keybind-handler-bug` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 057 | `atm10-mod-known-issue-and-fix-verification` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 058 | `atm10-mod-list-fingerprint-capture` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 059 | `atm10-mod-loader-version-compatibility-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 060 | `atm10-mod-machine-stalled-processing` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 061 | `atm10-mod-memory-leak-growth-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 062 | `atm10-mod-nbt-component-roundtrip-validation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 063 | `atm10-mod-null-pointer-exception-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 064 | `atm10-mod-player-data-reset-regression` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 065 | `atm10-mod-random-drop-regression-validation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 066 | `atm10-mod-recipe-reload-stale-state` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 067 | `atm10-mod-recipe-result-mismatch` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 068 | `atm10-mod-release-regression-analysis` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 069 | `atm10-mod-rendering-artifact-reproduction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 070 | `atm10-mod-update-regression-bisect` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 071 | `atm10-mod-world-migration-failure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 072 | `atm10-modpack-reproducible-test-instance` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 073 | `atm10-modpack-update-diff-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 074 | `atm10-network-packet-channel-collision` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 075 | `atm10-oom-heap-dump-assessment` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 076 | `atm10-performance-mod-interaction-audit` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 077 | `atm10-player-capability-serialization-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 078 | `atm10-portal-dimension-travel-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 079 | `atm10-post-fix-regression-suite` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 080 | `atm10-recipe-namespace-overlap` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 081 | `atm10-recipe-registration-failure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 082 | `atm10-registry-id-collision-investigation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 083 | `atm10-registry-missing-content-recovery` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 084 | `atm10-renderer-shader-mod-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 085 | `atm10-rendering-fps-regression` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 086 | `atm10-resource-pack-shader-crash-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 087 | `atm10-safe-mod-addition-protocol` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 088 | `atm10-safe-mod-removal-protocol` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 089 | `atm10-save-write-lag-diagnosis` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 090 | `atm10-server-network-latency-triage` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 091 | `atm10-server-tps-mspt-profiling` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 092 | `atm10-startup-phase-checkpoint` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 093 | `atm10-storage-autocrafting-interaction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 094 | `atm10-storage-io-stutter-investigation` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 095 | `atm10-structure-generation-duplication` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 096 | `atm10-tag-membership-conflict` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 097 | `atm10-world-save-recovery-preflight` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 098 | `atm10-worldgen-crash-reproduction` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 099 | `atm10-worldgen-memory-pressure` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |
| 100 | `atm10-wrong-loader-artifact-detection` | A classificação 50/25/25 ainda não foi reconciliada | presente | presente | SHA igual | registrada |

## Validações pendentes

- [ ] Mapear, com revisão editorial, cada uma das 100 skills para o grupo correto 50/25/25.
- [ ] Revisar os 100 textos quanto a entradas, passos reproduzíveis, critérios de parada, rollback e exemplos positivos/negativos.
- [ ] Rodar `node tools/sync-skill-bundles.mjs --check` em checkout limpo e registrar a saída real.
- [ ] Executar o validador do manifesto de lote correspondente e registrar a saída real.
- [ ] Revisar sobreposição semântica, não só unicidade de slug.
- [ ] Conferir proveniência/licenças aplicáveis e limitações conhecidas.
- [ ] Verificar instalação/descoberta no Claude Code em ambiente isolado.
- [ ] Reconciliar a PR #42 com a árvore de `main` e as branches de que depende.
- [ ] Atualizar a Issue #25 com evidências e fechar somente depois de cumprir os critérios restantes.

## Limite importante

O repositório de ATM10 pode representar um modpack modificado. Nenhum nome nesta lista prova que uma versão, mod ou configuração específica esteja presente na instalação local. O diagnóstico real deve começar por dados coletados do ambiente alvo, backups e mudanças reversíveis.
