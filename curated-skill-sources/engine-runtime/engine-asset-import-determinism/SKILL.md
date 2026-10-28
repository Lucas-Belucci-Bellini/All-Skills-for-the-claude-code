---
name: engine-asset-import-determinism
description: Make asset import pipelines reproducible through explicit importer versions, stable cache keys, dependency tracking, and artifact verification.
---

# Engine Asset Import Determinism

## Purpose

Ensure the same declared inputs and toolchain produce traceable, cache-correct imported assets, with differences explainable when reproducibility is not achievable.

## Required inputs

Source assets, importer/compiler versions, import settings, dependency graph, generated metadata, cache-key implementation, platform-specific transforms, and artifact hashes.

## Workflow

1. Inventory each importer's inputs, settings, environment dependencies, outputs, and declared tool version.
2. Define cache keys from all output-affecting inputs, including importer version, settings schema, referenced assets, color-space choices, compression settings, and platform target.
3. Exclude incidental data such as filesystem traversal order or wall-clock timestamps unless it is intentionally part of the artifact contract.
4. Make dependency discovery explicit and invalidate downstream artifacts when a referenced source or relevant setting changes.
5. Run clean and warm imports on copied fixtures; compare output hashes and metadata, then explain any expected nondeterministic fields.
6. Test case sensitivity, Unicode paths, renamed files, missing dependencies, corrupt cache entries, and interrupted writes.
7. Store generated outputs atomically and ensure a failed import cannot replace the last known-good artifact with a partial file.
8. Document reproducibility scope: same machine, same toolchain, or cross-platform. Avoid claiming cross-platform byte identity without evidence.

## Validation checklist

- [ ] Cache keys include every known output-affecting input and tool version.
- [ ] Dependency changes invalidate all affected derived assets.
- [ ] Failed imports preserve prior valid artifacts.
- [ ] Reproducibility claims identify tested toolchain and platform scope.

## Required output

An importer input/output inventory, cache-key contract, invalidation graph, fixture matrix, and artifact-diff report.

## Boundaries and failure handling

Do not assume two files with the same name are the same dependency. Keep source assets immutable during tests and mark untested importer paths as unknown.

## Trigger examples

- **Positive:** The task concerns asset importers, derived asset caches, reproducible builds, or dependency invalidation.
- **Negative:** The task concerns only in-game asset placement or artistic feedback with no import pipeline.
