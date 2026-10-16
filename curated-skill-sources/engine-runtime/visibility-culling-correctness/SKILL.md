---
name: visibility-culling-correctness
description: Validate frustum, occlusion, portal, and distance culling against object bounds and camera edge cases.
---

# Visibility Culling Correctness

## Goal

Reduce invisible work without incorrectly dropping visible geometry or introducing camera-motion flicker.

## Inputs to inspect

Culling stages, bounding volumes, camera projection, spatial index, occlusion history, LOD policy, and reference render captures.

## Workflow

1. Map the culling sequence and each stage's input bounds, coordinate space, camera parameters and temporal state.
2. Check bounding-volume transforms for nonuniform scale, rotation, large coordinates, animation deformation and recently changed mesh bounds.
3. Probe frustum edges, near/far planes, camera teleportation, rapid rotation, stereo views if supported, and objects partially crossing occluders.
4. Compare optimized visibility against a reference mode that disables culling; capture false negatives, false positives and the stage that first removes an object.
5. Add deterministic tests around the failing bound/plane/occlusion case and expose counters for rejected objects by culling reason.

## Validation checklist

- [ ] No object inside the valid view is incorrectly rejected because its bound is stale or in the wrong coordinate space.
- [ ] Occlusion history is invalidated after camera cuts, major scene changes and incompatible projection changes.
- [ ] Culling uses conservative bounds when deformation or precision makes exact bounds unavailable.
- [ ] Reference and optimized modes use the same scene state and output resolution for comparisons.

## Required output

A culling-stage diagram, edge-case fixtures, false-negative/false-positive report, and per-stage diagnostic counters.

## Boundaries and failure handling

Do not trade visible correctness for a small performance gain; unexplained missing geometry must be reproduced with culling disabled.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
