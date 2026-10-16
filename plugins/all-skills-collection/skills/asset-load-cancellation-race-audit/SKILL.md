---
name: asset-load-cancellation-race-audit
description: "Use when asynchronous asset loading can complete after its caller cancels, switches scenes, or unloads the resource; not for generic import-cache or asset-size analysis."
---

# Asset Load Cancellation Race Audit

## Purpose

Prevent stale asynchronous completions from resurrecting unloaded assets, leaking memory, or attaching resources to the wrong scene.

## Required inputs

Asset loader API, cancellation tokens, owner/scene lifecycle, caches, resource handles, and a deterministic test scheduler or instrumentation.

## Workflow

1. Trace request creation, deduplication, cancellation, completion callback, cache insert, resource attachment, and disposal ownership.
2. Create controlled interleavings where cancellation or unload happens before, during, and immediately after I/O or decode completion.
3. Check generation/version tokens or ownership checks at completion time, not only at the start of a request.
4. Measure orphaned allocations, stale cache entries, duplicate loads, and invalid scene attachments; add regression tests for each observed race.

## Verification checklist

- [ ] A canceled request cannot publish a result into an obsolete owner or scene.
- [ ] Cancellation propagates where supported and is safe when the underlying operation cannot be interrupted.
- [ ] Resource ownership is released exactly once despite racing completion and cancellation.
- [ ] Cache state remains consistent after a failed or late completion.

## Required output

An async lifecycle diagram, interleaving test cases, leak/stale-result evidence, and targeted remediation.

## Boundaries and failure handling

Use test assets and an instrumented build. Do not introduce blocking waits into production just to hide a race.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Switching levels quickly sometimes causes the previous level's texture to appear in the new level.
- **Negative:** Measuring average texture import size without an async cancellation issue.
