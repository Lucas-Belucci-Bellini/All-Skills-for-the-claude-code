---
name: nexora-asset-import-failure-isolation
description: "Contains malformed or resource-exhausting asset imports so one file cannot crash or stall the whole asset pipeline."
---

# nexora asset import failure isolation

## Purpose

Use this workflow for NEXORA-scale engine work when asset importers and hostile content. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Treat input files as untrusted.
2. validate signatures, sizes, nesting, and declared counts before allocation.
3. enforce time and memory budgets.
4. isolate risky decoders where feasible.
5. report failures per asset while allowing unrelated imports to proceed.
6. write outputs transactionally.
7. preserve source provenance and importer versions.
8. fuzz parsers and test truncated or oversized fixtures.
9. Document rollback or safe fallback behavior..

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Source and bundle copies are byte-identical.
- [ ] Focused tests and static checks pass, or skipped checks are reported honestly.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Report the decision, invariants, code paths reviewed or changed, tests and results, performance/compatibility implications, and unresolved risks.

## Boundaries and failure handling

A single malformed asset fails with a bounded diagnostic and does not corrupt other assets or the cache.

Never trust dimensions or element counts before checking overflow and limits. Do not execute scripts embedded in imported assets during parsing.

## Trigger examples

- **Positive:** A code change or incident directly involves asset importers and hostile content and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
