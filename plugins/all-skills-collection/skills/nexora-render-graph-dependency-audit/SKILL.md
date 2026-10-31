---
name: nexora-render-graph-dependency-audit
description: "Validates render-graph read/write dependencies and resource transitions to prevent hidden ordering bugs."
---

# nexora render graph dependency audit

## Purpose

Use this workflow for NEXORA-scale engine work when render graph and resource dependencies. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Inventory passes and declared resource accesses.
2. model read/write modes and subresource ranges.
3. detect read-before-write and conflicting unordered writes.
4. derive required barriers/transitions from the actual backend contract.
5. validate transient-resource aliasing lifetimes.
6. add graph dumps for failing scenes.
7. test pass reordering and optional passes.
8. compare validation output across supported backends.
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

The graph rejects invalid dependency patterns and produces inspectable ordering/barrier evidence.

Do not insert broad global barriers as a substitute for understanding dependencies. Preserve backend-specific correctness requirements.

## Trigger examples

- **Positive:** A code change or incident directly involves render graph and resource dependencies and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
