---
name: engine-collision-layer-contracts
description: Audit collision layers, masks, query filters, and gameplay collision rules for consistent interaction semantics.
---

# engine collision layer contracts

## Goal

Make physical contacts, traces, triggers, and gameplay queries agree on which objects may interact.

## Inputs to inspect

Physics backend configuration, layer names, collision masks, query call sites, trigger volumes, and gameplay interaction rules.

## Workflow

1. Inventory layer/mask constants and every collision query. Translate numeric bitmasks into a human-readable object interaction matrix.
2. Define which pairs should collide, overlap as triggers, block traces, or be ignored. Keep physical response distinct from gameplay detection where required.
3. Trace critical flows such as player movement, interaction ray casts, projectile hits, pickup detection, AI perception, and editor selection.
4. Centralize layer definitions and expose named query presets; add assertions or typed wrappers where accidental raw masks are common.
5. Create test fixtures for every critical pair plus negative cases, including disabled objects, moving triggers, and layer changes at runtime.

## Validation checklist

- [ ] Layer and mask combinations match a reviewed interaction matrix.
- [ ] Gameplay queries use intentional filters and do not rely on an unrelated physical collision setting.
- [ ] Adding a new object type requires reviewing its expected interactions.
- [ ] Tests cover both expected contacts and pairs that must remain excluded.
- [ ] Debug visualization can show the effective layer and filter for an object/query.

## Required output

Provide an interaction matrix, list of contradictory masks/queries, safe centralization plan, and automated pairwise tests.

## Boundaries and failure handling

Do not blindly change shared bitmasks to fix a single collision; document the effect on every subsystem using the same layers.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
