---
name: nexora-crafting-recipe-cycle-audit
description: "Detects invalid recipe dependency cycles and ambiguous outputs in content packs."
---

# nexora crafting recipe cycle audit

## Purpose

Use this workflow for NEXORA-scale engine work when crafting graph and recipe dependency validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Build a graph of recipe inputs and outputs.
2. normalize identifiers and quantities.
3. identify cycles that create resources without valid costs.
4. distinguish intentional transformation loops from exploitative cycles.
5. check missing and duplicate outputs.
6. compute bounded reachability for progression.
7. test representative mod combinations.
8. produce a cycle path with owning packs.
9. validate against the runtime registry.

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

Suspicious cycles and ambiguous recipes are reported before content publication with a reproducible dependency path.

Do not reject every cycle blindly when catalysts or resource costs make it valid. Use quantity-aware analysis for exploit detection.

## Trigger examples

- **Positive:** A code change or incident directly involves crafting graph and recipe dependency validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
