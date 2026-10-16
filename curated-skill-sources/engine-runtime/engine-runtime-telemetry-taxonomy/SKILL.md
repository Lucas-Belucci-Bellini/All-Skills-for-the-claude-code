---
name: engine-runtime-telemetry-taxonomy
description: Standardize engine runtime metrics, units, sampling windows, labels, and alert thresholds across simulation, rendering, streaming, and memory.
---

# Engine Runtime Telemetry Taxonomy

## Goal

Make performance regressions diagnosable and comparable across builds without unbounded telemetry overhead.

## Inputs to inspect

Existing profiler counters, frame/tick metrics, job queues, memory subsystems, log conventions, and benchmark goals.

## Workflow

1. Inventory current metrics and map each to an operational question, unit, sampling window, aggregation, and owning subsystem.
2. Define consistent names/units for frame and tick time, queue wait, resource upload, chunk readiness, allocations, memory residency, and failure rates where relevant.
3. Separate high-cardinality debug labels from low-cardinality dashboards; bound per-entity or per-resource telemetry in production.
4. Choose sampling/aggregation and thresholds aligned with workload and platform tiers; include tail latency and saturation rather than averages only.
5. Validate instrumentation overhead and compare metric output across a baseline workload, a deliberate slowdown, and a fault scenario.

## Validation checklist

- [ ] Metric names and units have a consistent schema.
- [ ] High-cardinality labels cannot create unbounded memory/cost in production telemetry.
- [ ] Instrumentation overhead is measured and kept within an agreed budget.
- [ ] Thresholds use representative distributions and platform context.
- [ ] Every key metric has a clear owner and documented diagnostic action.

## Required output

Deliver a metric taxonomy, unit/label conventions, dashboard/threshold proposal, overhead measurements, and fault-scenario validation.

## Boundaries and failure handling

Do not emit per-entity metrics without limits; do not alert on an average that conceals persistent tail-latency failures.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
