---
name: engine-render-resource-lifetime
description: Trace GPU resource ownership and retirement across frames to prevent use-after-free, leaks, and synchronization stalls.
---

# engine render resource lifetime

## Goal

Give render resources an explicit lifecycle from creation through submission, last use, retirement, and destruction.

## Inputs to inspect

Renderer abstraction, command submission model, handles/descriptors, frame-in-flight count, upload paths, and shutdown logic.

## Workflow

1. Inventory GPU resources and the object that owns each allocation: buffers, textures, views, descriptors, pipelines, and temporary upload staging data.
2. Trace references through recording, submission, and completion. Identify which fence, timeline value, frame index, or backend guarantee proves that a resource is no longer in use.
3. Choose explicit lifetime states and retirement queues. Handle replacement, resize, device loss, cancelled uploads, and shutdown without destroying resources still referenced by in-flight work.
4. Review handles for stale references and double destruction. Prefer generation-checked handles or centralized ownership when those mechanisms fit the engine's design.
5. Create stress tests for rapid asset reload, window resize, scene teardown, and repeated creation/destruction; use backend validation layers where available.

## Validation checklist

- [ ] Every resource has one documented owner or explicit shared-ownership rule.
- [ ] Destruction waits for the backend's actual last-use completion condition.
- [ ] Replacement and failed creation paths release temporary resources without invalidating prior working resources.
- [ ] Shutdown drains or safely abandons pending work according to documented device/context rules.
- [ ] Validation-layer evidence is distinguished from static reasoning when unavailable.

## Required output

Create a resource lifecycle map, ownership table, identified lifetime hazards, minimal correction plan, and repeatable stress-test procedure.

## Boundaries and failure handling

Do not assume a CPU handle going out of scope means the GPU has finished using the allocation; do not introduce global leaks as a substitute for correct retirement.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
