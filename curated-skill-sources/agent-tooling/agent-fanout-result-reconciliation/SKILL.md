---
name: agent-fanout-result-reconciliation
description: "Reconciles partial, late, duplicated, and failed child-agent results into a truthful parent outcome. Use when a task is distributed across parallel workers."
---

# Agent Fan-out Result Reconciliation

## Purpose

Preserve useful partial output without hiding missing required work.

## Required inputs

Fan-out task, child IDs, required/optional map, deadlines, result schema, and parent acceptance criteria.

## Workflow

1. Persist the expected child set with stable child and attempt IDs before dispatch.
2. Classify each child as required or optional and define acceptance rules before responses arrive.
3. Normalize success, failure, timeout, cancellation, invalid output, duplicate, and pending responses without discarding evidence references.
4. Accept one valid result per attempt unless a versioned supersession rule is explicit.
5. Compare observed results with the expected set and calculate missing, failed, conflicting, and completed groups.
6. Derive the parent result from the declared acceptance rule and disclose partial-success caveats.

## Validation checklist

- [ ] Expected and observed child counts are reported separately.
- [ ] Missing required output cannot become success.
- [ ] Duplicates are idempotently handled or explicitly versioned.
- [ ] Parent success follows the acceptance rule, not response count alone.

## Required output

A child reconciliation table, parent disposition, evidence references, and retry candidates.

## Boundaries and failure handling

Do not merge conflicting payloads by arrival order; report partial or inconclusive when the acceptance rule is missing.

## Trigger examples

- **Positive:** A coordinator has parallel child results and one worker times out.
- **Negative:** A user has not defined independent subtasks or acceptance criteria.
