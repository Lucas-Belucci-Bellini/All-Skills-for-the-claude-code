---
name: rust-cross-compilation-validation
description: Validate Rust cross-compilation with explicit targets, linker/sysroot dependencies, runtime tests, and packaging checks.
---

# Rust Cross Compilation Validation

## Goal

Make target builds reproducible rather than treating successful host compilation as proof of platform support.

## Inputs to inspect

Supported target triples, toolchains, linker/SDK setup, dependencies, CI images, and distribution requirements.

## Workflow

1. List supported target triples and define what support means for each: check/build, unit tests, runtime smoke test, packaging, and deployment validation.
2. Inventory target-specific dependencies, native libraries, environment variables, linker flags, SDK versions, and required code-signing or packaging steps.
3. Run target compilation in a pinned environment and capture toolchain/sysroot details; distinguish target checks from actual target execution.
4. For cross-built artifacts, test on native runners, emulators, or explicit smoke harnesses where available and record unavailable runtime coverage.
5. Build the release package from the same declared pipeline and verify executable format, dynamic dependencies, assets, permissions, and install/uninstall behavior.

## Validation checklist

- [ ] Each supported target has explicit build and runtime evidence levels.
- [ ] Native dependencies and SDK/toolchain versions are pinned or documented.
- [ ] Host-only tests are not counted as target runtime validation.
- [ ] Artifacts are inspected for correct architecture and missing shared libraries.
- [ ] Unsupported targets fail clearly rather than falling back to an unintended host build.

## Required output

Deliver a target support matrix, reproducible build recipe, CI job mapping, artifact inspection, and list of target-specific test gaps.

## Boundaries and failure handling

Do not claim platform support from `cargo check` alone; do not hide untested packaging or runtime steps.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
