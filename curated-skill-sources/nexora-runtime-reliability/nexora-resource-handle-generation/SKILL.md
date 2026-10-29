---
name: nexora-resource-handle-generation
description: "Prevents stale handles from accessing reused entity, asset, GPU, or chunk slots after resource deletion."
---

# nexora resource handle generation

## Purpose

Use this workflow for NEXORA-scale engine work when generational handles and slot reuse. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Identify slot allocation and deallocation paths.
2. use index-plus-generation or an equivalent stable identity.
3. increment generation on reuse with defined wrap behavior.
4. validate handles at every public lookup boundary.
5. prevent unchecked indexing from bypassing validation.
6. decide how serialization maps stable IDs versus process-local handles.
7. test delete/reallocate sequences and stale references.
8. instrument invalid-handle rates in debug builds.
9. Document a safe rollback or fallback path..

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

Stale handles fail deterministically and cannot resolve to newly allocated resources.

Do not persist transient slot indices as stable world identity. Avoid silently aliasing after generation wrap; choose a documented mitigation.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora resource handle generation and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
