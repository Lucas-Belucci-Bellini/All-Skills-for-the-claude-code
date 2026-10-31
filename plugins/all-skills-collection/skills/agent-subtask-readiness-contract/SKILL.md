---
name: agent-subtask-readiness-contract
description: "Determines whether a delegated task is ready based on prerequisites, artifacts, permissions, and dependency outcomes. Use when agents schedule work from a task graph."
---

# Agent Subtask Readiness Contract

## Purpose

Make readiness derive from persisted prerequisites, not optimistic scheduling assumptions.

## Required inputs

Task dependency graph, required artifact list, upstream states, permission requirements, and freshness rules.

## Workflow

1. Represent prerequisites as typed dependencies: required success, acceptable partial result, optional reference, approval, or external condition.
2. Declare required artifact names, schema versions, and permissions before a task can enter ready state.
3. Evaluate dependencies against persisted evidence and distinguish waiting from permanently blocked.
4. Reject readiness for unknown dependencies, incompatible artifacts, or expired references.
5. Recompute readiness idempotently after upstream success, failure, cancellation, or artifact replacement.
6. Expose a stable blocked reason and the minimum action needed to unblock the task.

## Validation checklist

- [ ] Readiness follows explicit dependency rules, not event order.
- [ ] Required inputs are validated before dispatch.
- [ ] Waiting and permanently blocked states are distinct.
- [ ] Repeated dependency events cannot schedule duplicate work.

## Required output

A readiness decision per task, dependency evidence, blocked reason codes, and eligible next actions.

## Boundaries and failure handling

Recheck volatile permissions immediately before consequential actions; readiness does not guarantee tools remain available.

## Trigger examples

- **Positive:** An implementation task must wait on a schema design and approved test environment.
- **Negative:** A one-step chat task has no dependency graph.
