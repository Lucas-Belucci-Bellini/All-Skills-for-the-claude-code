---
name: nexora-async-queue-fairness
description: "Prevents long-running jobs or a single subsystem from starving other engine workloads."
---

# nexora async queue fairness

## Purpose

Use this workflow for NEXORA-scale engine work when async job queues and fairness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify jobs by criticality and resource needs.
2. define per-class quotas and aging.
3. bound queue lengths.
4. avoid holding scarce workers during external waits.
5. apply backpressure to producers.
6. test sustained mixed workloads and cancellation.
7. measure queue age by class.
8. verify fairness under priority changes.
9. expose starvation warnings.
10. document intentionally unbounded critical paths if any.

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

Every non-cancelled eligible job class has a bounded or measured wait policy under declared workload assumptions.

Do not let strict priority starve background persistence or maintenance indefinitely. Keep queue memory bounded.

## Trigger examples

- **Positive:** A code change or incident directly involves async job queues and fairness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
