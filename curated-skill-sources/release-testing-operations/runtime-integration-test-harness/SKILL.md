---
name: runtime-integration-test-harness
description: Design an integration-test harness that validates real subsystem boundaries, startup dependencies, persistence, and teardown without relying solely on mocks.
---

# Runtime Integration Test Harness

## Goal

Provide repeatable end-to-end confidence that engine/runtime subsystems work together under supported configurations.

## Inputs to inspect

Subsystem interfaces, startup/shutdown lifecycle, fixture builders, test environments, persistence adapters and current CI workflows.

## Workflow

1. Map the critical user-visible paths across subsystem boundaries and identify which dependencies must be real versus replaceable test doubles.
2. Define deterministic fixture setup and cleanup, including world/scene state, temp storage, worker pools, clocks and random seeds.
3. Exercise success, missing dependency, timeout, partial initialization, cancellation, persistence failure and teardown scenarios using bounded execution deadlines.
4. Capture the minimum diagnostics needed for failures: build identity, effective redacted config, fixture seed, subsystem state and correlated event window.
5. Add a small fast smoke suite plus deeper integration suites selected by risk; verify tests do not share mutable global state or rely on order.

## Validation checklist

- [ ] The harness exercises actual contract boundaries and does not mock away the behavior it claims to validate.
- [ ] Every test has bounded setup/teardown and reports leaked tasks, resources or temp artifacts.
- [ ] Failure diagnostics are reproducible and redact secrets.
- [ ] Parallel test execution does not cause cross-test state contamination.

## Required output

An integration coverage map, fixture lifecycle contract, smoke/full suite split and example failure evidence bundle.

## Boundaries and failure handling

Do not label a mocked unit test as an integration test; name the boundary exercised and document remaining external dependencies.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
