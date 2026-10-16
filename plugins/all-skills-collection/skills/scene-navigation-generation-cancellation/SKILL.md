---
name: scene-navigation-generation-cancellation
description: "Use navigation generations or cancellation tokens to prevent stale map loads from overwriting a newer scene."
---

# Scene Navigation Generation Cancellation

## Purpose

Make rapid map navigation and search races deterministic when data, terrain, or place lookup resolves out of order.

## Required inputs

Navigation controller, async request owners, cancellation mechanism, scene state model, and delayed-response fixtures.

## Workflow

1. Identify every async operation started by a navigation action and tag it with the current generation.
2. Specify which newer actions supersede previous operations and which shared requests may continue safely.
3. Force response order to differ from request order using controlled promises and provider fakes.
4. Assert that only the current generation may commit camera, selection, source, or viewport updates.

## Validation checklist

- [ ] A stale generation cannot mutate the current scene.
- [ ] Cancellation is propagated to owned network requests when supported.
- [ ] Shared cache fills may complete only if they cannot overwrite presentation state.
- [ ] Tests use explicit barriers rather than timing sleeps.

## Required output

A navigation generation contract, race-test matrix, and list of stale commit points removed or guarded.

## Boundaries and failure handling

Do not cancel user-visible cleanup or security enforcement merely because a navigation generation changed.

## Trigger examples

- **Positive:** A slow search result steals the camera after the user has already selected a different location.
- **Negative:** A request to let obsolete navigation commands override the latest user choice.
