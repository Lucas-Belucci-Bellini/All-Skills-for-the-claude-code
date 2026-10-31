---
name: engine-plugin-abi-compatibility
description: Define and review versioned plugin boundaries so engine modules can detect incompatible interfaces, ownership rules, and lifecycle expectations before loading.
---

# Engine Plugin ABI Compatibility

## Goal

Make plugin compatibility explicit and fail safely before calling incompatible code.

## Inputs to inspect

Plugin manifest, engine and plugin versions, ABI/API version policy, exported symbols or interface definitions, allocator ownership, lifecycle callbacks, and supported platform matrix.

## Workflow

1. Separate source-level API compatibility from binary ABI compatibility; record compiler, target architecture, calling convention, runtime/library assumptions, and build mode where they affect the boundary.
2. Define a minimal manifest containing plugin identity, interface version, engine compatibility range, target platform/architecture, required capabilities, and integrity metadata.
3. Specify ownership and lifetime for buffers, strings, handles, callbacks, threads, and objects crossing the boundary; state which side allocates and frees each resource.
4. Specify initialization, activation, quiescence, shutdown, and failure cleanup as explicit states. Reject duplicate initialization and callbacks after unload.
5. Add compatibility tests for exact match, older supported interface, newer unsupported interface, missing required capability, malformed manifest, and architecture mismatch.
6. Ensure the loader validates metadata before loading or invoking plugin code; treat plugins as untrusted inputs and apply the engine's documented trust policy.
7. Document whether hot reload is supported. If it is, prove that callbacks, jobs, resources, and references are drained before unloading the old module.

## Validation checklist

- [ ] API and ABI versions are distinct and have documented compatibility rules.
- [ ] Cross-boundary memory and handle ownership is unambiguous.
- [ ] Incompatible plugins fail with actionable diagnostics before unsafe invocation.
- [ ] Lifecycle and unload tests cover outstanding callbacks and asynchronous work.

## Required output

A plugin boundary contract, compatibility matrix, loader rejection cases, and lifecycle test plan.

## Boundaries and failure handling

Do not claim ABI compatibility from matching semantic-version numbers alone. Never load unknown native code merely to discover its compatibility.

When repository evidence is incomplete, label the gap and request only information that changes the decision. Do not claim tests, benchmarks, hardware validation, or runtime checks passed unless their outputs were observed.
