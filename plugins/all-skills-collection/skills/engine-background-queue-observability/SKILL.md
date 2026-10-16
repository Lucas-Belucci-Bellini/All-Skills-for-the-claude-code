---
name: engine-background-queue-observability
description: Instrument background-work queues with queue depth, oldest-item age, enqueue/dequeue rate, wait time, and completion outcomes.
---

# Engine Background Queue Observability

## Goal

Make hidden accumulation and stalled work visible before it causes frame misses, stale state or memory growth.

## Inputs to inspect

Engine job queues, request producers/consumers, task classes, worker counts, cancellation and queue telemetry export.

## Workflow

1. Inventory queues and describe their item identity, owner, capacity, priority, expected service time, cancellation semantics and overload policy.
2. Choose bounded metric dimensions and record queue depth, oldest-item age, arrivals, completions, retries, cancellations and terminal failures per task class.
3. Stress steady load, burst load, slow consumers and failed workers to validate that metrics distinguish high throughput from growing backlog.
4. Correlate queue metrics with frame/tick deadlines and memory high-water marks without relying only on average queue size.
5. Add alerts or debug thresholds for persistent age/depth growth, and verify the diagnostic path remains bounded when queues are saturated.

## Validation checklist

- [ ] Every important queue has a known capacity or a documented reason for being unbounded.
- [ ] Oldest-item age is visible so a small but stuck queue is not hidden by average depth.
- [ ] Metric labels are bounded and avoid per-task IDs or arbitrary content strings.
- [ ] Dropped or rejected telemetry is itself observable.

## Required output

A queue inventory, metric schema, saturation traces and thresholds for detecting accumulating background work.

## Boundaries and failure handling

Do not respond to a growing queue by increasing capacity alone; establish whether the producer rate exceeds service capacity or a consumer is stalled.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
