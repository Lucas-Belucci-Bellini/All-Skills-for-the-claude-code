---
name: nexora-save-lock-and-recovery
description: "Coordinates save locks and recovery markers so interrupted writes cannot appear as committed state."
---

# nexora save lock and recovery

## Purpose

Use this workflow for NEXORA-scale engine work when save locking and recovery markers. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define lock ownership and save transaction states.
2. create recovery markers before risky write phases.
3. distinguish active transactions from abandoned ones.
4. validate generation and checksum before recovery.
5. make marker updates atomic where possible.
6. test crashes at each transition.
7. preserve the previous committed generation.
8. clean up markers only after verified completion.
9. report ambiguous states for manual recovery.

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

Recovery markers accurately describe incomplete transactions and never replace a valid committed save without proof.

Do not delete ambiguous markers based only on age. Keep a validated prior generation until commit confirmation.

## Trigger examples

- **Positive:** A code change or incident directly involves save locking and recovery markers and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
