---
name: nexora-animation-root-motion-authority
description: "Defines whether root motion is authoritative gameplay movement or presentation-only animation."
---

# nexora animation root motion authority

## Purpose

Use this workflow for NEXORA-scale engine work when root motion and character controller integration. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify authority owner for character displacement.
2. define extraction/application order per tick.
3. separate visual root offset from world movement.
4. resolve collision and navigation after movement.
5. specify network replication and prediction.
6. test interrupted clips and transitions.
7. compare motion under different frame rates.
8. record correction metrics.
9. document import assumptions.

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

Root motion cannot move authoritative characters outside the declared movement contract.

Do not apply the same displacement through animation and controller code.

## Trigger examples

- **Positive:** A code change or incident directly involves root motion and character controller integration and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
