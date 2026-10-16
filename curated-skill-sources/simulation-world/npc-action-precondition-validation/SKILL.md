---
name: npc-action-precondition-validation
description: Validate NPC action preconditions, reservations, interruption rules, and state transitions before actions mutate world state.
---

# NPC Action Precondition Validation

## Goal

Prevent NPC plans from executing against stale assumptions or leaving entities in invalid states after the world changes.

## Inputs to inspect

Action definitions, goal/planner outputs, world state queries, resource reservations, cancellation flow and state-machine transitions.

## Workflow

1. For each action, list required state, location, target generation, resource reservation, timing window and mutually exclusive actions.
2. Separate precondition checking from action execution and decide which conditions must be revalidated immediately before committing side effects.
3. Simulate target despawn, resource loss, path invalidation, interrupted work, schedule changes and duplicate action delivery between planning and execution.
4. Verify every failure path transitions the NPC to a defined retry, replan, wait or abort state and releases owned reservations/subscriptions.
5. Add scenario and property tests that assert no action side effect occurs when its required preconditions are false.

## Validation checklist

- [ ] Stale entity references are rejected using identity/generation checks rather than reused numeric IDs alone.
- [ ] Reservations and subscriptions are released or transferred on every terminal action path.
- [ ] Concurrent or duplicate action commands cannot perform non-idempotent side effects twice.
- [ ] Failure states are observable and do not create infinite retry loops.

## Required output

An action/precondition table, failure-transition map, stale-state fixtures and regression tests for action side effects.

## Boundaries and failure handling

Do not solve invalid actions by teleporting actors or forcibly resetting state unless that recovery is a documented game rule.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
