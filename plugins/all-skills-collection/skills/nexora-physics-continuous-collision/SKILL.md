---
name: nexora-physics-continuous-collision
description: "Prevents fast-moving bodies from tunneling through thin geometry under the selected physics backend."
---

# nexora physics continuous collision

## Purpose

Use this workflow for NEXORA-scale engine work when continuous collision detection and fast bodies. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify body speeds and thin obstacles.
2. determine backend CCD support and limitations.
3. define which bodies require swept tests.
4. bound motion per substep where CCD is unavailable.
5. verify broadphase participation and collision masks.
6. test extreme speeds and grazing contacts.
7. compare discrete and continuous results.
8. measure CCD cost.
9. document tolerances and fallback behavior.

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

High-speed collisions obey the documented detection contract without unbounded solver cost.

Do not enable expensive CCD globally without measurement.

## Trigger examples

- **Positive:** A code change or incident directly involves continuous collision detection and fast bodies and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
