---
name: engine-resource-hot-reload-atomicity
description: Validate that hot reload replaces resources atomically and rolls back safely when parsing, compilation, dependency resolution, or GPU upload fails.
---

# Engine Resource Hot-Reload Atomicity

## Goal

Avoid half-updated resource graphs where some consumers reference the new version while others still depend on the old version.

## Inputs to inspect

Resource loader, dependency graph, version handles, shader/asset compilers, publication logic and fallback policy.

## Workflow

1. Trace hot reload from source-change detection through dependency rebuild, validation, GPU upload, consumer publication and retirement of the previous version.
2. Define a staging/version model where consumers see either a complete prior version or a validated new version, never a partially constructed mixture.
3. Inject failures at parse, dependency resolution, compile, upload and publication stages; inspect which references change and whether the prior usable resource remains intact.
4. Test concurrent reload requests, changes during compilation, dependent-resource reload ordering and consumers holding old handles across multiple frames.
5. Add generation tags and a regression test proving failed updates preserve the last known-good resource and eventually retire unused versions.

## Validation checklist

- [ ] Publication happens only after required dependencies and resources pass validation.
- [ ] Failure leaves a usable version or an explicit unavailable state, not a mixed graph.
- [ ] Concurrent changes cannot publish an older build after a newer source generation has been observed.
- [ ] Old resources remain alive until CPU/GPU consumers release them according to the engine lifetime contract.

## Required output

A reload state diagram, failure-injection table, last-known-good verification and version-retirement checks.

## Boundaries and failure handling

Do not delete the prior resource before the replacement has passed validation and dependent consumers can safely switch.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
