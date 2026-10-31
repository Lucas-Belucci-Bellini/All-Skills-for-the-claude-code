---
name: nexora-fuzz-parser-entrypoints
description: "Fuzzes save, mod-manifest, asset, and network parsers with bounded resources and useful crash triage."
---

# nexora fuzz parser entrypoints

## Purpose

Use this workflow for NEXORA-scale engine work when fuzz testing untrusted engine parsers. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory parser entry points and trust boundaries.
2. define a minimal valid seed corpus.
3. set execution and memory budgets.
4. add structure-aware mutations for length fields and nested data.
5. classify crashes, hangs, panics, and excessive allocations.
6. minimize reproductions.
7. verify failures in a clean environment.
8. promote confirmed bugs into regression fixtures.
9. track corpus coverage and deduplicate findings.

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

Fuzz runs have bounded cost and findings produce minimized reproducible test cases.

Do not fuzz production data with destructive side effects. Treat timeouts and allocation spikes as findings, not just crashes.

## Trigger examples

- **Positive:** A code change or incident directly involves fuzz testing untrusted engine parsers and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
