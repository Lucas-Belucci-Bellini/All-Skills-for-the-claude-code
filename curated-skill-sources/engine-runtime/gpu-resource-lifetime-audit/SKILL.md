---
name: gpu-resource-lifetime-audit
description: Audit GPU resource creation, ownership, synchronization, and destruction to catch leaks and use-after-free defects.
---

# GPU Resource Lifetime Audit

## Goal

Prove that GPU resources outlive their submitted work and are released only after every relevant queue has finished using them.

## Inputs to inspect

GPU buffer/texture wrappers, command submission paths, frame-in-flight policy, descriptor heaps, fences/timeline semaphores, and shutdown/reload code.

## Workflow

1. Map each resource from creation through owner transfer, descriptor/view creation, command recording, submission, replacement, and final destruction.
2. Identify deferred destruction requirements for each queue; distinguish CPU handle release from actual GPU completion and reclamation.
3. Inspect resize, device-loss, hot-reload, cancellation, and early-return paths for leaked handles, double release, stale descriptors, or resources reclaimed too early.
4. Run validation layers and stress repeated create/destroy, scene reload, resize, and shutdown while recording live-object counts and fence values.
5. Implement a narrow retirement queue or RAII ownership contract where the evidence requires it, then add a regression test around the shortest failing lifetime.

## Validation checklist

- [ ] Every allocation has one documented owner and a single logical destruction path.
- [ ] Submitted work cannot reference a resource after its retirement fence has completed.
- [ ] Views/descriptors are invalidated or retired consistently with their underlying resources.
- [ ] Device-loss and shutdown paths do not wait forever or free objects while work is in flight.

## Required output

A resource-lifetime map, confirmed findings, live-object/fence evidence, and regression coverage for any fixed defects.

## Boundaries and failure handling

Do not assume Rust/C++ scope exit or reference counting alone proves GPU completion; synchronization semantics must be verified against the graphics API in use.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
