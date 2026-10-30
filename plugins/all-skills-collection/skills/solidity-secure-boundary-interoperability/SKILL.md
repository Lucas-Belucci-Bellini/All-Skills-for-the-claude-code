---
name: solidity-secure-boundary-interoperability
description: "Original Solidity engineering workflow for harden language-specific trust boundaries and integration contracts, with reproducible validation and language-specific boundaries."
---

# Secure boundaries and interoperability for Solidity

## Purpose

Harden language-specific trust boundaries and integration contracts for real repositories and production-bound code. This workflow is written specifically around Solidity semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures Solidity code or its build/runtime integration.

## Required inputs

untrusted inputs, external interfaces, dependencies, secrets policy, and compatibility targets.

## Language-specific implementation notes

- Toolchain: compiler version, optimizer/via-IR, EVM target, dependencies, deployment network.
- Core model: storage layout, calldata/memory/storage, ABI, events, modifiers, inheritance, upgrades.
- Verification: Foundry/Hardhat, fuzzing, invariant tests, static analyzers, pinned-block fork tests.
- Performance: gas snapshots, storage writes, calldata, loop bounds, bytecode limits.
- Security: checks-effects-interactions, access control, reentrancy, oracle validation, upgrade governance.

## Workflow

1. Map trust boundaries: user input, files, network, process invocation, database, plugins, FFI, and generated output.
2. Apply language-specific safety controls. checks-effects-interactions, access control, reentrancy, oracle validation, upgrade governance.
3. Validate shape, size, encoding, range, authorization, and version before data reaches privileged logic.
4. Constrain dependencies and runtime permissions; keep credentials out of source, logs, artifacts, and test fixtures.
5. Define compatibility behavior for version skew, missing fields, malformed data, retries, and partial failure.
6. Add negative tests for injection, path traversal, overflow, unauthorized access, unsafe deserialization, and boundary confusion.
7. Deliver a boundary map and verification evidence; mark untested assumptions as risks.

## Validation checklist

- [ ] The target language version, toolchain, environment, and supported platforms are explicit.
- [ ] The implementation follows the language's actual semantics and records relevant tradeoffs.
- [ ] Validation covers normal, boundary, invalid, and failure paths with reproducible commands.
- [ ] Performance or security claims are supported by measurements/tests, not assumptions.
- [ ] Generated files, dependencies, secrets, and external interfaces follow repository policies.

## Required output

A boundary map, defensive implementation plan, negative tests, and documented residual risks. Include changed paths, commands executed, actual results, assumptions, and remaining risks.

## Boundaries and failure handling

Do not infer compiler/runtime behavior from another language or version. Do not claim a build, test, benchmark, or security review passed unless it was executed and its result was observed. Preserve existing public contracts unless the task explicitly authorizes a breaking change. If the target toolchain or runtime is unavailable, provide the exact blocked check and a reproducible command for the owner to run.

## Trigger examples

- **Positive:** Harden language-specific trust boundaries and integration contracts in this Solidity project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
