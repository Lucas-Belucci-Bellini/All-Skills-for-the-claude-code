---
name: gdscript-performance-resource-budget
description: "Original GDScript engineering workflow for measure and improve performance without sacrificing correctness, with reproducible validation and language-specific boundaries."
---

# Performance and resource-budget engineering for GDScript

## Purpose

Measure and improve performance without sacrificing correctness for real repositories and production-bound code. This workflow is written specifically around GDScript semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures GDScript code or its build/runtime integration.

## Required inputs

latency/throughput/memory budgets, representative workloads, baseline metrics, and profiler output.

## Language-specific implementation notes

- Toolchain: Godot version, project.godot, autoloads, scene/resource layout, typed-script policy.
- Core model: typed variables, signals, nodes, resources, scene ownership, coroutines, lifecycle callbacks.
- Verification: headless checks, GUT/project-native tests, scene smoke tests, input fixtures.
- Performance: Godot profiler, frame-time captures, node counts, allocations, draw calls, physics cost.
- Security: resource path validation, multiplayer authority, safe save parsing, signal lifecycle cleanup.

## Workflow

1. Define measurable latency, throughput, memory, binary/output-size, or frame-time budgets for the real workload.
2. Collect a baseline with language-appropriate profilers and representative inputs. Godot profiler, frame-time captures, node counts, allocations, draw calls, physics cost.
3. Identify dominant cost and distinguish algorithmic complexity, allocation, I/O, runtime, compiler, and integration overhead.
4. Change one bottleneck at a time while preserving observable behavior and public contracts.
5. Measure the same workload after the change; record hardware, runtime flags, warm-up, sample count, and variance.
6. Add a benchmark or budget regression check where stable automation is practical.
7. Report measured gains, regressions, tradeoffs, and cases where the optimization should not be used.

## Validation checklist

- [ ] The target language version, toolchain, environment, and supported platforms are explicit.
- [ ] The implementation follows the language's actual semantics and records relevant tradeoffs.
- [ ] Validation covers normal, boundary, invalid, and failure paths with reproducible commands.
- [ ] Performance or security claims are supported by measurements/tests, not assumptions.
- [ ] Generated files, dependencies, secrets, and external interfaces follow repository policies.

## Required output

A measured optimization report with workload, baseline, tradeoffs, and regression threshold. Include changed paths, commands executed, actual results, assumptions, and remaining risks.

## Boundaries and failure handling

Do not infer compiler/runtime behavior from another language or version. Do not claim a build, test, benchmark, or security review passed unless it was executed and its result was observed. Preserve existing public contracts unless the task explicitly authorizes a breaking change. If the target toolchain or runtime is unavailable, provide the exact blocked check and a reproducible command for the owner to run.

## Trigger examples

- **Positive:** Measure and improve performance without sacrificing correctness in this GDScript project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
