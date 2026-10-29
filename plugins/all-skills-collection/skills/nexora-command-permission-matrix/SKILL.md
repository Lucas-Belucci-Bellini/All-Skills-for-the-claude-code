---
name: nexora-command-permission-matrix
description: "Makes privileged console and developer commands enforce consistent authorization."
---

# nexora command permission matrix

## Purpose

Use this workflow for NEXORA-scale engine work when engine console commands and admin permissions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory commands and their side effects.
2. classify read-only, world-mutating, file, network, and administrative actions.
3. define permission levels and context requirements.
4. enforce checks in command handlers rather than UI visibility.
5. validate arguments and target ownership.
6. audit dangerous command use.
7. test unauthorized and malformed invocations.
8. document multiplayer server-side policy.
9. review permission changes with release notes.

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

Every privileged command has explicit server-enforced authorization and tested denial behavior.

Hiding a command in the UI is not authorization. Avoid exposing destructive local commands to remote clients.

## Trigger examples

- **Positive:** A code change or incident directly involves engine console commands and admin permissions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
