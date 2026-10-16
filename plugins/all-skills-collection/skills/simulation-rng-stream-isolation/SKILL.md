---
name: simulation-rng-stream-isolation
description: "Use when one random decision changes unrelated procedural/simulation outcomes because systems share RNG state; not for general fixed-seed distribution testing."
---

# Simulation Rng Stream Isolation

## Purpose

Make simulation randomness reproducible and isolate unrelated subsystem outcomes.

## Required inputs

Seed policy, RNG call sites, subsystem boundaries, replay tests, serialized state, reproducible scenario.

## Workflow

1. Inventory random consumers and find shared generators, iteration-order dependencies, and scheduler-dependent calls.
2. Assign deterministic independent streams or derived seeds by subsystem/entity/event identity.
3. Perturb one subsystem's RNG consumption and verify unrelated outcomes remain stable where required.
4. Check save/load, parallel scheduling, and version changes for RNG state/derived-seed compatibility.

## Verification checklist

- [ ] Seed derivation and stream ownership are documented.
- [ ] One subsystem's extra random call does not unexpectedly shift another's results.
- [ ] Parallel execution/iteration order do not change results without an explicit contract.
- [ ] Compatibility behavior is documented for RNG algorithm changes.

## Required output

An RNG dependency map, perturbation tests, stream policy, and replay compatibility notes.

## Boundaries and failure handling

Do not promise cross-version bit identity unless the RNG and simulation contract provides it.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Adding cosmetic particles changes later loot because both use one RNG stream.
- **Negative:** Testing biome-frequency distributions for a fixed world seed.
