---
name: engine-subsystem-readiness-contract-test
description: Test that each subsystem reports ready only after its declared prerequisites, data, worker services, and fallback paths are usable.
---

# Engine Subsystem Readiness Contract Test

## Goal

Prevent partially initialized systems from advertising capabilities that callers cannot safely use.

## Inputs to inspect

Subsystem lifecycle states, dependency declarations, readiness APIs, lazy initialization, failure handling and integration test fixtures.

## Workflow

1. For each subsystem, enumerate prerequisites and define the exact capability guarantees associated with constructed, starting, ready, degraded and failed states.
2. Create tests that query readiness before initialization, during each dependency stage, after optional failure and after retry/restart.
3. Exercise concurrent callers during initialization and verify they either wait within a deadline, receive a documented unavailable result or use a declared fallback.
4. Validate dependent subsystems cannot advance past readiness gates while a required prerequisite is incomplete or has changed generation.
5. Add transition assertions and a small startup integration test that confirms published readiness matches actual usable capabilities.

## Validation checklist

- [ ] Readiness is capability-based, not merely a boolean set when a constructor returns.
- [ ] Required and optional dependencies have different, explicit outcomes.
- [ ] Concurrent initialization cannot publish inconsistent partially initialized state.
- [ ] A failed or restarted dependency invalidates dependent readiness when appropriate.

## Required output

A readiness-state table, transition tests, dependency failure coverage and a documented contract for callers.

## Boundaries and failure handling

Do not block every caller indefinitely while starting; readiness APIs need deadlines or nonblocking unavailable semantics.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
