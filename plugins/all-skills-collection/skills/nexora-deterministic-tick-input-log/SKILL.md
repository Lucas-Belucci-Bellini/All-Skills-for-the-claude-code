---
name: nexora-deterministic-tick-input-log
description: "Makes simulation replay reproducible by recording ordered inputs and the versions needed to interpret them."
---

# nexora deterministic tick input log

## Purpose

Use this workflow for NEXORA-scale engine work when deterministic game tick replay. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Define the simulation tick boundary and canonical input event schema.
2. assign monotonic tick and sequence numbers.
3. record authoritative input payloads rather than wall-clock observations.
4. capture seed, simulation/config version, and relevant content identifiers.
5. isolate nondeterministic I/O behind recorded results.
6. replay from a known initial snapshot.
7. compare periodic state hashes and identify the first divergent tick.
8. test varied worker scheduling where deterministic behavior is promised.
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

A replay artifact reproduces the same state hashes or reports the earliest divergence with useful context.

Do not claim bitwise determinism across platforms unless floating-point and platform behavior are controlled. Avoid recording secrets or unnecessary personal data.

## Trigger examples

- "Audit deterministic game tick replay in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
