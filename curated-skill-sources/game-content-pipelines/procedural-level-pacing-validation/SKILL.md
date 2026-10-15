---
name: procedural-level-pacing-validation
description: Measure procedural level pacing using encounter density, travel time, resource rhythm, difficulty ramps, and player recovery windows.
---

# procedural level pacing validation

## Goal

Keep generated levels varied but intentional instead of producing random sequences that are technically valid and emotionally flat.

## Inputs to inspect

Level generator stages, gameplay objective types, enemy/resource placement, difficulty parameters, telemetry, and seed corpus.

## Workflow

1. Define pacing signals that matter to the game: action/rest intervals, travel duration, encounter intensity, resource scarcity, navigation complexity, and recovery time.
2. Build a representative seed corpus covering ordinary, extreme, boundary, and previously problematic layouts; record generator version and input parameters.
3. Extract pacing metrics and event sequences from generated levels, then compare distributions against design envelopes rather than a single ideal layout.
4. Play or simulate selected outliers and inspect causal reasons for long empty stretches, back-to-back spikes, blocked routes, or reward droughts.
5. Adjust one generation constraint at a time and rerun the corpus to check both intended improvement and loss of variety.

## Validation checklist

- [ ] A level can be technically solvable yet still be flagged for poor pacing.
- [ ] Metrics capture both intensity and downtime, not only enemy count or level size.
- [ ] Boundary seeds and difficult layouts remain represented after tuning.
- [ ] Changes are compared against a stable corpus to detect regressions.
- [ ] Final judgment combines metrics with representative human playtesting when available.

## Required output

Produce a pacing metric definition, seed corpus, outlier report, root-cause analysis, tuned constraints, and before/after comparisons.

## Boundaries and failure handling

Do not hardcode every generated level to one rhythm; do not claim pacing is validated solely because generation and pathfinding succeed.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
