---
name: simulation-replay-state-diff
description: Build compact, deterministic state diffs for simulation replays to identify the earliest entity, field, or event divergence.
---

# Simulation Replay State Diff

## Goal

Turn nondeterministic simulation bugs into localized evidence rather than comparing whole-world outcomes after they have cascaded.

## Inputs to inspect

Replay inputs, periodic snapshots, stable entity identifiers, event logs, canonical serialization and determinism requirements.

## Workflow

1. Define a canonical comparison projection for authoritative state, excluding explicitly nondeterministic or derived fields and normalizing ordering.
2. Capture snapshots at stable tick boundaries and compare them to a baseline replay, descending from coarse checkpoints to the earliest differing tick.
3. Report the first differing entity/component/field, relevant event IDs and recent mutations; distinguish missing entities from mismatched values.
4. Replay with controlled worker counts and event ordering to isolate shared-RNG use, iteration-order dependence, race conditions or version drift.
5. Create a minimal regression seed/input log and assert the intended state hashes or semantically meaningful invariants at selected ticks.

## Validation checklist

- [ ] Canonicalization is stable and does not sort away meaningful order semantics.
- [ ] Diff output points to the earliest divergence, not just the largest final difference.
- [ ] Fields excluded from comparison are explicitly listed with reasons.
- [ ] Replay fixtures pin generator/content/schema versions needed for reproducibility.

## Required output

A replay comparison report, first-divergence trace, canonical-state schema and minimal regression fixture.

## Boundaries and failure handling

Do not treat equal final hashes as proof every intermediate invariant held; select checkpoints and domain invariants appropriate to the bug.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
