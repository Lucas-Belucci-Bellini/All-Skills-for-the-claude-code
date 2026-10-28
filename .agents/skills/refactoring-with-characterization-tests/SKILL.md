---
name: refactoring-with-characterization-tests
description: "Refactors existing code while preserving its externally observable behavior through characterization tests and incremental checks. Use when simplifying legacy modules, extracting responsibilities, or changing internal structure without an approved behavior change."
---

# Refactoring with Characterization Tests

## Goal
Improve internal structure without accidentally changing behavior relied on by callers.

## Workflow
1. **Define the boundary.** Identify the module, public interfaces, callers, persisted formats, side effects, timing assumptions, and error behavior in scope.
2. **Record current behavior.** Read existing tests and add characterization tests for important observed behavior, including awkward edge cases that callers may depend on.
3. **Separate contract from defect.** Mark behavior that must remain stable separately from suspected bugs. Do not silently fix a bug during a behavior-preserving refactor.
4. **Establish a baseline.** Run the relevant tests and record existing failures before editing. Do not attribute pre-existing failures to the refactor.
5. **Refactor in small steps.** Make one structural move at a time: extract a function, clarify a name, isolate a dependency, or reduce duplication. Keep each step reviewable.
6. **Check after each step.** Run the smallest meaningful test set after each structural change. Inspect public signatures, serialized data, ordering, exceptions, and side effects.
7. **Compare behavior.** Add contract tests or differential checks where practical. Ensure mocks do not erase the behavior the refactor is meant to preserve.
8. **Review the diff.** Remove accidental formatting churn, dead compatibility paths, unrelated fixes, and temporary instrumentation.
9. **Report the boundary.** State what structure changed, what behavior was intentionally preserved, what tests ran, and any behavior that remains uncertain.

## Deliverable
- A brief statement of the original and new structure.
- Characterization tests for relevant observable behavior.
- Verification results and any known baseline failures.
- Explicitly separated follow-up bug fixes, if discovered.

## Acceptance criteria
- Public behavior remains consistent within the declared boundary.
- Relevant tests pass, or failures are accurately reported against the baseline.
- The change improves structure without introducing unnecessary abstraction.
- Any intentional behavior change is separately specified and tested.

## Failure modes and guardrails
- Do not mix refactoring with feature work unless the request explicitly combines them.
- Do not delete a test solely because it exposes an inconvenient legacy behavior.
- Do not assume implementation details are irrelevant if callers can observe them.
- Do not claim equivalence based only on compilation or a passing happy-path test.
- Do not merge or deploy without explicit authorization.
