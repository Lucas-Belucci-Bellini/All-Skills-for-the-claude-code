---
name: rust-test-fixture-isolation
description: Make Rust tests deterministic by isolating filesystem, environment variables, clocks, ports, global state, and shared resources.
---

# Rust Test Fixture Isolation

## Goal

Reduce flaky tests caused by hidden environmental coupling and order-dependent state.

## Inputs to inspect

Failing tests, shared test helpers, filesystem/network usage, env vars, static state, and CI parallelism.

## Workflow

1. Inventory environmental inputs and shared mutable resources used by the test: temp paths, env vars, ports, process globals, clocks, randomness, and external services.
2. Give each test unique temporary resources and explicit cleanup/RAII ownership; scope environment mutation and restore prior values.
3. Replace real time and unseeded randomness with injectable clock/seed abstractions where the behavior under test allows it.
4. Choose ephemeral local ports or deterministic in-process substitutes; avoid assuming a resource is free between check and bind.
5. Run the focused test alone, shuffled, parallelized, repeated, and under CI-like constraints; retain the minimal reproducer for failures.

## Validation checklist

- [ ] Tests do not assume global environment state or fixed temp names.
- [ ] Cleanup runs on panic/failure as well as success.
- [ ] Randomized tests report seeds and can replay them.
- [ ] Parallel execution does not cause shared-port or shared-file conflicts.
- [ ] External service dependence is explicit and can be isolated or stubbed safely.

## Required output

Produce a fixture dependency inventory, isolation refactor, reproducible flake tests, and documented environmental requirements.

## Boundaries and failure handling

Do not hide flaky tests by disabling parallelism permanently unless concurrency is itself outside the supported contract; do not rely on best-effort cleanup only.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
