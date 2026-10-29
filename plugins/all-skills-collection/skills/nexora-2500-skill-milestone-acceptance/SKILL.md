---
name: nexora-2500-skill-milestone-acceptance
description: "Validates the 2,500-skill catalog milestone for uniqueness, source/bundle parity, manifest consistency, and practical coverage."
---

# nexora 2500 skill milestone acceptance

## Purpose

Use this workflow for NEXORA-scale engine work when NEXORA 2,500-skill milestone and catalog acceptance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Verify the declared catalog count and unique names.
2. compare canonical source and plugin copies byte-for-byte.
3. check category and source-path consistency.
4. validate manifest size and milestone total.
5. confirm roadmap checkpoint and workflow references.
6. inspect coverage for duplicate or near-duplicate topics.
7. run the batch validator and generated-sync idempotence check.
8. review Actions results for the exact branch head.
9. document unresolved licensing and installation smoke-test blockers.
10. keep the PR unmerged pending explicit approval.

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

The catalog milestone is structurally reconciled and the exact head has successful validation evidence; remaining non-count blockers are documented.

Do not equate 2,500 catalog entries with 2,500 independently validated runtime capabilities. Never merge without explicit approval.

## Trigger examples

- **Positive:** A code change or incident directly involves NEXORA 2,500-skill milestone and catalog acceptance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
