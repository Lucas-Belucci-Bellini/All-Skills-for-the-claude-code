---
name: engine-background-io-batching
description: Review background I/O batching and concurrency for asset streaming, save regions, telemetry flushes, and other engine disk operations.
---

# Engine Background I/O Batching

## Goal

Reduce avoidable I/O overhead without creating long tail latency, memory spikes, or priority inversion for important reads/writes.

## Inputs to inspect

I/O request queue, file access patterns, batch size, storage targets, deadline/priority classes and completion metrics.

## Workflow

1. Inventory I/O types, request sizes, access locality, durability requirements, cancellation semantics and latency sensitivity.
2. Measure syscall/request count, bytes per operation, queue age, throughput and p95/p99 completion time before changing batching policy.
3. Test small latency-critical reads alongside large sequential transfers, save writes, many small assets and storage throttling.
4. Compare bounded coalescing, per-priority queues, concurrency caps and flush policies; preserve ordering/durability requirements for save transactions.
5. Add telemetry for batch formation, queue wait, service time, bytes processed and starvation across request classes.

## Validation checklist

- [ ] Batching never reorders operations whose persistence or dependency contract requires order.
- [ ] Small urgent reads are not trapped behind an unbounded batch of background work.
- [ ] Buffers and in-flight requests have explicit memory and concurrency limits.
- [ ] Performance is evaluated separately for throughput and tail latency.

## Required output

An I/O request classification, before/after batch metrics, priority policy and regression workload for mixed storage demand.

## Boundaries and failure handling

Do not batch save writes across commit boundaries or delay durability-sensitive flushes without an explicit, tested contract.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
