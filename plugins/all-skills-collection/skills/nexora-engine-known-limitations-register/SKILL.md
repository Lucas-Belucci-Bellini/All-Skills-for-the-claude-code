---
name: nexora-engine-known-limitations-register
description: "Maintains a verified list of limitations that affect architecture, performance, platform support, or mod safety."
---

# nexora engine known limitations register

## Purpose

Use this workflow for NEXORA-scale engine work when engine known limitations and pre-alpha communication. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Gather limitations from test failures, platform gaps, design decisions, and open incidents.
2. verify each entry against current code or evidence.
3. classify severity and affected versions.
4. state a workaround only if tested.
5. assign an owner and review date.
6. remove resolved entries only after regression checks.
7. avoid duplicate or speculative entries.
8. include data-loss and security caveats prominently.
9. publish a concise user-facing summary.

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

Every listed limitation is current, reproducible or evidence-backed, and paired with a clear impact statement.

Do not hide unresolved data-loss or security risks behind vague wording. Avoid presenting unverified workarounds as reliable.

## Trigger examples

- **Positive:** A code change or incident directly involves engine known limitations and pre-alpha communication and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
