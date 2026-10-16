---
name: engine-span-correlation-validation
description: Validate trace/span parentage and correlation IDs across engine threads, async tasks, resource loads, and subsystem boundaries.
---

# Engine Span Correlation Validation

## Goal

Ensure distributed runtime traces preserve causal lineage so a slow frame or request can be traced through asynchronous work.

## Inputs to inspect

Tracing APIs, span creation sites, job/task IDs, thread handoffs, resource requests and exported trace samples.

## Workflow

1. Map operations that should form one causal chain and specify root, parent, link and child span semantics for each asynchronous boundary.
2. Inspect propagation through worker queues, futures, callbacks, GPU submission markers and resource completion notifications; identify correlation IDs that are dropped or reused.
3. Generate traces for successful, failed, cancelled and retried operations, checking for orphan spans, invalid parentage and spans that outlive their logical owner unexpectedly.
4. Measure span volume and propagation overhead under high task counts; use bounded sampling for very high-frequency paths.
5. Add trace-fixture checks for core workflows and document how a user can find the root request/frame from a downstream slow event.

## Validation checklist

- [ ] IDs are unique within their declared scope and not accidentally recycled while events remain buffered.
- [ ] Async continuations preserve causal links without inventing a false synchronous parent relationship.
- [ ] Cancellation/error endings are represented consistently and missing spans are diagnosable.
- [ ] Instrumentation remains bounded at target event volume.

## Required output

A correlation propagation map, trace samples, orphan/misparented span findings and automated trace-shape checks.

## Boundaries and failure handling

Do not infer causality only from timestamps; explicit context propagation and dependency evidence are required.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
