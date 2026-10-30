---
name: csharp-secure-boundary-interoperability
description: "Original C# engineering workflow for harden language-specific trust boundaries and integration contracts, with reproducible validation and language-specific boundaries."
---

# Secure boundaries and interoperability for C#

## Purpose

Harden language-specific trust boundaries and integration contracts for real repositories and production-bound code. This workflow is written specifically around C# semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures C# code or its build/runtime integration.

## Required inputs

untrusted inputs, external interfaces, dependencies, secrets policy, and compatibility targets.

## Language-specific implementation notes

- Toolchain: SDK pinning, solutions/projects, target frameworks, nullable context, NuGet locks.
- Core model: records/classes/structs, generics, pattern matching, async/await, LINQ, IDisposable.
- Verification: dotnet test, xUnit/NUnit, analyzers, nullable warnings.
- Performance: BenchmarkDotNet, dotnet-counters, dotnet-trace, allocations, async contention.
- Security: parameterized SQL, safe deserialization, secret providers, authorization, dependency audits.

## Workflow

1. Map trust boundaries: user input, files, network, process invocation, database, plugins, FFI, and generated output.
2. Apply language-specific safety controls. parameterized SQL, safe deserialization, secret providers, authorization, dependency audits.
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

- **Positive:** Harden language-specific trust boundaries and integration contracts in this C# project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
