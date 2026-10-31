---
name: agent-workflow-compensation-boundary
description: "Classifies multi-step agent actions by reversibility and specifies recovery boundaries before execution. Use when a workflow changes external state across tools or services."
---

# Agent Workflow Compensation Boundary

## Purpose

Prevent retries and recovery from compounding partial side effects.

## Required inputs

Action plan, external-system capabilities, side-effect inventory, idempotency controls, approvals, and postconditions.

## Workflow

1. Classify each action as read-only, reversible, compensable, or irreversible.
2. Define each compensation by its target, required receipt, and expected restored invariant.
3. Order validation and reversible preparation before irreversible actions wherever supported.
4. Specify which recovery actions are automatic and which require explicit approval.
5. Persist a receipt after each committed action so recovery uses observed state.
6. Inject failures after each side-effect boundary and verify that recovery does not repeat unsafe actions.

## Validation checklist

- [ ] Every external write has a declared recovery or idempotency strategy.
- [ ] Compensation has a measurable postcondition.
- [ ] Irreversible actions require explicit authorization.
- [ ] Partial or unverifiable recovery remains visible.

## Required output

A side-effect matrix, compensation plan, approval boundary, action-receipt schema, and failure scenarios.

## Boundaries and failure handling

Compensation is not always an exact inverse; never claim rollback without read-back evidence.

## Trigger examples

- **Positive:** An agent changes resources across several systems in one workflow.
- **Negative:** A read-only analysis has no external side effects.
