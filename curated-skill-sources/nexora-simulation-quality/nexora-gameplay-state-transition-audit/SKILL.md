---
name: nexora-gameplay-state-transition-audit
description: "Finds invalid transitions between gameplay phases such as alive, incapacitated, dead, respawning, and unloaded."
---

# nexora gameplay state transition audit

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay state machines and lifecycle transitions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Enumerate authoritative states and events.
2. define legal transition table and side effects.
3. assign transition ownership.
4. make repeated events idempotent.
5. specify ordering with inventory, network, and save systems.
6. test simultaneous damage, disconnect, and despawn events.
7. assert forbidden transitions in development builds.
8. replay captured event sequences.
9. document migration for persisted states.

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

All state transitions are explicit and side effects occur exactly once under defined ordering.

Do not scatter state mutation across unrelated callbacks. Avoid allowing presentation code to trigger authoritative transitions directly.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay state machines and lifecycle transitions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
