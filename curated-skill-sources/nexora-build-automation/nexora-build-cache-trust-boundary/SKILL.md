---
name: nexora-build-cache-trust-boundary
description: "Prevents poisoned or incompatible build cache entries from influencing engine artifacts."
---

# nexora build cache trust boundary

## Purpose

Use this workflow for NEXORA-scale engine work when build cache integrity and remote cache use. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define cache key inputs and trust level.
2. include toolchain, target, feature, and dependency identities.
3. verify cached artifact metadata and hashes.
4. separate trusted and untrusted cache namespaces.
5. avoid executing cache-provided scripts.
6. treat validation failures as cache misses.
7. test corrupted and stale entries.
8. bound cache storage.
9. record cache provenance.
10. compare suspicious outputs with a clean rebuild.

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

Cache reuse is reproducible and invalid or untrusted entries cannot silently alter artifacts.

A hash from an untrusted cache does not prove artifact authenticity. Never run arbitrary cache payloads as build scripts.

## Trigger examples

- **Positive:** A code change or incident directly involves build cache integrity and remote cache use and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
