---
name: designing-quest-objective-dependencies
description: "Models quest objectives, prerequisites, optional branches, failure states, and completion conditions as a testable dependency graph. Use when missions become stuck, contradictory, impossible to finish, or difficult to extend."
---

# Designing Quest Objective Dependencies

## Goal
Make mission logic understandable to players and maintainable for developers by representing prerequisites and outcomes explicitly instead of scattering hidden conditions across scripts.

## Procedure
1. Define the quest lifecycle and terminal outcomes: available, active, completed, failed, abandoned, or any game-specific states. Document which transitions are reversible.
2. Represent objectives and prerequisites as a directed graph. Distinguish AND prerequisites from OR alternatives, optional objectives, and narrative-only beats.
3. Check for cycles, unreachable nodes, missing prerequisites, and terminal states with no valid completion or failure path.
4. Give every objective a stable identifier separate from its display text. Treat localized labels and dialogue as presentation, not as the identity used by saves or scripts.
5. Specify event contracts: which world event can satisfy an objective, whether progress is repeatable, and how duplicate or out-of-order events are handled.
6. Define branch behavior when players skip content, complete objectives in an unexpected order, kill or lose an important NPC, leave the area, or load an older save.
7. Separate mandatory progression from optional rewards. An optional branch must not silently become a required prerequisite unless the design explicitly says so.
8. Make transitions idempotent where possible. Replaying the same event should not grant duplicate rewards or reopen a completed objective.
9. Add debug output that identifies the current quest state, unsatisfied prerequisites, triggering event, and reason a transition was accepted or rejected.
10. Test graph paths: shortest valid completion, each optional branch, each failure route, invalid ordering, repeated events, save/load mid-quest, and version migration when objectives change.

## Deliverables
- Objective dependency graph with AND/OR semantics
- State-transition table and terminal-state definitions
- Stable objective IDs and event contracts
- Branch and failure-path test matrix
- Migration notes for changed objectives in persisted saves

## Acceptance criteria
- Every required objective is reachable from a valid starting state.
- Every nonterminal state has a documented continuation, recovery, or intentional dead end.
- Cycles and contradictory prerequisites are detected before release.
- Duplicate events cannot duplicate rewards or corrupt progress.
- Save/load and supported quest-version changes preserve valid player progress.

## Avoid
- Encoding all quest rules in dialogue text or animation callbacks.
- Using localized display names as persistent identifiers.
- Making optional objectives accidentally block the main path.
- Resetting player progress silently when a quest graph changes.
