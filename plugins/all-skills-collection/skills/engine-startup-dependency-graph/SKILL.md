---
name: engine-startup-dependency-graph
description: Map engine startup dependencies and initialization failures to make subsystem order explicit and recoverable.
---

# Engine Startup Dependency Graph

## Goal

Prevent order-dependent initialization bugs and vague startup failures as renderer, world, plugins, and services grow.

## Inputs to inspect

Application entrypoint, subsystem constructors, plugin registration, asset services, renderer/device setup, and shutdown flow.

## Workflow

1. Inventory startup-created services and identify hard dependencies versus optional capabilities for each subsystem.
2. Construct a directed dependency graph from actual call paths and registrations; detect cycles, hidden global initialization, and dependencies on undocumented side effects.
3. Define initialization stages with explicit readiness results and actionable failure ownership; keep optional features from blocking unrelated core startup where safe.
4. Verify teardown order is the reverse of dependency ownership where required, including partial initialization failure and device/service startup errors.
5. Add tests for missing dependencies, reordered initialization, optional subsystem failure, repeated startup/shutdown, and deterministic diagnostics.

## Validation checklist

- [ ] Every critical subsystem's prerequisites are explicit.
- [ ] Cycles and reliance on global side effects are documented or removed.
- [ ] Failure identifies the subsystem and missing dependency rather than a generic null access later.
- [ ] Partial initialization releases owned resources safely.
- [ ] Optional capability failure has a deliberate degraded mode or clear fatal policy.

## Required output

Deliver a startup dependency graph, cycle/hidden dependency findings, stage contract, teardown notes, and failure-injection tests.

## Boundaries and failure handling

Do not reorder constructors blindly; do not hide missing required dependencies by silently continuing with invalid state.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
