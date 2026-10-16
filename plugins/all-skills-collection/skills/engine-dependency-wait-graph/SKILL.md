---
name: engine-dependency-wait-graph
description: Construct and analyze wait-for graphs across engine jobs, locks, resource dependencies, and subsystem readiness gates.
---

# Engine Dependency Wait Graph

## Goal

Distinguish deadlock, starvation and legitimate dependency delay by showing which tasks or resources are waiting on one another.

## Inputs to inspect

Job dependency metadata, lock instrumentation, wait states, subsystem initialization barriers, timeout logs and runtime traces.

## Workflow

1. Collect wait edges for task-to-task dependencies, task-to-lock ownership, resource readiness and subsystem barriers, recording owner IDs and elapsed wait time.
2. Build a graph from a reproducible stall or timeout window and classify cycles, long chains, repeated waiters and resources with no live producer.
3. Check whether waits cross scheduler pools or require work queued behind the waiting task, creating thread-pool starvation without a literal lock cycle.
4. Replay the minimal scenario with injected delays/failures to distinguish deadlock from slow work or a missing completion signal.
5. Add debug dumps and targeted alerts for persistent cycles, expired owners and dependencies whose producer has terminated.

## Validation checklist

- [ ] Graph edges include ownership and lifecycle state, not only matching resource names.
- [ ] A missing producer is distinguished from a slow producer still running.
- [ ] Detection overhead is bounded and disabled or sampled appropriately in release builds.
- [ ] Recovery actions do not break required ordering or destroy resources still referenced by waiters.

## Required output

A wait-for graph, stall classification, minimal reproduction and diagnostic instrumentation for the implicated scheduler/resources.

## Boundaries and failure handling

Do not auto-break every detected cycle by cancelling arbitrary work; classify the dependency contract and side-effect state first.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
