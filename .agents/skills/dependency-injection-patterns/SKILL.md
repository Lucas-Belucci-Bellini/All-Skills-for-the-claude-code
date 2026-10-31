---
name: dependency-injection-patterns
description: "Introduces dependencies explicitly to improve testability and lifecycle control without creating a service-locator anti-pattern. Use when wiring modules, replacing hard-coded infrastructure, or configuring application startup."
---

# Dependency Injection Patterns

## Goal
Make dependencies visible, replaceable where useful, and managed with clear lifetimes.

## Workflow
1. Identify dependencies that are hard-coded, expensive, nondeterministic, or tied to external systems.
2. Prefer direct constructor or function parameters for ordinary dependencies; introduce containers only when composition complexity warrants them.
3. Define narrow contracts around volatile boundaries such as clocks, storage, network clients, and message publishers.
4. Compose concrete implementations at the application boundary, keeping business logic unaware of container APIs.
5. Specify lifetime and ownership: application singleton, request-scoped, operation-scoped, or transient; prevent shorter-lived objects from leaking into longer-lived state.
6. Make cleanup explicit for connections, tasks, files, and other resources that require disposal.
7. In tests, inject deterministic fakes or mocks at the boundary while retaining meaningful real behavior inside the unit.
8. Validate startup wiring and configuration separately from business-logic tests.
9. Watch for dependency cycles and excessive constructor arguments as signals to revisit responsibility boundaries.
10. Document defaults, overrides, and environment-specific composition without exposing secrets.

## Deliverable
- Dependency graph and composition location.
- Lifetime and resource-cleanup rules.
- Focused tests for wiring and behavior.

## Acceptance criteria
- Dependencies are discoverable from signatures or module configuration.
- Business logic does not reach into a global service locator.
- Resource lifetimes are compatible and cleanup is reliable.
- Tests replace only the boundaries that need control.

## Guardrails
- Do not add a dependency injection framework for a trivial object graph.
- Do not hide required dependencies in mutable global state.
- Do not share request-scoped mutable objects across requests.

