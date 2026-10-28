---
name: implementing-game-ai-state-machines
description: "Structures game NPC behavior as explicit, testable state machines with clear transitions and recovery paths. Use when implementing enemies, companions, civilians, bosses, or other agents with multiple behavior modes."
---

# Implementing Game AI State Machines

## Goal
Make NPC behavior predictable to implement, legible to players, and testable without requiring a full game session for every transition.

## Procedure
1. List the NPC's responsibilities and player-visible behavior, then define a small set of states such as idle, patrol, investigate, pursue, attack, retreat, stunned, and dead. Use only states the design needs.
2. For every state, specify entry conditions, allowed actions, exit conditions, timeout behavior, and cleanup of state-owned resources.
3. Define transitions as explicit guards over observable inputs: perception, distance, health, cooldowns, navigation status, scripted events, and timers.
4. Establish priority when several transitions are true at once. Make interrupt rules explicit for death, stun, scripted control, and high-priority threats.
5. Separate decision logic from action execution where practical. State evaluation should not accidentally apply damage, spawn duplicate effects, or issue movement commands multiple times per frame.
6. Add hysteresis or dwell time around noisy thresholds so NPCs do not flicker between states near a boundary.
7. Define failure behavior for missing targets, blocked navigation, invalid references, unreachable destinations, and despawn or scene changes.
8. Add debug visibility for current state, transition reason, target, and time spent in state. Avoid exposing sensitive production telemetry.
9. Test each transition directly, then test sequences that cross several states. Include simultaneous guards, interrupted actions, and repeated enter/exit cycles.
10. Tune behavior using observed play traces. If a behavior seems unfair, verify perception, telegraphing, timing, and player counterplay before changing damage values.

## Transition test matrix
For each transition, record:
- Initial state and fixture
- Guard expected to pass or fail
- Triggering input/event
- Expected next state
- Expected side effects exactly once
- Timeout or recovery result

## Acceptance criteria
- Every state has a defined exit or intentional terminal condition.
- Transition priority is deterministic when multiple guards are true.
- Re-entering a state does not leak timers, subscriptions, navigation requests, or attack effects.
- Invalid targets and failed navigation recover without soft-locking the NPC.
- Debug traces can explain why a transition occurred.

## Avoid
- Hiding every behavior in nested conditionals with implicit priority.
- Running side effects inside a condition that is evaluated every frame.
- Using random behavior to mask invalid state transitions.
- Claiming an NPC is intelligent without testing player readability and counterplay.
