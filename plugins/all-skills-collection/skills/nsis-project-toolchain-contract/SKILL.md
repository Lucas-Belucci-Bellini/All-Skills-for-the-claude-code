---
name: nsis-project-toolchain-contract
description: "Original NSIS engineering workflow for define a reproducible project layout and toolchain contract, with reproducible validation and language-specific boundaries."
---

# Project and toolchain contract for NSIS

## Purpose

Define a reproducible project layout and toolchain contract for real repositories and production-bound code. This workflow is written specifically around NSIS semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures NSIS code or its build/runtime integration.

## Required inputs

source tree, version constraints, build scripts, target platforms, and dependency manifests.

## Language-specific implementation notes

- Toolchain: NSIS version, Unicode mode, Windows targets, install scope, signing.
- Core model: sections, functions, variables, LogicLib, registry views, install modes, uninstaller.
- Verification: silent/interactive install tests, upgrade/uninstall cycles, clean VM snapshots, exit codes.
- Performance: installer size, extraction time, optional component cost, startup overhead.
- Security: least privilege, safe registry writes, path validation, rollback, signed artifacts, secret-free logs.

## Workflow

1. Inventory source roots, generated outputs, build entrypoints, supported targets, and exact language/runtime versions.
2. Select and pin the toolchain for NSIS; record compiler/interpreter flags and required environment variables without embedding secrets. NSIS version, Unicode mode, Windows targets, install scope, signing.
3. Define the smallest valid project structure and separate production code, tests, generated artifacts, and platform-specific files.
4. Make dependency resolution reproducible; record lockfile policy, trusted registries, and clean-room build behavior.
5. Implement one vertical slice that exercises the normal build path and one target-specific boundary.
6. Build from a clean checkout and verify the documented command works without undeclared machine state.
7. Publish versions, commands, outputs, supported targets, known limitations, and clean-build evidence.

## Validation checklist

- [ ] The target language version, toolchain, environment, and supported platforms are explicit.
- [ ] The implementation follows the language's actual semantics and records relevant tradeoffs.
- [ ] Validation covers normal, boundary, invalid, and failure paths with reproducible commands.
- [ ] Performance or security claims are supported by measurements/tests, not assumptions.
- [ ] Generated files, dependencies, secrets, and external interfaces follow repository policies.

## Required output

A versioned build contract with verified commands, dependency policy, and platform assumptions. Include changed paths, commands executed, actual results, assumptions, and remaining risks.

## Boundaries and failure handling

Do not infer compiler/runtime behavior from another language or version. Do not claim a build, test, benchmark, or security review passed unless it was executed and its result was observed. Preserve existing public contracts unless the task explicitly authorizes a breaking change. If the target toolchain or runtime is unavailable, provide the exact blocked check and a reproducible command for the owner to run.

## Trigger examples

- **Positive:** Define a reproducible project layout and toolchain contract in this NSIS project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
