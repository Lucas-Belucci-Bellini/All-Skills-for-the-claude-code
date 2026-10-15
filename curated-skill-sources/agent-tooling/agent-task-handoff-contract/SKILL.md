---
name: agent-task-handoff-contract
description: Define explicit input, output, evidence, and stop conditions when handing a task from one AI agent or workflow stage to another.
---

# Agent Task Handoff Contract

## Goal

Prevent agents from losing assumptions, duplicating work, or claiming unverified completion when tasks cross boundaries.

## Inputs to inspect

Agent roles, task workflow, shared workspace rules, artifacts, permission model, and completion criteria.

## Workflow

1. Define the receiving agent's objective, allowed scope, explicit non-goals, current branch/context, and files or systems it may change.
2. Specify the minimum handoff packet: user intent, decisions already made, evidence links, changed files, tests run, tests not run, risks, and next blocking question.
3. Give each stage a machine-checkable completion contract such as a schema, diff, validation report, or named artifact rather than 'looks good'.
4. Set failure and retry behavior for partial output, stale context, tool errors, conflicting edits, missing dependencies, and ambiguous ownership.
5. Test the contract with interrupted, duplicate, empty, malformed, and successful handoffs. Ensure the receiver can resume without rereading the entire history.

## Validation checklist

- [ ] Every handoff states its evidence and separates facts, assumptions, and proposals.
- [ ] There is one accountable owner for each mutable artifact or explicit conflict handling.
- [ ] The receiver knows when to stop and request approval instead of broadening scope.
- [ ] A failed validation cannot be summarized as a success.
- [ ] Retries do not repeat external side effects or overwrite newer work silently.

## Required output

Deliver a reusable handoff template, required artifact schema, acceptance criteria, recovery protocol, and example success/failure packets.

## Boundaries and failure handling

Do not rely on vague summaries like 'continue from here'; do not let an agent mark work complete solely because another agent said it was complete.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
