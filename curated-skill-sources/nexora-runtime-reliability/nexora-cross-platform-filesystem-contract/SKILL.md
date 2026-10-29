---
name: nexora-cross-platform-filesystem-contract
description: "Makes world saves and asset paths behave consistently across Windows, Linux, and macOS without path traversal or case collisions."
---

# nexora cross platform filesystem contract

## Purpose

Use this workflow for NEXORA-scale engine work when cross-platform save paths and filesystem semantics. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Identify persisted logical paths versus host filesystem paths.
2. normalize separators and reject traversal, absolute paths, reserved names, and invalid encodings.
3. define case-collision policy for portable worlds.
4. avoid assuming rename and fsync semantics are identical across platforms.
5. write through same-volume temporary files where atomic rename is supported.
6. test Unicode, long paths, symlinks, case-only differences, and permission failures on each target OS.
7. Run focused tests and static checks available in the repository..
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

Path validation and save durability rules are explicit, with platform-specific tests and documented limitations.

Do not concatenate untrusted mod paths into filesystem paths. Never promise identical durability where the platform cannot provide it.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora cross platform filesystem contract and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
