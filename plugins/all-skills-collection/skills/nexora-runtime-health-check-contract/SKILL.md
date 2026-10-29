---
name: nexora-runtime-health-check-contract
description: "Defines health checks for engine subsystems without reporting a false healthy state during partial failure."
---

# nexora runtime health check contract

## Purpose

Use this workflow for NEXORA-scale engine work when runtime health and subsystem readiness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List critical and optional subsystems.
2. define readiness and degraded states separately.
3. implement checks from authoritative subsystem signals.
4. set timeouts and sampling intervals.
5. avoid checks that mutate state.
6. detect stale heartbeat data.
7. test partial initialization and stalled workers.
8. include recovery state and last error.
9. document which failures should stop gameplay or only degrade features.

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

Health status reflects actual readiness and degraded behavior is explicit.

Do not report healthy based only on process liveness. Avoid health checks that deadlock on the subsystem they inspect.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime health and subsystem readiness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
