---
name: automation-change-risk-gating
description: "Chooses safe approval and verification gates for automated repository changes. Use when agents commit, delete, migrate, publish, deploy, or modify shared configurations."
---

# Automation Change Risk Gating

## Use when
Automation applies changes with impact beyond what the validation or user authorization actually covers.

## Workflow
1. Classify scope, reversibility, blast radius, external side effects, sensitive data exposure, and whether the operation changes shared or production state.
2. Use a read-only inspect/diff phase first; prepare reversible changes and backups before any irreversible or externally visible action.
3. Require stronger tests or explicit approval for deletes, migrations, permission changes, release publishing, and branch/visibility changes.
4. Record the exact state, approval, validation, rollback path, and result of each gated action.

## Required output
A risk classification, gate matrix, approval requirements, rollback plan, and audit record.

## Validation
- Approval is tied to the specific operation and scope.
- The rollback path exists before high-impact changes start.
- Read-only inspection and write actions are clearly separated.

## Guardrails
Do not infer authorization to merge, deploy, delete, or publish from a general request to investigate or prepare changes.
