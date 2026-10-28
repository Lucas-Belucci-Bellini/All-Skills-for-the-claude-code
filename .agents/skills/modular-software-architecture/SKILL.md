---
name: modular-software-architecture
description: "Designs module boundaries, dependency direction, and explicit interfaces for maintainable software. Use when splitting a growing codebase into modules, packages, plugins, or layers."
---

# Modular Software Architecture

## Goal
Create modules with clear ownership, high internal cohesion, and limited, intentional coupling.

## Workflow
1. Map the major use cases, data ownership, runtime boundaries, and areas that change for different reasons.
2. Group related behavior and invariants together; avoid splitting a single cohesive operation across many tiny modules.
3. Define each module's responsibility, public interface, owned state, allowed dependencies, and error contract.
4. Choose a dependency direction that keeps domain rules independent of volatile infrastructure where practical.
5. Detect cycles and hidden coupling through shared mutable state, global registries, import side effects, or undocumented ordering assumptions.
6. Separate compile-time/package boundaries from runtime/service boundaries; use distributed services only when deployment or isolation needs justify the cost.
7. Define how configuration, events, transactions, and cross-module failures are handled.
8. Add architecture tests or dependency checks when they can enforce critical boundaries automatically.
9. Plan incremental extraction: preserve behavior, migrate callers in small batches, and avoid a large rewrite without a measured need.
10. Document rejected alternatives and the trade-offs in complexity, latency, reliability, and team ownership.

## Deliverable
- Module map and dependency rules.
- Public contracts and ownership boundaries.
- Incremental migration plan and validation approach.

## Acceptance criteria
- Dependencies are explicit and acyclic where intended.
- State ownership and error propagation are understandable.
- Modules can be tested independently at their declared boundary.
- The architecture avoids unnecessary services and abstractions.

## Guardrails
- Do not split a monolith into microservices merely because it has modules.
- Do not introduce a shared "common" module that becomes a dependency dumping ground.
- Do not duplicate domain rules across modules without an explicit consistency strategy.

