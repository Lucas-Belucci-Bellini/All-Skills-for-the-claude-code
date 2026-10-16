---
name: scene-restoration-subscription-cleanup
description: "Audit scene restoration and application teardown for subscriptions, observers, and callbacks retained by replaced scene state."
---

# Scene Restoration Subscription Cleanup

## Purpose

Prevent hidden updates and resource leaks when users repeatedly switch scenes, layers, or viewer instances.

## Required inputs

Scene lifecycle, subscription registrations, observer hooks, cleanup stack, and repeated restore/destroy tests.

## Workflow

1. Inventory subscriptions created during startup, layer enablement, scene restore, and UI binding.
2. Assign each subscription to a clear owner and register its unsubscription with that owner's lifecycle.
3. Test repeated restore, failed restore, switching viewer instances, and destroy during an in-flight operation.
4. Inspect listeners or callbacks after teardown and prove that old owners can no longer mutate current UI state.

## Validation checklist

- [ ] Every subscription has one owner and a deterministic release point.
- [ ] Failed partial initialization releases resources acquired before failure.
- [ ] Repeated restore does not grow listener or observer counts.
- [ ] Teardown is safe to call more than once and ignores late callbacks.

## Required output

A subscription ownership inventory, lifecycle tests, and leak report from repeated restore/destroy cycles.

## Boundaries and failure handling

Do not hide leaks by suppressing diagnostics or removing cleanup assertions.

## Trigger examples

- **Positive:** After several scene switches, old layers keep firing updates or the app slows down.
- **Negative:** A request to disable cleanup because old callbacks appear harmless.
