---
name: nexora-entity-component-ownership-audit
description: "Clarifies ECS component ownership, mutation phases, and cross-system access to avoid aliasing and hidden coupling."
---

# nexora entity component ownership audit

## Purpose

Use this workflow for NEXORA-scale engine work when ECS component access and system boundaries. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List component storage owners and systems that read or mutate each component.
2. Declare read/write access for each scheduled system.
3. Identify shared mutable references and unsafe interior mutability.
4. Define deferred structural changes and command-buffer flush points.
5. Prevent entity reuse from invalidating outstanding references.
6. Test conflicting systems and deterministic schedule behavior.
7. Add debug assertions for access outside allowed phases.
8. Measure command-buffer growth and archetype churn.
9. Document public component contracts and migration implications.

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

System access declarations match actual mutations and structural changes occur at defined synchronization points.

Do not use raw pointers to bypass ECS borrowing rules without a documented and tested safety invariant.

## Trigger examples

- **Positive:** A code change or incident directly involves ECS component access and system boundaries and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
