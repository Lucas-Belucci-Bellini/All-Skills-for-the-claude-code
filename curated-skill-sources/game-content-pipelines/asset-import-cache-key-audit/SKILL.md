---
name: asset-import-cache-key-audit
description: Audit asset importer cache keys for missing source dependencies, settings, tool versions, platform targets and transitive inputs.
---

# Asset Import Cache-Key Audit

## Goal

Prevent stale imported assets from being reused after an input that affects the output has changed.

## Inputs to inspect

Importer implementations, cache-key construction, source fingerprints, settings, toolchain versions and clean-build comparisons.

## Workflow

1. Trace the complete input set for each importer, including source bytes, sidecar metadata, importer version, conversion tools, dependencies and platform options.
2. Compare each semantic input with the cache fingerprint; identify hidden globals, environment values and transitive files that are not represented.
3. Mutate one input at a time and assert the key changes when output semantics should change, while irrelevant timestamp or path noise does not force unnecessary rebuilds.
4. Build from a clean cache and an incremental cache for the same declared inputs; compare canonical imported outputs and dependencies.
5. Add regression tests and diagnostic output explaining the cache hit/miss reason and the exact fingerprint inputs used.

## Validation checklist

- [ ] All semantics-affecting inputs participate in the fingerprint or invalidation policy.
- [ ] Clean and incremental outputs match for tested assets and targets.
- [ ] Missing dependency changes and tool-version bumps invalidate affected outputs.
- [ ] The cache key cannot be spoofed by filename alone or stale metadata.

## Required output

An importer input matrix, cache-key gap list, clean-vs-incremental equivalence tests and fingerprint diagnostics.

## Boundaries and failure handling

Do not fix stale results by disabling the cache globally without measuring the build impact and identifying the missing inputs.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
