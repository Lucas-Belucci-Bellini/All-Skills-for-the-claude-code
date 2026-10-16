---
name: asset-pipeline-incremental-build-validation
description: Validate dependency tracking and invalidation in incremental asset builds so changed inputs rebuild exactly the affected outputs.
---

# Asset Pipeline Incremental Build Validation

## Goal

Keep content builds fast without shipping stale derived assets when sources, import settings, tools or transitive dependencies change.

## Inputs to inspect

Asset dependency graph, importer/build cache, source fingerprints, tool versions, output manifests and clean-build references.

## Workflow

1. Document which source bytes, importer settings, tool versions, platform targets and transitive dependencies contribute to each output fingerprint.
2. Change one input at a time—including an indirect dependency and a setting—and verify that all and only the expected outputs are rebuilt.
3. Compare incremental output hashes with a clean build from the same inputs to detect stale or nondeterministic artifacts.
4. Test deletion/rename, case-only path changes, missing dependency recovery, interrupted builds and concurrent requests for the same asset.
5. Add a minimal incremental-vs-clean regression harness and emit diagnostics explaining why a particular asset was rebuilt or reused.

## Validation checklist

- [ ] Every semantics-affecting input participates in invalidation or has a documented reason not to.
- [ ] Incremental and clean builds produce equivalent canonical outputs for the same declared inputs.
- [ ] Dependency deletion or failure cannot leave a stale output presented as current.
- [ ] Cache-key/version changes invalidate incompatible outputs without deleting source assets.

## Required output

An input-to-output dependency map, invalidation test matrix, clean-vs-incremental comparison and cache diagnostic contract.

## Boundaries and failure handling

Do not infer correctness solely from a successful incremental build; equivalence against a clean build is required for tested cases.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
