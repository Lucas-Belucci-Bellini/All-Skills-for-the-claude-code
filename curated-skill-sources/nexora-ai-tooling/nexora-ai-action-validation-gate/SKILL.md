---
name: nexora-ai-action-validation-gate
description: "Validates AI-proposed actions against world rules, permissions, and resource constraints before execution."
---

# nexora ai action validation gate

## Purpose

Use this workflow for NEXORA-scale engine work when AI NPC action execution and safety checks. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Represent proposed actions as typed commands.
2. validate actor identity and current state.
3. check range, permissions, cooldowns, resource costs, and world bounds.
4. revalidate at commit time if state may change.
5. define rejection feedback to the planner.
6. make retries idempotent.
7. test stale plans and adversarial outputs.
8. log sanitized rejection categories.
9. ensure action execution is bounded.

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

No AI proposal can bypass authoritative gameplay validation and rejected actions have explicit outcomes.

Do not treat model or planner output as trusted code or authority. Never execute arbitrary generated shell or script content.

## Trigger examples

- **Positive:** A code change or incident directly involves AI NPC action execution and safety checks and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
