---
name: simulation-world-invariant-checkpointing
description: Add lightweight checkpoints for world-level invariants so long-running simulation failures can be localized to an interval or subsystem.
---

# Simulation World Invariant Checkpointing

## Goal

Detect and narrow world corruption early without requiring a full expensive world scan every tick.

## Inputs to inspect

Authoritative state ownership, invariants, event/tick boundaries, checkpoint schedule and large-world cost budgets.

## Workflow

1. Select invariants with clear cost/benefit, such as inventory conservation, entity ownership uniqueness, reservation balance, chunk registration consistency and valid reference graphs.
2. Choose checkpoint boundaries and sampling levels: cheap per-tick assertions, periodic regional scans, and full offline audits.
3. Record the minimum contextual evidence required to identify the affected tick, region, entity or event without serializing unnecessary world state.
4. Inject representative failures or corrupted fixtures and measure detection latency, checkpoint overhead and false-positive behavior.
5. Provide a path to reproduce the interval between the last passing checkpoint and first failing checkpoint, using event logs or targeted invariant checks.

## Validation checklist

- [ ] Each invariant defines its scope, tolerated exceptions and authoritative source of truth.
- [ ] Checkpoints are stable across save/load when the invariant is expected to persist.
- [ ] Sampling does not hide high-risk violations indefinitely; full audits remain available for release/debug validation.
- [ ] Diagnostic payloads are bounded and avoid sensitive or excessive world dumps.

## Required output

An invariant catalog, checkpoint schedule, overhead measurement and failure-localization procedure.

## Boundaries and failure handling

Do not treat sampled invariant checks as proof that every state transition is valid; scope and detection latency must be explicit.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
