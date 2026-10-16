---
name: voxel-neighbor-dependency-invalidation
description: Audit invalidation propagation when voxel changes affect neighboring chunk meshes, lighting, collision, navigation, or procedural features.
---

# Voxel Neighbor Dependency Invalidation

## Goal

Recompute exactly the derived artifacts whose sampling dependencies intersect a changed voxel or chunk boundary.

## Inputs to inspect

Voxel mutation paths, mesher neighbor sampling, lighting propagation, collision generation, nav data and dependency caches.

## Workflow

1. List derived systems and record their dependency radius, boundary sampling policy, cache key and invalidation entrypoint.
2. For each kind of voxel edit, derive which local and neighboring chunks may depend on the changed cells, including edge/corner neighbors where applicable.
3. Create fixtures for edits at chunk faces, edges and corners and observe mesh, lighting, collision and navigation refresh behavior.
4. Test chunk arrival/removal and edits while asynchronous rebuilds are running; ensure stale results are rejected by revision or generation tokens.
5. Replace overly broad invalidation only when dependency evidence permits it, and add regression assertions for both missed and unnecessary rebuilds.

## Validation checklist

- [ ] Every derived consumer that samples changed data is invalidated within its declared dependency radius.
- [ ] Chunk borders, corners and unloaded-neighbor cases follow one explicit policy.
- [ ] A delayed rebuild cannot overwrite output based on an older voxel revision.
- [ ] Performance metrics reveal whether invalidation creates excessive rebuild storms.

## Required output

A dependency-radius matrix, boundary fixture suite, stale-result safeguards and an invalidation cost report.

## Boundaries and failure handling

Do not optimize away neighboring invalidation based only on a local edit; inspect each downstream sampling dependency.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
