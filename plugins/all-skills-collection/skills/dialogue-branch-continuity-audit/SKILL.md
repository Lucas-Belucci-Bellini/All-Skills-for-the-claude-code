---
name: dialogue-branch-continuity-audit
description: Trace branching dialogue for unreachable choices, missing responses, contradictory character knowledge, and inconsistent quest/state conditions.
---

# dialogue branch continuity audit

## Goal

Keep branching narrative coherent as dialogue, NPC memory, and quest flags grow.

## Inputs to inspect

Dialogue graph/scripts, quest flags, character knowledge, localization keys, and entry/exit conditions.

## Workflow

1. Extract nodes, choices, transitions, and conditions into a graph; identify unreachable nodes, dead ends, orphan responses, and paths with no valid choice.
2. Compare character knowledge and relationship/quest prerequisites across branches so dialogue does not reveal events the character has not learned about.
3. Review choices that mutate flags or inventory and verify each branch commits effects exactly once, including interruption/reload paths.
4. Check that localization keys and fallback text exist for every reachable response and choice; flag choice text whose available action differs from the actual transition.
5. Generate representative path tests for critical endings and quest gates, then inspect traces with the state values that selected each branch.

## Validation checklist

- [ ] Every intentionally reachable node has an entry path and valid exit/terminal condition.
- [ ] Required quest and knowledge conditions are checked at the correct point in the branch.
- [ ] Choice side effects cannot be duplicated through retries or revisiting a node.
- [ ] Player-facing choice descriptions accurately summarize the resulting action.
- [ ] Localized dialogue covers all choices and responses reachable in supported locales.

## Required output

Deliver a dialogue graph report, unreachable/dead-end findings, state-condition table, critical path fixtures, and continuity risks requiring narrative review.

## Boundaries and failure handling

Do not remove unusual branches without confirming they are not hidden/debug/story-gated content; distinguish logical defects from deliberate narrative ambiguity.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
