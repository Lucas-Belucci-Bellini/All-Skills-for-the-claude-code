---
name: agent-compensation-evidence-verification
description: "Verifies that a compensating action restored declared invariants after a failed workflow. Use after an agent tries to undo or correct a committed side effect."
---

# Agent Compensation Evidence Verification

## Purpose

Treat the provider's compensation response as one piece of evidence, not proof that the original state was restored.

## Required inputs

Original action receipt, compensation receipt, invariant, authoritative read-back, consistency window, and escalation policy.

## Workflow

1. Identify the original action, target, version, and committed receipt.
2. Specify which invariant compensation must restore and which effects are intentionally irreversible.
3. Execute or observe the authorized compensation and persist its receipt.
4. Read the authoritative target after the documented consistency window and compare it with the invariant.
5. Classify recovery as restored, partially restored, not restored, or unverifiable.
6. Block dependent tasks and escalate whenever a required invariant is not proven restored.

## Validation checklist

- [ ] Compensation is tied to the exact original action and target.
- [ ] Restoration uses explicit invariant comparisons.
- [ ] Eventual consistency is accounted for.
- [ ] Partial and unverifiable recovery are separate outcomes.

## Required output

A compensation verification report with receipts, invariant comparison, residual effects, and escalation status.

## Boundaries and failure handling

Some actions are irreversible or partially compensable; preserve residual effects and never claim a clean rollback without evidence.

## Trigger examples

- **Positive:** A multi-service update needs compensation after one service rejects the final step.
- **Negative:** A dry run failed before any external state changed.
