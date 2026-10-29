---
name: nexora-mod-capability-boundary
description: "Defines least-privilege capabilities for mods and scripts that interact with filesystem, network, commands, and engine internals."
---

# nexora mod capability boundary

## Purpose

Use this workflow for NEXORA-scale engine work when mod sandbox and capability APIs. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Inventory privileged operations and their owners.
2. define explicit capability tokens and default-deny permissions.
3. separate read-only world queries from mutations.
4. scope filesystem paths to approved roots.
5. validate network destinations and resource limits.
6. audit native-code escape hatches.
7. make grants visible and revocable where feasible.
8. test denied, granted, expired, and forged capabilities.
9. log security-relevant decisions without exposing secrets.

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

Every privileged operation has an explicit permission check and tests for unauthorized access.

Do not claim sandboxing if mods execute unrestricted native code in-process. Document trust levels and isolate high-risk extensions out of process when needed.

## Trigger examples

- "Audit mod sandbox and capability APIs in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
