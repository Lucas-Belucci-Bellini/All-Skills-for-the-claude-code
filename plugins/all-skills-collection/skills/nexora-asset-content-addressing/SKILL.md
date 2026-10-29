---
name: nexora-asset-content-addressing
description: "Builds reliable content-addressed asset identity and cache invalidation for textures, meshes, shaders, and mod assets."
---

# Nexora Asset Content Addressing

## Purpose

Use this workflow for NEXORA-scale engine work when asset cache identity and reproducible builds. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Define canonical inputs including source bytes, importer version, relevant options, dependencies, and target format.
2. hash canonical content rather than filenames alone.
3. make serialization stable.
4. store provenance and cache schema versions.
5. verify cache hits against metadata.
6. atomically publish completed artifacts.
7. handle collisions and corrupt entries as cache misses or explicit integrity errors.
8. test identical builds and option/dependency changes..
9. undefined.

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

Equivalent inputs reuse artifacts; any relevant input change invalidates the cache; artifacts can be traced to inputs and tool versions.

Do not use timestamps or mutable paths as the sole identity. Treat cache contents as untrusted and never load executable code merely because a hash exists.

## Trigger examples

- "Audit asset cache identity and reproducible builds in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
