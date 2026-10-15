---
name: engine-world-origin-rebasing
description: Evaluate large-world coordinate precision and implement safe origin rebasing without breaking physics, rendering, or saved world coordinates.
---

# engine world origin rebasing

## Goal

Support large navigable worlds while keeping local floating-point coordinates numerically stable.

## Inputs to inspect

World coordinate representation, camera and physics code, chunk keys, save formats, network coordinates if any, and target world scale.

## Workflow

1. Separate persistent world coordinates from local simulation/render coordinates and identify all systems that currently assume one shared coordinate space.
2. Measure precision loss at representative world distances for transforms, physics, ray casts, animation, and GPU vertex positions; define a precision threshold before symptoms become visible.
3. Choose an origin-rebase trigger, quantized shift size, and authoritative source for the new origin. Specify which systems must update atomically at a safe simulation boundary.
4. Keep chunk IDs, save data, and network state in stable world-space coordinates while translating only the relevant local coordinate layers.
5. Test repeated rebases while moving, colliding, streaming chunks, spawning effects, and saving/loading; compare positions before and after translation.

## Validation checklist

- [ ] Persistent identity and save coordinates do not depend on the current local origin.
- [ ] Every local-space subsystem participates in rebasing or explicitly uses a stable coordinate frame.
- [ ] Rebasing introduces no observable position jump or stale spatial index.
- [ ] Threshold tests cover negative coordinates and repeated large translations.
- [ ] Physics tolerances and GPU precision assumptions are measured rather than guessed.

## Required output

Produce a coordinate-space map, numerical precision budget, rebase protocol, affected subsystem list, and boundary/round-trip test matrix.

## Boundaries and failure handling

Do not rebase only the camera; do not mix local and global coordinates in APIs without naming or type-level distinction.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
