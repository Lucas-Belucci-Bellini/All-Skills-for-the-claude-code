---
name: solidity-testing-debugging-diagnostics
description: "Original Solidity engineering workflow for build a reproducible test and diagnostic loop for this language, with reproducible validation and language-specific boundaries."
---

# Testing, debugging, and diagnostics workflow for Solidity

## Purpose

Build a reproducible test and diagnostic loop for this language for real repositories and production-bound code. This workflow is written specifically around Solidity semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures Solidity code or its build/runtime integration.

## Required inputs

minimal reproduction, expected behavior, test harness, runtime logs, and target environments.

## Language-specific implementation notes

- Toolchain: compiler version, optimizer/via-IR, EVM target, dependencies, deployment network.
- Core model: storage layout, calldata/memory/storage, ABI, events, modifiers, inheritance, upgrades.
- Verification: Foundry/Hardhat, fuzzing, invariant tests, static analyzers, pinned-block fork tests.
- Performance: gas snapshots, storage writes, calldata, loop bounds, bytecode limits.
- Security: checks-effects-interactions, access control, reentrancy, oracle validation, upgrade governance.

## Workflow

1. Reproduce the behavior with the smallest source fixture and record exact compiler/runtime version and invocation.
2. Choose language-native test and diagnostic tools. Foundry/Hardhat, fuzzing, invariant tests, static analyzers, pinned-block fork tests.
3. Separate compile-time, static-analysis, unit, integration, and runtime failures so each has a clear owner.
4. Add tests for normal behavior, boundary values, invalid input, error propagation, and platform/runtime differences.
5. Capture useful diagnostics without leaking credentials, personal data, or uncontrolled binary dumps.
6. Run focused tests first, then the full relevant suite; preserve exit codes and actual tool output.
7. Record the minimal reproduction, fix, tests, and unresolved environment limitations.

## Validation checklist

- [ ] The target language version, toolchain, environment, and supported platforms are explicit.
- [ ] The implementation follows the language's actual semantics and records relevant tradeoffs.
- [ ] Validation covers normal, boundary, invalid, and failure paths with reproducible commands.
- [ ] Performance or security claims are supported by measurements/tests, not assumptions.
- [ ] Generated files, dependencies, secrets, and external interfaces follow repository policies.

## Required output

A reproducible failure case, focused tests, diagnostic evidence, and regression guard. Include changed paths, commands executed, actual results, assumptions, and remaining risks.

## Boundaries and failure handling

Do not infer compiler/runtime behavior from another language or version. Do not claim a build, test, benchmark, or security review passed unless it was executed and its result was observed. Preserve existing public contracts unless the task explicitly authorizes a breaking change. If the target toolchain or runtime is unavailable, provide the exact blocked check and a reproducible command for the owner to run.

## Trigger examples

- **Positive:** Build a reproducible test and diagnostic loop for this language in this Solidity project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
