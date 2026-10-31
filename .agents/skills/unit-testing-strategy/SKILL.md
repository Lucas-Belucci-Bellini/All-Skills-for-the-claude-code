---
name: unit-testing-strategy
description: "Designs focused, maintainable unit tests around observable contracts and meaningful edge cases. Use when adding behavior, fixing bugs, or deciding what should be tested at a module boundary."
---

# Unit Testing Strategy

## Goal
Use fast, deterministic tests to protect behavior that matters without coupling tests unnecessarily to implementation details.

## Workflow
1. Identify the public or module-level contract: inputs, outputs, state changes, errors, and important invariants.
2. Choose the smallest test level that can observe the behavior reliably. Keep integration and end-to-end checks for behavior that crosses real boundaries.
3. Cover the happy path, meaningful boundary values, invalid inputs, failure paths, and regressions proportionally to risk.
4. Arrange each test with explicit inputs and setup; act once; assert outcomes that a caller can observe.
5. Prefer deterministic fixtures and controlled clocks, randomness, network responses, and filesystem state where relevant.
6. Use mocks only at true external boundaries. Do not mock the unit's own logic so extensively that the test merely repeats the implementation.
7. Make assertions specific enough to catch the targeted defect, but avoid snapshots or exact internal call counts without a contract-based reason.
8. Run the focused test first, then the relevant suite. Diagnose failures rather than weakening assertions.
9. Review test names and failures: each should communicate the behavior and why it matters.

## Deliverable
- Tests grouped around behavior, not private method names.
- Reproducible setup and cleanup.
- Recorded commands and actual outcomes.

## Acceptance criteria
- Tests fail when the protected behavior is broken.
- Tests pass repeatedly in the intended environment.
- Failure cases and edge cases reflect the risk of the change.
- The suite avoids unnecessary coupling to internal implementation.

## Guardrails
- Do not claim coverage percentage proves correctness.
- Do not silently skip flaky or failing tests.
- Do not share production secrets or customer data in fixtures.
- Do not add a large test framework for a small isolated need.

