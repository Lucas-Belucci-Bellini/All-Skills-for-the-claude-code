---
name: nexora-network-protocol-version-gate
description: "Rejects or negotiates incompatible client/server protocol versions before world state is exchanged."
---

# nexora network protocol version gate

## Purpose

Use this workflow for NEXORA-scale engine work when network handshake and protocol compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define protocol version and capability negotiation fields.
2. validate version ranges before allocating session state.
3. separate wire format version from gameplay/content version.
4. define optional feature negotiation.
5. reject unknown required capabilities.
6. test old/new client fixtures and malformed handshakes.
7. version message schemas.
8. log sanitized compatibility reasons.
9. document upgrade and rollback support.

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

Incompatible peers fail early with actionable diagnostics and no partial session state.

Do not assume matching application version implies matching wire schema. Avoid silently enabling features a peer cannot interpret.

## Trigger examples

- **Positive:** A code change or incident directly involves network handshake and protocol compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
