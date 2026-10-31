---
name: nexora-asset-streaming-corruption-recovery
description: "Recovers from missing or corrupt streamed asset artifacts without crashing active gameplay."
---

# nexora asset streaming corruption recovery

## Purpose

Use this workflow for NEXORA-scale engine work when streamed asset cache corruption and missing files. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Validate cache metadata and content hashes before decoding.
2. distinguish missing, corrupt, and incompatible artifacts.
3. invalidate only the affected cache entry.
4. rebuild from trusted source when available.
5. provide a bounded placeholder fallback for optional assets.
6. preserve critical gameplay data.
7. deduplicate rebuild requests.
8. test corruption during active streaming.
9. expose recovery status and retry limits.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Corrupt cache entries are isolated and rebuilt or replaced with an explicit fallback.

Do not treat corrupted authoritative world data as an optional visual cache. Avoid endless rebuild retries for permanently invalid sources.

## Trigger examples

- **Positive:** A code change or incident directly involves streamed asset cache corruption and missing files and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
