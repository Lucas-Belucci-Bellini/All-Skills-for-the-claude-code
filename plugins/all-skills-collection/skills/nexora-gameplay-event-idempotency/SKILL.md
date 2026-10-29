---
name: nexora-gameplay-event-idempotency
description: "Ensures repeated gameplay events cannot duplicate inventory changes, rewards, damage, or world mutations."
---

# nexora gameplay event idempotency

## Purpose

Use this workflow for NEXORA-scale engine work when duplicate gameplay events and retry safety. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify events that may be retried, replayed, or delivered more than once.
2. Assign stable event identities within a documented scope.
3. Define deduplication retention and persistence requirements.
4. Separate event receipt from successful state mutation.
5. Make state change and deduplication record atomic where durability matters.
6. Define how duplicates are acknowledged without reapplying effects.
7. Test reconnects, replay, timeout retries, and process restart.
8. Monitor duplicate rates and retention pressure.
9. Document which events intentionally permit repeated effects.

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

Duplicate delivery does not repeat non-idempotent authoritative effects within the defined scope.

Do not use timestamps alone as unique IDs. Avoid unbounded deduplication maps or dropping records before the retry horizon ends.

## Trigger examples

- **Positive:** A code change or incident directly involves duplicate gameplay events and retry safety and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
