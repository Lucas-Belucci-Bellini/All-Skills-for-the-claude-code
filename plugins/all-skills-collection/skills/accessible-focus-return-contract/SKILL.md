---
name: accessible-focus-return-contract
description: "Validate focus placement, containment and restoration across dialogs, popovers, route transitions and removed controls; not a general accessibility smoke test."
---

# Accessible Focus Return Contract

## Purpose

Keep keyboard focus predictable whenever an interaction opens, closes, replaces or removes a UI region.

## Required inputs

Critical interaction flows, component implementation, expected focus origin, overlay semantics and supported input methods.

## Workflow

1. Enumerate interactions that move focus: opening modal content, closing overlays, changing routes, submitting forms and removing the focused control.
2. Define the expected initial target, tab containment rules where required, Escape/cancel behavior and destination after dismissal.
3. Specify a fallback when the original trigger no longer exists or is hidden; do not send focus to an arbitrary location.
4. Test keyboard and programmatic opening, nested overlays, validation failure, route navigation and repeated open/close cycles.
5. Verify the active element is visible, operable and announced coherently by supported assistive technology.

## Validation checklist

- [ ] Opening an overlay moves focus to an intentional target.
- [ ] Modal focus stays within the modal until dismissal where required.
- [ ] Closing restores focus to the trigger or a documented fallback.
- [ ] Removing a focused element moves focus to a meaningful successor.
- [ ] No transition silently loses focus to the document body.

## Required output

A focus-transition table, reproducible failures, expected-target rules and regression tests.

## Boundaries and failure handling

Do not trap focus on non-modal content without a clear contract. Do not claim assistive-technology verification when only DOM assertions ran. If the expected destination is ambiguous, report that decision as unresolved.

## Trigger examples

- **Positive:** Closing a product dialog should restore focus to the button that opened it.
- **Negative:** Checking field labels without investigating focus movement.
