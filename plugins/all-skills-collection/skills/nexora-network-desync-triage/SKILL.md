---
name: nexora-network-desync-triage
description: "Diagnoses multiplayer state divergence with bounded, privacy-safe evidence."
---

# nexora network desync triage

## Purpose

Use this workflow for NEXORA-scale engine work when multiplayer desynchronization and state mismatch. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture protocol version, tick, content hashes, and relevant state partitions.
2. compare authoritative and client diagnostic hashes.
3. identify the first divergence window.
4. collect only necessary events around that window.
5. distinguish expected prediction error from authoritative mismatch.
6. minimize a replay or fixture.
7. sanitize player/world data.
8. add a regression test.
9. report unresolved nondeterministic dependencies.

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

A desync report identifies the earliest measurable divergence and contains a reproducible or clearly bounded case.

Do not upload full world state or chat by default. Diagnostic hashes are not proof of malicious behavior.

## Trigger examples

- **Positive:** A code change or incident directly involves multiplayer desynchronization and state mismatch and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
