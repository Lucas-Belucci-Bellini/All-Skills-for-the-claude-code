---
name: ui-state-transition-invariant-testing
description: Test UI flows as explicit state transitions to catch impossible combinations, stale modals, duplicated submissions, and navigation dead ends.
---

# ui state transition invariant testing

## Goal

Keep UI behavior coherent under async loading, errors, retries, back navigation, and rapid user input.

## Inputs to inspect

Screen state model, routes, modal stack, async request states, forms, and component/integration tests.

## Workflow

1. List visible UI states and transitions, including loading, empty, success, validation error, server error, cancellation, and stale response cases.
2. Write invariants for mutually exclusive states and ownership of transient elements such as dialogs, toasts, focus, and pending requests.
3. Test transition sequences rather than isolated renders: double-submit, navigate-away-during-load, repeated back, retry-after-error, and overlapping modal requests.
4. Make async completions verify that they still belong to the active screen/request generation before mutating state.
5. Add model-based or table-driven tests for legal/illegal transition sequences and assert cleanup after unmount, cancellation, or route changes.

## Validation checklist

- [ ] A single UI instance cannot show contradictory loading/success/error states without intent.
- [ ] Stale async responses cannot overwrite newer navigation or form state.
- [ ] Critical actions are idempotent or guarded against duplicate submission.
- [ ] Modal/focus/scroll ownership is restored after close and cancellation.
- [ ] Tests assert transition behavior and visible outcome, not implementation details alone.

## Required output

Deliver a UI state transition table, invariant list, missing transition findings, regression tests, and cleanup/cancellation notes.

## Boundaries and failure handling

Do not solve every race by blocking all interactions; do not leave invisible overlays or focus traps to conceal state bugs.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
