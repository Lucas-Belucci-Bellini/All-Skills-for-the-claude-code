---
name: nexora-npc-save-state-schema
description: "Persists NPC state with schema validation and stable identifiers across engine updates."
---

# nexora npc save state schema

## Purpose

Use this workflow for NEXORA-scale engine work when NPC persistence and save compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Separate durable NPC IDs from runtime handles.
2. define required/optional fields and validation ranges.
3. store behavior state in a versioned schema.
4. resolve inventory, faction, home, and navigation references after dependencies load.
5. define recovery for missing mods.
6. migrate older schemas with tests.
7. test round-trip, unknown fields, truncation, and partial loads.
8. verify load order independence.
9. report rejected records.

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

Valid NPC state round-trips and migrations are explicit; unsupported records fail safely.

Do not persist raw pointers or transient ECS indices. Never replace unknown behavior with a destructive default.

## Trigger examples

- **Positive:** A code change or incident directly involves NPC persistence and save compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
