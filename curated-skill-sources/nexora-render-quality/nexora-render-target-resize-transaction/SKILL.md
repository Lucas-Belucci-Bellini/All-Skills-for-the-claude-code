---
name: nexora-render-target-resize-transaction
description: "Resizes render targets and dependent resources atomically when the window or viewport changes."
---

# nexora render target resize transaction

## Purpose

Use this workflow for NEXORA-scale engine work when renderer resize and render-target recreation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture the requested dimensions and target generation.
2. validate device limits and zero-sized/minimized states.
3. create candidate targets and dependent descriptors.
4. update viewport/scissor and history buffers coherently.
5. swap generations at a safe frame boundary.
6. retire old resources after GPU completion.
7. test rapid resize and device loss.
8. preserve a valid fallback on allocation failure.
9. measure resize stalls.

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

All dependent render resources belong to one consistent size generation and failures preserve a usable frame path.

Do not destroy old targets before new resources are valid and in-flight work completes.

## Trigger examples

- **Positive:** A code change or incident directly involves renderer resize and render-target recreation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
