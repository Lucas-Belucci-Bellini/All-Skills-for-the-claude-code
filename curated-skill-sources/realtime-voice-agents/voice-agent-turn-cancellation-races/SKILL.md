---
name: voice-agent-turn-cancellation-races
description: "Test cancellation and supersession races between realtime voice turns, tool calls, and delayed responses."
---

# Voice Agent Turn Cancellation Races

## Purpose

Prevent stale assistant turns from speaking or mutating the map after a newer user action cancels them.

## Required inputs

Turn controller, abort signals, tool runner, response IDs, pending-action state, and fake realtime event sequences.

## Workflow

1. Model active, superseded, cancelled, completing, and failed turns with ownership of each response and tool invocation.
2. Create deterministic traces where cancellation races with tool completion, speech playback, and response-arrived events.
3. Verify generation IDs or equivalent tokens block outputs from superseded turns at every mutation boundary.
4. Repeat stop/start cycles and confirm old callbacks cannot update current UI, selections, or metrics.

## Validation checklist

- [ ] A superseded turn cannot issue a late scene or layer mutation.
- [ ] Cancellation handles pending and already-completed tool calls differently and deliberately.
- [ ] Only the current generation owns speech output and result display.
- [ ] Race tests use controlled event ordering instead of sleep-based timing.

## Required output

A turn state machine, a deterministic race matrix, and tests proving stale actions are ignored.

## Boundaries and failure handling

A late result may be logged in sanitized diagnostics but must not be allowed to act on the current scene by default.

## Trigger examples

- **Positive:** A follow-up voice request arrives before the previous slow tool call finishes.
- **Negative:** A request to let canceled commands continue invisibly after the user has moved on.
