---
name: nexora-ai-npc-memory-retention
description: "Bounds persistent NPC memory and prevents stale or private observations from accumulating indefinitely."
---

# nexora ai npc memory retention

## Purpose

Use this workflow for NEXORA-scale engine work when NPC memory systems and long-lived agent state. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify memory facts by source, confidence, lifetime, and sensitivity.
2. define expiry and consolidation rules.
3. cap entries and serialized size.
4. separate world facts from inferred beliefs.
5. invalidate memories when referenced entities or regions disappear.
6. version persistent memory schemas.
7. test long sessions and save/load.
8. provide inspectable reasons for retention/removal.
9. avoid retaining chat or personal data unnecessarily.

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

NPC memory remains bounded, explainable, and consistent with current world identity.

Do not treat stale inferred beliefs as authoritative world state. Avoid unbounded per-NPC logs or unnecessary personal-data retention.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC memory systems and long-lived agent state and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
