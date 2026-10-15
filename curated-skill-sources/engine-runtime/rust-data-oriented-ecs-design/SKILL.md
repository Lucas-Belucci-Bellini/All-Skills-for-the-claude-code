---
name: rust-data-oriented-ecs-design
description: Design or review ECS data layouts around access patterns, cache behavior, ownership, and measurable workload needs.
---

# Rust Data Oriented Ecs Design

## Goal

Choose an entity/component organization that follows actual system access patterns rather than adopting an ECS abstraction by fashion.

## Inputs to inspect

Core entity/component types, systems that read or write them, expected entity counts, update frequency, and performance measurements if available.

## Workflow

1. List the principal systems and classify each component as read-only, mutated, rarely accessed, or frame-critical. Include realistic workloads such as thousands of simulated entities and only a subset of active NPCs.
2. Map entity lifetime, component add/remove frequency, query shapes, and cross-component dependencies. Identify whether stable handles, contiguous iteration, or frequent structural changes dominate.
3. Compare a simple struct-of-arrays, array-of-structs, archetype, sparse-set, or hybrid layout against those access patterns. Explain trade-offs before choosing the representation.
4. Define handle-generation rules and behavior for stale entity IDs, component removal, deferred structural mutations, and iteration invalidation.
5. Implement a narrow prototype or benchmark using representative component counts and queries. Record compiler mode, hardware, data size, warm-up, repetitions, and correctness checks.

## Validation checklist

- [ ] The chosen layout directly supports observed hot queries and does not optimize only synthetic loops.
- [ ] Entity identity cannot accidentally refer to a recycled slot without generation validation.
- [ ] Structural changes during iteration have a defined deferred or invalidation policy.
- [ ] Benchmarks compare equivalent semantics and report variance, not only a single best run.
- [ ] The design includes a clear escape hatch for rare or dynamically shaped components.

## Required output

Deliver a component-access matrix, proposed data layout, entity lifecycle rules, migration steps, and benchmark plan/results. Separate measured improvements from hypotheses.

## Boundaries and failure handling

Do not introduce a full ECS framework for a tiny project without a demonstrated need; do not make cache-performance claims without measurements.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
