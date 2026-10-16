---
name: rust-lock-order-deadlock-audit
description: Audit multi-lock acquisition paths for inconsistent lock ordering, await-while-locked hazards, and shutdown deadlocks.
---

# Rust Lock-Order Deadlock Audit

## Goal

Make lock dependency rules explicit and testable to prevent rare deadlocks in concurrent Rust code.

## Inputs to inspect

Mutex/RwLock sites, nested lock patterns, async locks, callback paths, worker shutdown and thread/task traces.

## Workflow

1. Inventory locks by protected resource and collect every path that can hold one lock while acquiring another or awaiting work that may need it.
2. Construct a lock-order graph from observed and statically identifiable acquisitions; find cycles and note guards whose lifetime exceeds the intended critical section.
3. Inspect callbacks, error handling, logging, Drop implementations and shutdown code for hidden re-entry or reverse acquisition paths.
4. Use targeted concurrency tests, timeouts and available deadlock instrumentation to exercise competing paths under repeated scheduling and injected delays.
5. Document a global acquisition order or refactor to avoid nested locks; add assertions/reviews for new paths that would violate the rule.

## Validation checklist

- [ ] Guard lifetimes are explicit and do not unintentionally extend through awaits or callbacks.
- [ ] Any permitted nested-lock order is documented and acyclic.
- [ ] Error/shutdown paths obey the same ordering as success paths.
- [ ] Timeout-based tests distinguish a deadlock from a slow workload and report involved resources.

## Required output

A lock dependency graph, confirmed cycle list, acquisition-order policy and focused concurrency regression tests.

## Boundaries and failure handling

Do not fix a deadlock by adding arbitrary timeouts around all locks; preserve correctness and report the root synchronization cycle.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
