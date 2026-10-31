---
name: nexora-network-session-epoch-rotation
description: "Invalidates stale packets and credentials when a client session is renewed or resumed."
---

# nexora network session epoch rotation

## Purpose

Use this workflow for NEXORA-scale engine work when session renewal and stale network traffic. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define when epochs rotate and which state survives.
2. bind authentication and entity mappings to the active epoch.
3. reject packets from prior epochs before gameplay dispatch.
4. rotate relevant keys or tokens through supported mechanisms.
5. reconcile pending commands explicitly.
6. test delayed packets across reconnect and server restart.
7. bound old-epoch grace windows.
8. log sanitized rotation causes.
9. document recovery semantics.

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

Old-epoch traffic cannot mutate current session state and renewal has a defined recovery path.

Do not accept stale packets indefinitely for convenience. Never log session tokens or cryptographic secrets.

## Trigger examples

- **Positive:** A code change or incident directly involves session renewal and stale network traffic and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
