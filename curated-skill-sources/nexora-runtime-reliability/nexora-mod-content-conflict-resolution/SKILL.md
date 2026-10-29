---
name: nexora-mod-content-conflict-resolution
description: "Resolves duplicate mod asset identifiers and incompatible overrides deterministically with actionable diagnostics."
---

# nexora mod content conflict resolution

## Purpose

Use this workflow for NEXORA-scale engine work when mod asset registry and override conflicts. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Define canonical names and namespace rules.
2. collect declarations before applying overrides.
3. distinguish intentional overrides from duplicate definitions.
4. define deterministic precedence using explicit priority and dependency order.
5. detect dependency cycles and missing required assets.
6. emit a conflict report with both owners and source paths.
7. test install-order permutations.
8. preserve a stable registry snapshot for runtime consumers.
9. Document rollback or safe fallback behavior..

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Source and bundle copies are byte-identical.
- [ ] Focused tests and static checks pass, or skipped checks are reported honestly.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Report the decision, invariants, code paths reviewed or changed, tests and results, performance/compatibility implications, and unresolved risks.

## Boundaries and failure handling

The same mod set resolves identically regardless of filesystem enumeration order, and conflicts are visible before world load.

Do not silently choose the first file discovered. Avoid allowing untrusted path names to escape mod asset roots.

## Trigger examples

- **Positive:** A code change or incident directly involves mod asset registry and override conflicts and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
