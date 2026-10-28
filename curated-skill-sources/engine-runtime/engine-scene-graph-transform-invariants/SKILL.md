---
name: engine-scene-graph-transform-invariants
description: Validate scene-graph transform composition, parent-child invariants, reparenting semantics, and world/local transform consistency.
---

# Engine Scene Graph Transform Invariants

## Purpose

Prevent transform drift and hierarchy bugs by defining and testing the relationship between local transforms, world transforms, and parent changes.

## Required inputs

Scene graph representation, transform convention, matrix/quaternion math, parent-child storage, reparenting API, serialization format, and transform propagation system.

## Workflow

1. Document coordinate handedness, vector convention, multiplication order, scale representation, and whether transforms support non-uniform scale or shear.
2. Define invariants for roots, parent references, acyclic hierarchy, local transforms, cached world transforms, and dirty propagation.
3. Verify transform propagation updates descendants exactly when required and does not expose stale cached world matrices.
4. Specify reparenting behavior: preserve local transform or preserve world transform; handle singular parent transforms and cycles explicitly.
5. Test nested rotations and scales, deep hierarchies, detach/attach, parent deletion, serialization round trips, and large coordinate values.
6. Compare optimized incremental propagation with a simple reference recomputation on generated small graphs.
7. Add regression fixtures for precision drift and ensure editor gizmos, physics proxies, and rendering consume the same transform convention.

## Validation checklist

- [ ] Hierarchy is acyclic and all parent references resolve or fail explicitly.
- [ ] Local/world conversion and reparenting semantics are documented and tested.
- [ ] Dirty propagation never leaves descendants with stale world transforms.
- [ ] Reference recomputation and optimized propagation agree within declared numeric tolerances.

## Required output

A transform convention document, hierarchy invariant checklist, reference test harness, and minimal regression fixtures.

## Boundaries and failure handling

Do not prescribe matrix multiplication order without inspecting the engine's convention. State tolerances and supported scale cases instead of assuming exact floating-point equality.

## Trigger examples

- **Positive:** The task involves scene hierarchies, local/world transforms, reparenting, transform propagation, or transform drift.
- **Negative:** The task only involves changing object art or materials without changing spatial relationships.
