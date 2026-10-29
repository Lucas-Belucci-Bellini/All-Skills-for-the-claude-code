---
name: nexora-shader-cache-key-contract
description: "Defines stable shader cache keys that include all source, compiler, feature, and target inputs affecting generated binaries."
---

# nexora shader cache key contract

## Purpose

Use this workflow for NEXORA-scale engine work when shader compilation and cache identity. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Enumerate source files and include dependencies.
2. include compiler/toolchain identity and relevant flags.
3. canonicalize feature defines and target capabilities.
4. version the cache schema.
5. store metadata beside binaries.
6. validate cache hits before use.
7. rebuild on missing or incompatible inputs.
8. test include changes, compiler upgrades, and feature toggles.
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

Identical complete inputs produce reusable cache entries and every relevant input change invalidates stale binaries.

Never execute or trust cache artifacts solely by filename. Treat corrupted cache entries as rebuildable failures and retain diagnostics.

## Trigger examples

- **Positive:** A code change or incident directly involves shader compilation and cache identity and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
