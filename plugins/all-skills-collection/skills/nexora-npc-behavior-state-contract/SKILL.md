---
name: nexora-npc-behavior-state-contract
description: "Defines explicit state transitions for NPC behavior so animation, navigation, combat, and dialogue cannot disagree."
---

# nexora npc behavior state contract

## Purpose

Use this workflow for NEXORA-scale engine work when NPC behavior state machines and transition bugs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Enumerate behavior states, transition events, and ownership of each state.
2. Define preconditions and postconditions for every transition.
3. Separate persistent intent from transient animation and navigation state.
4. Make transition priority explicit when events arrive in the same tick.
5. Specify interruption, timeout, and recovery behavior.
6. Reject or log invalid transitions in development builds.
7. Test transition tables including simultaneous and repeated events.
8. Replay captured event sequences to reproduce state desynchronization.
9. Document invariants consumed by animation, combat, and save systems.

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

Every reachable state has defined transitions and invalid combinations are caught by tests.

Do not let animation state become the authoritative gameplay state. Avoid implicit transitions hidden across unrelated callbacks.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC behavior state machines and transition bugs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
