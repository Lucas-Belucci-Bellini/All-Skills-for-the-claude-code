---
name: nexora-telemetry-cardinality-budget
description: "Prevents engine diagnostics from creating unbounded metric cardinality or leaking high-entropy identifiers."
---

# nexora telemetry cardinality budget

## Purpose

Use this workflow for NEXORA-scale engine work when runtime telemetry and metric cardinality. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory metric labels and dimensions.
2. identify user-controlled strings and per-entity IDs.
3. replace unbounded labels with bounded categories or sampled traces.
4. define per-process cardinality limits.
5. avoid sensitive values in labels.
6. test adversarial unique inputs.
7. measure series growth under stress.
8. document when detailed diagnostics are sampled.
9. alert on cardinality spikes.

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

Metrics remain bounded and useful without encoding secrets or arbitrary identifiers in labels.

Do not use player IDs, paths, or arbitrary mod strings as metric labels. Keep high-detail tracing sampled and access-controlled.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime telemetry and metric cardinality and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
