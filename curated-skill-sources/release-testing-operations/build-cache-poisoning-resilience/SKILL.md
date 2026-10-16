---
name: build-cache-poisoning-resilience
description: Assess whether build and artifact caches can be tampered with, cross-contaminated between trust boundaries, or reused with incomplete cache keys.
---

# Build Cache Poisoning Resilience

## Goal

Reduce supply-chain risk from untrusted cache writes and ensure cached outputs are tied to their declared inputs and provenance.

## Inputs to inspect

CI cache configuration, cache keys, artifact stores, fork/PR trust model, build credentials, provenance attestations and restore logic.

## Workflow

1. Map cache writers and readers across trusted branches, forks, pull requests, local builds and release jobs; identify where untrusted contributors can populate reusable entries.
2. Inspect cache keys and validation for source revision, lockfile, toolchain, target, feature flags and all other behavior-affecting inputs.
3. Test restore behavior with corrupted, stale, mismatched and deliberately malformed cache entries in an isolated disposable pipeline.
4. Verify release jobs do not consume writable cache entries from less-trusted contexts unless outputs are integrity-verified and provenance-bound.
5. Define safe fallback to clean build, cache namespace/permission boundaries and monitoring for unexpected cache hit/miss or provenance mismatch.

## Validation checklist

- [ ] Untrusted cache writers cannot silently influence privileged release outputs.
- [ ] Cache keys encode all relevant build inputs or restore verifies them independently.
- [ ] Corrupt cache falls back safely and never bypasses artifact verification.
- [ ] Release artifact identity and provenance are checked after cache restoration.

## Required output

A cache trust-boundary diagram, attack/test matrix, safe cache policy and release-build verification controls.

## Boundaries and failure handling

Do not test cache poisoning on a production release pipeline or introduce harmful payloads; validate with controlled dummy artifacts and isolated permissions.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
