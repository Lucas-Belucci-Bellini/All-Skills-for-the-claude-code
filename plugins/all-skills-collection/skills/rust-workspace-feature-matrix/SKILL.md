---
name: rust-workspace-feature-matrix
description: Audit Cargo workspace feature combinations and target-specific dependency activation for unintended builds and feature unification.
---

# Rust Workspace Feature Matrix

## Goal

Keep Rust workspace builds reproducible as crates, optional dependencies, targets, and feature flags grow.

## Inputs to inspect

Cargo.toml files, Cargo.lock, feature declarations, supported targets, CI commands, and dependency tree output.

## Workflow

1. Inventory workspace members, default and optional features, target-specific dependencies, and public feature forwarding between crates.
2. Construct the supported feature/target matrix, separating combinations that users may select from internal CI-only configurations.
3. Inspect Cargo feature unification and default-feature behavior across dependency edges; identify features that silently activate expensive or unsupported code.
4. Run representative `cargo tree -e features`, check/build/test commands, and target builds where tools are available; record skipped combinations and reasons.
5. Add minimal CI smoke jobs for important feature combinations and document intentionally unsupported combinations.

## Validation checklist

- [ ] Each public feature has a documented meaning and forwarding behavior.
- [ ] Unintended default features or feature-unification effects are identified.
- [ ] Core combinations compile without network/toolchain assumptions beyond those documented.
- [ ] Target-specific dependencies do not leak unsupported APIs into other targets.
- [ ] The matrix remains small enough to maintain and prioritizes public/support-critical paths.

## Required output

Deliver a feature dependency map, target/feature matrix, unintended activation findings, minimal CI coverage, and compatibility notes.

## Boundaries and failure handling

Do not assume `--no-default-features` proves every optional configuration works; do not remove a feature without reviewing downstream users.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
