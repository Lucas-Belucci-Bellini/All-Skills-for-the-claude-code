---
name: nexora-rust-error-boundary-design
description: "Designs error types and recovery boundaries across Rust engine crates without leaking implementation details across module APIs."
---

# nexora rust error boundary design

## Purpose

Use this workflow for NEXORA-scale engine work when Rust crate errors and subsystem boundaries. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Map which crate owns each failure and which caller can recover.
2. distinguish invalid user data, unavailable resources, cancellation, transient I/O, corruption, and programmer invariants.
3. define typed errors at public crate boundaries and preserve causal context.
4. convert to user-facing diagnostics only at application boundaries.
5. avoid string parsing and blanket error erasure in core paths.
6. document retryability and whether partial state may exist.
7. add tests for source chains and recovery decisions.
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

Each error has an owner, stable meaning, and explicit recovery policy; public APIs do not expose accidental internal types.

Do not turn corruption into success or retry permanent failures indefinitely. Panic only for violated internal invariants where recovery is unsafe.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora rust error boundary design and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
