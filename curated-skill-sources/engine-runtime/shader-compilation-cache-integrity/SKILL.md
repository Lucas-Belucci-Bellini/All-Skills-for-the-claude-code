---
name: shader-compilation-cache-integrity
description: Audit shader and pipeline cache keys, invalidation rules, artifact compatibility and recovery from corrupt cache entries.
---

# Shader Compilation Cache Integrity

## Goal

Prevent stale or incompatible shader binaries from producing incorrect rendering, startup errors or repeated recompilation.

## Inputs to inspect

Shader source/include hashes, compiler and driver versions, pipeline descriptors, cache serialization and cache miss telemetry.

## Workflow

1. List every input that can affect shader or pipeline output, including transitive includes, defines, target capabilities, compiler flags and relevant driver/API identifiers.
2. Compare cache key construction with those inputs; flag missing semantic inputs and irrelevant unstable fields that prevent reuse.
3. Corrupt, truncate or remove cached entries and test whether loading validates metadata/integrity before use and safely falls back to recompilation.
4. Exercise compiler upgrades, source/include changes, device/driver changes and feature toggles to verify targeted invalidation.
5. Add telemetry for hit/miss/reject/rebuild reasons and a repeatable warm-cache/cold-cache startup test.

## Validation checklist

- [ ] Cache keys change when any semantics-affecting input changes.
- [ ] Cache reads are bounds-checked and reject malformed or incompatible payloads safely.
- [ ] Corrupt cache content can be discarded without damaging source assets or blocking startup indefinitely.
- [ ] Warm and cold paths both receive coverage and report the relevant compiler/device context.

## Required output

A cache key inventory, invalidation matrix, corruption test report and startup/cache metrics.

## Boundaries and failure handling

Do not treat a cache hit as proof that the artifact matches current inputs; validate compatibility before using it.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
