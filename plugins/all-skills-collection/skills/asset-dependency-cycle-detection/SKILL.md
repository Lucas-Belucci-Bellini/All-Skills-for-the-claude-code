---
name: asset-dependency-cycle-detection
description: Detect cyclic and invalid references in asset graphs before import, bundling, hot reload, or runtime loading.
---

# Asset Dependency Cycle Detection

## Goal

Ensure content dependencies are resolvable and loadable without recursive import loops, opaque ordering failures or accidental bundle expansion.

## Inputs to inspect

Asset references, scene/prefab/material graphs, scripts and data-driven registries, import metadata, and bundle dependency output.

## Workflow

1. Extract direct and transitive references from all supported asset types into a graph whose node IDs are stable asset identifiers rather than raw display names.
2. Classify edges by dependency semantics (hard runtime, soft/optional, editor-only, build-time or reverse reference) before deciding whether a cycle is invalid.
3. Run cycle detection and strongly connected component analysis; report a minimal cycle path with edge types and source-file locations.
4. Test renamed/missing targets, case-sensitive paths, platform-specific assets and dynamically resolved references that cannot be represented as static edges.
5. Define how allowed cycles are initialized or broken, then add graph checks to import/package validation and verify bundle dependency closure.

## Validation checklist

- [ ] Every hard dependency resolves to a known asset or fails with a precise diagnostic.
- [ ] Cycles are evaluated according to edge semantics rather than blanket-rejected without context.
- [ ] Diagnostics provide a shortest actionable path through the cycle and identify originating references.
- [ ] Bundle closure includes required runtime dependencies but excludes editor-only references where appropriate.

## Required output

An asset dependency graph, cycle/invalid-reference report, allowed-cycle policy, and an import/build validation gate.

## Boundaries and failure handling

Do not break a cycle by deleting references automatically; determine whether the graph represents an actual ownership/design defect or a supported two-phase load.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
