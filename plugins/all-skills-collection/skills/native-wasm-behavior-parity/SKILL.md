---
name: native-wasm-behavior-parity
description: Compare native and WebAssembly builds for observable behavior, serialization, numeric limits, and unsupported platform assumptions.
---

# Native Wasm Behavior Parity

## Goal

Keep native and WASM targets behaviorally compatible where the project promises parity, while documenting intentional platform differences.

## Inputs to inspect

Target-specific code, feature flags, serialization formats, numeric operations, system APIs, and shared acceptance tests.

## Workflow

1. Write down the parity contract: which outputs, save formats, deterministic results, error behavior, and user-visible flows must match across targets.
2. Inventory conditional compilation, target-specific dependencies, environment assumptions, filesystem/network access, pointer-width differences, atomics, and clock sources.
3. Create the same fixture corpus for native and WASM, including boundary numeric values, Unicode text, empty collections, malformed inputs, and round-trip serialized data.
4. Compare normalized outputs and errors. When differences are intentional, require a documented rule rather than weakening the comparison globally.
5. Run the parity suite for every supported build profile and browser/runtime combination; track tests not runnable in the current environment.

## Validation checklist

- [ ] The parity contract is explicit and distinguishes required equality from known platform differences.
- [ ] Fixtures are shared across targets rather than independently authored to match each implementation.
- [ ] Integer overflow, float behavior, time, randomness, and serialization assumptions are examined directly.
- [ ] A failure reports a minimal input and normalized difference.
- [ ] Conditional code paths have test coverage or an explicitly tracked gap.

## Required output

Produce a target parity matrix, shared fixture list, observed divergences, accepted platform-specific behaviors, and a repeatable CI command matrix.

## Boundaries and failure handling

Do not assume passing compilation means behavioral parity; do not normalize away differences that can corrupt saved state or protocol data.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
