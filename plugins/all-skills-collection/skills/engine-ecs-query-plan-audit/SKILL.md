---
name: engine-ecs-query-plan-audit
description: Audit entity-component-system query plans for access conflicts, iteration stability, cache behavior, and safe structural changes.
---

# Engine ECS Query Plan Audit

## Purpose

Review ECS query definitions and schedules so component access, structural mutation, and iteration semantics are explicit and testable.

## Required inputs

ECS implementation/version, component storage model, query declarations, system schedule, parallel execution rules, structural-change API, and benchmark or sanitizer output.

## Workflow

1. Identify the ECS storage model (archetype, sparse set, hybrid, or custom) and the guarantees it actually provides; do not assume behavior from another library.
2. Build a query table listing required, optional, excluded, read, and write component access for each system.
3. Compare systems scheduled concurrently and flag write/write or write/read conflicts unless the scheduler proves safe partitioning or synchronization.
4. Inspect entity creation, deletion, and component insertion/removal during iteration; verify whether structural changes are deferred, buffered, forbidden, or safely supported.
5. Check iteration-order assumptions, entity-generation handling, stale handles, and stable ordering requirements for replay or networking.
6. Measure representative query workloads with documented entity counts and component distributions; separate cold-start, steady-state, and mutation-heavy cases.
7. Propose the smallest query or schedule change, then add a regression test for the access or lifetime contract.

## Validation checklist

- [ ] Every query's read/write access is represented in the schedule's conflict model.
- [ ] Structural mutation during iteration follows documented ECS semantics.
- [ ] Stale entity handles and generation reuse have explicit tests.
- [ ] Performance claims include workload shape, build mode, and measurement method.

## Required output

A query/access matrix, schedule conflict findings, structural-mutation risks, targeted fixes, and regression cases.

## Boundaries and failure handling

Do not prescribe a storage layout without workload evidence. Distinguish a correctness defect from a performance hypothesis, and do not claim benchmark results that were not run.

## Trigger examples

- **Positive:** The task involves ECS queries, component access conflicts, archetype iteration, or safe structural mutation.
- **Negative:** The task is only about choosing an ECS library or benchmarking unrelated rendering code.
