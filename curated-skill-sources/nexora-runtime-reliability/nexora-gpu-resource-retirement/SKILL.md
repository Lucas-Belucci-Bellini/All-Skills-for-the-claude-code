---
name: nexora-gpu-resource-retirement
description: "Prevents GPU buffers, textures, and descriptors from being freed or reused before queued GPU work has finished using them."
---

# nexora gpu resource retirement

## Purpose

Use this workflow for NEXORA-scale engine work when GPU resource lifetime and deferred deletion. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Trace resource creation, command submission, and destruction.
2. identify the API's completion/fence primitive.
3. enqueue retirements with the relevant completion value.
4. distinguish CPU ownership from GPU in-flight use.
5. handle device loss and shutdown.
6. test rapid reload/unload and descriptor reuse.
7. add debug labels and lifetime assertions.
8. profile deferred-retirement queue growth.
9. Document rollback or safe fallback behavior..

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Source and bundle copies are byte-identical.
- [ ] Focused tests and static checks pass, or skipped checks are reported honestly.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Report the decision, invariants, code paths reviewed or changed, tests and results, performance/compatibility implications, and unresolved risks.

## Boundaries and failure handling

No resource is reused before the corresponding GPU work completes, and retirement queues remain bounded.

Never assume CPU reference-count reaching zero proves GPU completion. Device-loss paths must not wait forever for unreachable fences.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU resource lifetime and deferred deletion and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
