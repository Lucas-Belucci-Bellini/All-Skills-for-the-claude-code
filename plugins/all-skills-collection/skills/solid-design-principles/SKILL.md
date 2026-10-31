---
name: solid-design-principles
description: "Applies SOLID principles pragmatically to improve cohesion, extension points, and testability. Use when designing classes or modules, extracting responsibilities, or evaluating an abstraction that may be overcomplicated."
---

# SOLID Design Principles

## Goal
Use SOLID as a set of design heuristics to reduce change risk, not as a requirement to maximize interfaces or class count.

## Workflow
1. Identify the behavior that changes, the consumers that depend on it, and the boundaries that should remain stable.
2. **Single Responsibility:** group code around one cohesive reason to change; separate responsibilities only when their change patterns or ownership genuinely differ.
3. **Open/Closed:** prefer stable extension points when new variants are expected; do not introduce plugin abstractions for hypothetical future needs.
4. **Liskov Substitution:** ensure implementations honor the promises of their contracts, including valid inputs, postconditions, errors, and invariants.
5. **Interface Segregation:** expose the smallest useful contract to each consumer; avoid forcing callers to depend on unrelated operations.
6. **Dependency Inversion:** place volatile or external details behind contracts when this improves testability or isolates policy from infrastructure.
7. Compare the proposed design with a simpler alternative. Estimate the cost of indirection, configuration, and maintenance.
8. Validate with focused tests and inspect callers to ensure behavior and public contracts remain consistent.
9. Explain which principle addresses which concrete change pressure and why the chosen abstraction is proportionate.

## Deliverable
- Responsibilities and dependency boundaries.
- Proposed structure with trade-offs.
- Tests or checks run and remaining risks.

## Acceptance criteria
- Each abstraction solves a demonstrated problem.
- Contracts are coherent and implementations substitutable.
- Tests can exercise core behavior without unnecessary infrastructure.
- Complexity added is justified by expected change patterns.

## Guardrails
- Do not turn every class into an interface by default.
- Do not use SOLID terminology as a substitute for explaining trade-offs.
- Do not break public contracts while extracting responsibilities.

