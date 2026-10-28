---
name: engine-physics-broadphase-validation
description: Validate physics broadphase implementations for candidate completeness, boundary correctness, determinism scope, and measurable performance.
---

# Engine Physics Broadphase Validation

## Purpose

Verify that broadphase collision candidate generation does not miss valid pairs and that optimization preserves the narrowphase contract.

## Required inputs

Broadphase algorithm, collider bounds, transform update flow, filtering layers, motion model, narrowphase interface, fixed-step configuration, and test-scene definitions.

## Workflow

1. Record the algorithm and invariants: grid, sweep-and-prune, BVH, dynamic tree, or custom implementation; identify when bounds are updated.
2. Define a simple reference candidate generator for small test scenes and compare optimized candidates against its conservative expected set.
3. Generate cases for touching boundaries, degenerate shapes where supported, very large coordinates, fast motion, rotation, scale changes, and objects crossing cell/tree boundaries.
4. Verify filtering and pair canonicalization so self-pairs and duplicate pairs are handled consistently without dropping valid pairs.
5. Check temporal update rules: moving, sleeping, teleported, created, destroyed, and resized colliders must enter or leave candidate sets correctly.
6. If determinism matters, compare candidate sets across repeated runs and document ordering guarantees separately from set completeness.
7. Benchmark varied density and motion patterns; track candidate count, false-positive ratio, update cost, and worst-case behavior rather than average frame time alone.
8. Turn every discovered missed-pair case into a minimal deterministic regression fixture.

## Validation checklist

- [ ] Optimized candidate sets contain every pair required by the reference contract.
- [ ] Boundary-touching and transform-change cases are covered.
- [ ] Collider lifecycle and filter updates do not leave stale pairs.
- [ ] Benchmarks report scene size, density, motion pattern, and build configuration.

## Required output

A correctness comparison report, minimal regression scenes, boundary/lifecycle test matrix, and workload-specific performance measurements.

## Boundaries and failure handling

Do not confuse acceptable conservative false positives with missed collision pairs. State the reference contract and supported shape/coordinate assumptions before interpreting results.

## Trigger examples

- **Positive:** The task concerns collision broadphase, spatial partitioning, candidate-pair correctness, or physics query performance.
- **Negative:** The task is only about tuning gameplay damage values or writing animation logic without collision detection.
