---
name: rust-feature-configuration-smoke-matrix
description: Validate supported Cargo feature combinations with fast compile/test smoke jobs that catch invalid optional-dependency wiring and cfg gaps.
---

# Rust Feature Configuration Smoke Matrix

## Goal

Ensure advertised feature sets compile and expose correct behavior without exploding CI cost into a full Cartesian test matrix.

## Inputs to inspect

Cargo manifests, public features, target-specific dependencies, CI jobs, feature forwarding and supported consumer profiles.

## Workflow

1. Inventory public features and realistic user configurations such as defaults, minimal build, server-only, client-only, optional integrations and target-specific builds.
2. Select a risk-based representative matrix that covers every public feature and important pairwise interaction without testing every impossible combination.
3. Run check/build/test jobs for each selected row with pinned toolchain and lockfile; record features, target and commands in the output.
4. Exercise negative configurations where an unsupported combination should fail early with a clear diagnostic rather than a cryptic compiler error.
5. Review coverage whenever feature or dependency wiring changes and add a row when a new interaction affects a supported profile.

## Validation checklist

- [ ] Every public feature appears in at least one positive smoke configuration.
- [ ] Important mutually dependent/conflicting feature pairs are explicitly covered.
- [ ] Unsupported combinations fail with documented diagnostics where feasible.
- [ ] The matrix labels target/toolchain and does not equate `cargo check` with runtime tests.

## Required output

A supported feature profile table, fast CI matrix, observed results and documented unsupported combinations.

## Boundaries and failure handling

Do not promise all possible feature combinations are tested when the matrix is intentionally representative rather than exhaustive.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
