---
name: nexora-untrusted-asset-parser-hardening
description: "Hardens asset decoders against malformed dimensions, oversized allocations, and parser abuse."
---

# nexora untrusted asset parser hardening

## Purpose

Use this workflow for NEXORA-scale engine work when untrusted asset parser security. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify every parser entry point and supported format.
2. validate signatures and lengths before allocation.
3. cap dimensions, nesting, counts, and decoded bytes.
4. use checked arithmetic for size calculations.
5. define time and memory budgets.
6. fuzz malformed and truncated fixtures.
7. isolate risky native decoders where feasible.
8. ensure failures release temporary resources.
9. report bounded sanitized errors.

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

Malformed inputs fail within resource limits without corrupting caches or unrelated imports.

Never trust embedded counts or allocate from unchecked products. Do not execute content during parsing.

## Trigger examples

- **Positive:** A code change or incident directly involves untrusted asset parser security and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
