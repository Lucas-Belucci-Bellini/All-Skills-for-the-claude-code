---
name: agent-partial-failure-scope-classification
description: "Determines whether a child failure should fail a task, branch, or entire run. Use when work includes required and optional subtasks or partial delivery."
---

# Agent Partial Failure Scope Classification

## Purpose

Propagate failure according to declared dependencies and acceptance criteria rather than treating all errors alike.

## Required inputs

Dependency graph, required/optional labels, error taxonomy, parent acceptance rules, retry policy, and side-effect map.

## Workflow

1. Map each child to parent outputs and identify which downstream tasks depend on it.
2. Classify failures as local, branch-blocking, run-blocking, retryable, non-retryable, or unresolved.
3. Determine which independent branches may continue without consuming invalid or missing output.
4. Preserve valid successful branches and block descendants of failed required prerequisites.
5. Calculate the parent outcome from acceptance rules and name the failure scope precisely.
6. Test optional timeouts, mandatory review failure, invalid output, multiple correlated failures, and post-side-effect failures.

## Validation checklist

- [ ] Failure scope follows declared dependencies.
- [ ] Independent successful branches remain available.
- [ ] Blocked descendants do not consume invalid output.
- [ ] Partial delivery is never labeled full success when required work failed.

## Required output

A branch impact map, classified failures, parent disposition, and partial-completion regression matrix.

## Boundaries and failure handling

Do not infer retryability from message text alone; if dependencies are unknown, stop consequential downstream work.

## Trigger examples

- **Positive:** Optional research failed but required code review succeeded.
- **Negative:** A one-step task failed before producing output and has no partial state.
