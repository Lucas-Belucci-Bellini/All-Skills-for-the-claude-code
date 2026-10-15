---
name: wasm-native-performance-comparison
description: "Compares WebAssembly and native performance using equivalent workloads. Use when choosing browser/runtime deployment, validating a WASM boundary, or explaining observed slowdowns."
---

# Wasm Native Performance Comparison

## Use when
A simple multiplier is being treated as universal despite differences in workload, I/O, warm-up, bindings, and compiler settings.

## Workflow
1. Select representative workloads and separate pure computation, allocation, startup, interop, file/network I/O, and rendering costs.
2. Build native and WASM artifacts from the same logical source and equivalent optimization/profile settings where possible.
3. Measure cold start, warm throughput, memory, and tail latency over repeated runs; retain raw samples and environment metadata.
4. Profile the largest gap and test whether it comes from algorithm choice, bounds checks, allocation, interop, runtime, or build configuration.

## Required output
An apples-to-apples benchmark matrix, raw result files, environment notes, and a workload-specific recommendation.

## Validation
- The same input and correctness oracle are used for both variants.
- Build mode and warm-up treatment are recorded.
- Claims distinguish one workload from a universal performance statement.

## Guardrails
Do not compare a release-native binary against debug WASM and attribute the entire gap to WebAssembly.
