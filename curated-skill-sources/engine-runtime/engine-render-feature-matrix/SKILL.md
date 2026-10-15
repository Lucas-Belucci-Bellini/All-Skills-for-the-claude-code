---
name: engine-render-feature-matrix
description: Build a render-backend capability matrix and define graceful feature fallbacks across supported graphics APIs and devices.
---

# engine render feature matrix

## Goal

Avoid scattered assumptions that every GPU or backend supports the same rendering features.

## Inputs to inspect

Renderer backends, target devices, shader variants, required graphics features, current capability checks, and quality settings.

## Workflow

1. List required and optional render features, including texture formats, compute operations, synchronization primitives, bindless access, MSAA, and shader-model requirements relevant to the engine.
2. Probe actual device/backend capabilities during initialization and store a structured capability profile rather than checking vendor names.
3. Assign each feature a supported path, fallback implementation, minimum hardware/software requirement, or explicit unsupported state.
4. Connect shader compilation and resource layout selection to the same capability profile so CPU and shader assumptions cannot drift.
5. Test representative capability profiles, forced fallback modes, missing feature support, and device initialization failure.

## Validation checklist

- [ ] Feature decisions use queried capabilities rather than vendor-name heuristics.
- [ ] Optional features have an identified fallback or a clear disable message.
- [ ] Shader variants are selected consistently with the CPU-side render path.
- [ ] Unsupported devices fail early with actionable diagnostics instead of crashing during a later draw.
- [ ] The supported hardware matrix is based on tested configurations and marks untested profiles honestly.

## Required output

Produce a capability table, initialization contract, fallback map, shader-variant strategy, and hardware-profile test plan.

## Boundaries and failure handling

Do not claim a backend is supported solely because it compiles; do not silently render incorrect output when a required feature is unavailable.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
