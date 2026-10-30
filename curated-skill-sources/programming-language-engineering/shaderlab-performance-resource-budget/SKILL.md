---
name: shaderlab-performance-resource-budget
description: "Original ShaderLab engineering workflow for measure and improve performance without sacrificing correctness, with reproducible validation and language-specific boundaries."
---

# Performance and resource-budget engineering for ShaderLab

## Purpose

Measure and improve performance without sacrificing correctness for real repositories and production-bound code. This workflow is written specifically around ShaderLab semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures ShaderLab code or its build/runtime integration.

## Required inputs

latency/throughput/memory budgets, representative workloads, baseline metrics, and profiler output.

## Language-specific implementation notes

- Toolchain: Unity render pipeline, shader target, pass/subshader, property contract, variant policy.
- Core model: ShaderLab properties, HLSL blocks, render states, keywords, macros, pipeline includes.
- Verification: shader import/compiler logs, scene fixtures, frame debugger, representative hardware.
- Performance: shader variants, overdraw, texture bandwidth, pass count, GPU captures, precision.
- Security: validated material properties, bounded variants, safe keywords, pipeline compatibility.

## Workflow

1. Define measurable latency, throughput, memory, binary/output-size, or frame-time budgets for the real workload.
2. Collect a baseline with language-appropriate profilers and representative inputs. shader variants, overdraw, texture bandwidth, pass count, GPU captures, precision.
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

- **Positive:** Measure and improve performance without sacrificing correctness in this ShaderLab project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
