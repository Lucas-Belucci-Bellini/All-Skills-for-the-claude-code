---
name: nexora-worldgen-modifier-order
description: "Makes world-generation modifiers deterministic and compatible when multiple mods alter the same terrain pipeline."
---

# nexora worldgen modifier order

## Purpose

Use this workflow for NEXORA-scale engine work when world generation pipelines and mod modifiers. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define generation phases and allowed input/output contracts.
2. require stable modifier IDs and explicit ordering constraints.
3. detect dependency cycles and ambiguous writes.
4. derive per-world seeds independently of scheduling.
5. version the modifier pipeline for saved-world compatibility.
6. record modifier provenance.
7. test load-order permutations and concurrent chunk generation.
8. compare output hashes across repeated seeds.
9. report missing required modifiers clearly.

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

The same declared mod set, seed, and pipeline version yields reproducible terrain within the documented platform contract.

Do not use filesystem discovery order as precedence. Avoid silently changing generation semantics for existing worlds.

## Trigger examples

- **Positive:** A code change or incident directly involves world generation pipelines and mod modifiers and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
