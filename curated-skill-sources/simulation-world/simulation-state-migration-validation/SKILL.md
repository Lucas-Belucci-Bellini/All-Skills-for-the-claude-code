---
name: simulation-state-migration-validation
description: Validate migrations of persisted simulation state, including entity components, event queues, NPC memory, economy ledgers, and world-clock semantics.
---

# Simulation State Migration Validation

## Goal

Ensure new simulation versions can load previous saves without duplicating effects, losing authoritative facts, or creating invalid entity states.

## Inputs to inspect

Save schema versions, migration functions, old-world fixtures, component registries, stable IDs, resource ledgers and migration logs.

## Workflow

1. Inventory persisted state by schema owner and version, distinguishing authoritative data from reconstructible caches and derived systems.
2. Create fixtures representing supported prior versions, edge cases and partially missing optional fields; record expected invariants after migration.
3. Run migrations in a disposable copy and validate references, ownership uniqueness, inventory/resource conservation, schedule/time semantics and queued-event identities.
4. Inject invalid fields, unknown component versions and migration failure mid-way; verify the original save remains preserved and the outcome is explicit.
5. Add compatibility tests and a migration report that states transformed, defaulted, dropped and unsupported fields with a clear policy for forward-version saves.

## Validation checklist

- [ ] Migration is idempotent or protected against accidental repeated application.
- [ ] Stable entity/resource identity is preserved where schema semantics require it.
- [ ] Unknown/future versions fail safely rather than being rewritten as current.
- [ ] Failed migrations do not overwrite the only original save copy.

## Required output

A version-to-version migration matrix, fixture corpus, invariant report and tested recovery behavior for migration failures.

## Boundaries and failure handling

Do not silently default away unknown authoritative state; use explicit migration rules and preserve original input on failure.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
