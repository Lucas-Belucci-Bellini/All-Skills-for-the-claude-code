---
name: nexora-world-command-permission-recheck
description: "Revalidates permissions and world ownership at commit time for delayed or queued world commands."
---

# nexora world command permission recheck

## Purpose

Use this workflow for NEXORA-scale engine work when queued world commands and stale permissions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture command intent and actor identity at request time.
2. avoid treating initial permission checks as permanent.
3. revalidate ownership, region access, and target generation immediately before commit.
4. expire stale commands.
5. define retry behavior after permission changes.
6. test queued commands during disconnect and mod reload.
7. record rejection reasons.
8. ensure retries are idempotent.
9. document authority source.

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

A delayed command cannot commit using stale permissions or target identity.

Do not trust permission state captured before a long queue delay. Avoid retrying a rejected destructive command automatically.

## Trigger examples

- **Positive:** A code change or incident directly involves queued world commands and stale permissions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
