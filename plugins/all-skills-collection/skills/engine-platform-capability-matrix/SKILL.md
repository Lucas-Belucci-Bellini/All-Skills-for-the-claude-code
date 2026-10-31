---
name: engine-platform-capability-matrix
description: Map platform and graphics-backend capabilities to explicit feature gates, fallbacks, and test coverage for an engine release.
---

# Engine Platform Capability Matrix

## Goal

Prevent accidental reliance on optional platform features and make fallback behavior testable across targets.

## Inputs to inspect

Supported OS/CPU/GPU targets, graphics APIs and versions, driver requirements, feature flags, input/audio/filesystem/network constraints, and release support policy.

## Workflow

1. List supported targets using explicit OS version, CPU architecture, graphics backend, minimum driver/runtime, and packaging format; separate supported, experimental, and unsupported targets.
2. Inventory each engine feature's hard requirements, optional capabilities, memory/performance assumptions, and known backend-specific constraints.
3. Map capabilities to detection mechanisms and versioned runtime checks. Do not infer support from vendor names or marketing labels when an actual feature query is available.
4. Define fallback behavior for missing optional features, including visual or quality differences, performance implications, and any features that must fail closed.
5. Build a matrix of representative target combinations and prioritize coverage by user impact, release risk, and architectural differences rather than testing only the developer machine.
6. Add startup diagnostics that report detected capabilities and chosen fallbacks without exposing sensitive system data.
7. Review the matrix whenever a backend, SDK, minimum OS, GPU requirement, or packaging target changes.

## Validation checklist

- [ ] Every optional feature has a detection rule and documented fallback or explicit unsupported state.
- [ ] Target support claims are tied to a defined test or validation source.
- [ ] CI coverage distinguishes compile checks, automated runtime checks, and manual hardware validation.
- [ ] Fallback paths are tested rather than merely documented.

## Required output

A platform-capability matrix, feature-gate rules, fallback specifications, and a risk-ranked validation plan.

## Boundaries and failure handling

Do not promise support for hardware or operating systems that were not tested or explicitly qualified. Label emulation and software-rendering results separately from native hardware.

When repository evidence is incomplete, label the gap and request only information that changes the decision. Do not claim tests, benchmarks, hardware validation, or runtime checks passed unless their outputs were observed.
