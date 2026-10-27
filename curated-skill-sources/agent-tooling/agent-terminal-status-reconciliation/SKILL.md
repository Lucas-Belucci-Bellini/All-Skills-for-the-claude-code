---
name: agent-terminal-status-reconciliation
description: "Resolves disagreement between worker callbacks, orchestrator state, and persisted artifacts when a run appears terminal. Use when asynchronous events can contradict a final status."
---

# Agent Terminal Status Reconciliation

## Purpose

Protect terminal state from stale callbacks and require accepted output evidence for success.

## Required inputs

Run and attempt IDs, state version, worker callbacks, artifact receipts, event sequence, and terminal policy.

## Workflow

1. Identify the authoritative run record and transition log before interpreting a worker's terminal text.
2. Compare run ID, attempt ID, state version, and sequence against the current persisted record.
3. Verify that success references accepted artifacts and fulfills required child outcomes.
4. Classify stale callbacks, duplicates, conflicting terminal events, and unknown attempts without overwriting newer state.
5. Define race rules for success versus cancellation or timeout based on durable commit evidence.
6. Emit an audit record for corrections and leave unresolved conflicts in a reconciliation-needed state.

## Validation checklist

- [ ] Terminal updates use expected version or equivalent conditional writes.
- [ ] Success requires accepted output receipts.
- [ ] Late callbacks cannot silently revive terminal attempts.
- [ ] Unresolved conflicts stay unresolved rather than being guessed.

## Required output

A discrepancy report, authoritative-state rule, event comparison, and race regression scenarios.

## Boundaries and failure handling

If authoritative state or side-effect receipts are missing, report unresolved instead of inventing a final outcome.

## Trigger examples

- **Positive:** A child reports success after the coordinator recorded timeout.
- **Negative:** A synchronous local operation has one final response and no callback races.
