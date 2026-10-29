---
name: nexora-server-authority-validation
description: "Ensures clients cannot authoritatively choose protected world, inventory, combat, or economy state."
---

# nexora server authority validation

## Purpose

Use this workflow for NEXORA-scale engine work when server-authoritative gameplay and client trust boundaries. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List client commands and protected fields.
2. define server-side preconditions and ownership checks.
3. validate movement, inventory, cooldowns, and world bounds at authority.
4. treat prediction as provisional.
5. rate-limit repeated expensive commands.
6. test forged ownership and impossible movement.
7. log security decisions without excess personal data.
8. audit mod APIs for bypasses.
9. document prediction correction rules.

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

All protected state changes are validated by the authoritative owner.

Do not trust client-side validation or obfuscation. Avoid punitive action from one noisy anomaly without policy.

## Trigger examples

- **Positive:** A code change or incident directly involves server-authoritative gameplay and client trust boundaries and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
