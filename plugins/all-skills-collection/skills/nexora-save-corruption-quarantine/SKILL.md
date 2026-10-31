---
name: nexora-save-corruption-quarantine
description: "Recovers safely from corrupt world or region data without overwriting the only recoverable copy."
---

# nexora save corruption quarantine

## Purpose

Use this workflow for NEXORA-scale engine work when save corruption diagnosis and recovery. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Detect corruption through framing, length bounds, checksums, schema validation, and required-field checks.
2. distinguish truncation from unsupported versions.
3. preserve the original bytes before repair.
4. quarantine the damaged file with metadata and a diagnostic report.
5. recover only independently valid records.
6. write repaired output to a new temporary file and atomically replace after validation.
7. add fixtures for truncation, bit flips, invalid lengths, and partial writes.
8. Capture results and unresolved risks for review..
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

Recovery is auditable, preserves original evidence, and never presents silently partial data as fully valid.

Never delete the only original copy before verified replacement. Refuse automatic repair when record boundaries or integrity cannot be established.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora save corruption quarantine and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
