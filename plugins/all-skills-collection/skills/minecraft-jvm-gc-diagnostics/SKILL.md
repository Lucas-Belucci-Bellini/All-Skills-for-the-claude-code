---
name: minecraft-jvm-gc-diagnostics
description: Diagnose Java garbage-collection pauses and heap pressure in modded Minecraft using GC logs, allocation behavior, and workload context.
---

# minecraft jvm gc diagnostics

## Goal

Separate insufficient heap, high allocation churn, retained memory, and long-pause causes before changing JVM flags.

## Inputs to inspect

Java version, heap arguments, GC logs, modpack version, memory graphs, player workload, and crash/OOM logs.

## Workflow

1. Record the exact Java build, collector, initial/max heap, container/OS memory limits, and when pauses or out-of-memory errors occur.
2. Enable or collect supported GC telemetry and correlate pause duration with tick/frame symptoms, allocation rate, heap occupancy, and concurrent CPU activity.
3. Distinguish a heap that fills temporarily, one that remains occupied after major collections, excessive allocation churn, and native/off-heap memory pressure.
4. Reproduce the same workload in a staging world while changing only one relevant variable, such as heap ceiling or an allocation-producing subsystem.
5. Compare latency percentiles, GC frequency, post-collection occupancy, process memory, and server TPS; keep a rollback command line.

## Validation checklist

- [ ] Heap size is not set without regard to system/container memory limits.
- [ ] GC log observations are tied to the exact Java version and collector.
- [ ] Post-collection occupancy and allocation rate are analyzed, not just peak heap used.
- [ ] GC tuning is not used to hide a leak or CPU-bound tick loop.
- [ ] Before/after tests use comparable exploration and automation workloads.

## Required output

Deliver a GC diagnosis with evidence, memory/tick timeline, candidate causes, tested JVM/config changes, and rollback instructions.

## Boundaries and failure handling

Do not recommend copying random JVM flag bundles; do not treat all process memory as Java heap.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
