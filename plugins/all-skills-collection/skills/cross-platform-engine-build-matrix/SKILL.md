---
name: cross-platform-engine-build-matrix
description: "Defines and verifies cross-platform build targets for an engine. Use when Rust crates, native dependencies, graphics backends, assets, or packaging must work across operating systems."
---

# Cross Platform Engine Build Matrix

## Use when
A project builds only on the developer machine because target support and native dependency assumptions are undocumented.

## Workflow
1. List target OS/architecture, compiler/toolchain, graphics backend, required native libraries, and packaging format for each supported combination.
2. Separate compile-time support from runtime functionality and define a minimal smoke test for each target.
3. Make target-specific dependencies explicit behind feature flags or platform modules instead of scattered conditional compilation.
4. Record unsupported combinations and release-blocking targets in an automated matrix.

## Required output
A target-support table, CI matrix proposal, dependency notes, and per-target smoke-test contract.

## Validation
- Every advertised target has an actual build or an explicit validation status.
- Optional dependencies fail with clear diagnostics when absent.
- Artifacts identify target triple, toolchain, and source revision.

## Guardrails
Do not call a target supported merely because cross-compilation succeeds; runtime and packaging must also be validated.
