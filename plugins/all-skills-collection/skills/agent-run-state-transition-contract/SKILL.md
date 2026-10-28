---
name: agent-run-state-transition-contract
description: "Defines legal lifecycle states and transitions for a multi-agent run. Use when auditing an orchestrator that coordinates queued, active, waiting, and terminal work."
---

# Agent Run State Transition Contract

## Purpose

Model run state independently from task and attempt state.

## Required inputs

Current run states, worker callbacks, retries, cancellation sources, persistence guarantees, and terminal consumers.

## Workflow

1. Enumerate run-level, task-level, and attempt-level states separately so one status field does not represent three different lifecycles.
2. Draw allowed transitions and identify the actor and guard required for each edge, including waiting, retry, cancellation, and completion.
3. Use versioned conditional updates to prevent concurrent callbacks from overwriting newer state.
4. Require output evidence before success, and create a new attempt identity for retries instead of reopening a terminal attempt.
5. Exercise legal transitions, illegal edges, duplicate callbacks, unknown states, and out-of-order events.

## Validation checklist

- [ ] Run, task, and attempt states have independent meanings.
- [ ] Every allowed transition has an actor and guard.
- [ ] Terminal attempts cannot be reopened in place.
- [ ] Stale and duplicate events cannot overwrite newer state.

## Required output

A state diagram, transition table, authorization rules, and positive/negative transition fixtures.

## Boundaries and failure handling

A state contract does not implement persistence or a durable orchestrator; call out missing atomic-update guarantees.

## Trigger examples

- **Positive:** A coordinator needs explicit run states across several child agents.
- **Negative:** A user only wants a label for a local script status field.
