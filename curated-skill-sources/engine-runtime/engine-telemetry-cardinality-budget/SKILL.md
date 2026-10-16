---
name: engine-telemetry-cardinality-budget
description: Audit runtime metric labels and event dimensions to avoid unbounded telemetry cardinality and excessive profiling overhead.
---

# Engine Telemetry Cardinality Budget

## Goal

Keep engine diagnostics useful and affordable during large worlds, many entities, and long-running sessions.

## Inputs to inspect

Metric definitions, tag/label sources, entity identifiers, exporter limits, trace sampling and telemetry memory usage.

## Workflow

1. Inventory every metric/event dimension and identify labels sourced from unbounded IDs, filenames, coordinates, player names or arbitrary content values.
2. Estimate worst-case time-series/event cardinality at target population and session length, including per-frame counters and per-entity gauges.
3. Replace unbounded dimensions with bounded categories, sampled traces, top-N diagnostics or exemplars while preserving ways to locate specific failures.
4. Stress telemetry at high entity counts and trace bursts; measure CPU, allocation, buffer and exporter costs with telemetry enabled.
5. Add schema checks and budget thresholds that reject accidental new high-cardinality labels during review or CI.

## Validation checklist

- [ ] Metrics use bounded label sets; stable identifiers belong in selectively sampled traces/logs when needed.
- [ ] Telemetry overhead is measured at representative scale and under burst conditions.
- [ ] Dropped or sampled diagnostic data is visible rather than silently lost.
- [ ] Sensitive or player-provided strings do not become metric labels by default.

## Required output

A telemetry schema audit, cardinality estimates, safe labeling rules and regression guard for instrumentation growth.

## Boundaries and failure handling

Do not remove all identifying diagnostics; choose bounded aggregation plus sampled, access-controlled detail where investigation needs it.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
