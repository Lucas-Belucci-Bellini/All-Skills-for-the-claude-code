---
name: nexora-inventory-transaction-invariants
description: "Keeps inventory moves, crafting, and item transfers atomic under concurrent gameplay events."
---

# nexora inventory transaction invariants

## Purpose

Use this workflow for NEXORA-scale engine work when inventory transactions and item duplication bugs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define inventory ownership and slot invariants.
2. represent transfer or crafting as a transaction.
3. validate counts, capacity, item identity, and permissions before mutation.
4. reserve resources when work spans async boundaries.
5. commit input consumption and output creation atomically.
6. deduplicate retries.
7. test concurrent pickup, disconnect, and crafting.
8. verify save/load around commit boundaries.
9. audit event logs for duplication.

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

Inventory quantities remain conserved according to the transaction rules and retries cannot duplicate outputs.

Do not consume inputs before output capacity and commit conditions are secured. Avoid trusting client inventory totals.

## Trigger examples

- **Positive:** A code change or incident directly involves inventory transactions and item duplication bugs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
