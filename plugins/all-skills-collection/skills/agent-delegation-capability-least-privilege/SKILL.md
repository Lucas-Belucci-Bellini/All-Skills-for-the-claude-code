---
name: agent-delegation-capability-least-privilege
description: "Restricts delegated workers to the minimum tools, data, and action scope needed for one subtask. Use when a parent passes permissions to child agents."
---

# Agent Delegation Capability Least Privilege

## Purpose

Ensure that delegation does not widen access merely because a child was created by a trusted parent.

## Required inputs

Parent authority, child goal, required tools, resource scope, sensitivity labels, expiry, and approval route.

## Workflow

1. Translate the subtask into required read, write, execution, network, and external-action capabilities.
2. Intersect requested access with parent delegation authority and project policy instead of copying every parent permission.
3. Bind data access to named resources and exclude credentials or unrelated conversation context.
4. Set expiry and revocation rules and propagate revocation to active descendants.
5. Enforce permissions at dispatch and re-check high-impact authority before use.
6. Record denied requests and route legitimate privilege expansion through a separate approval.

## Validation checklist

- [ ] Child capabilities are task-specific.
- [ ] Resource scopes are explicit and narrow.
- [ ] Temporary grants expire and can be revoked across descendants.
- [ ] Permission escalation requires an authorized decision.

## Required output

A per-subtask capability manifest, scope comparison, expiry/revocation rules, and denial tests.

## Boundaries and failure handling

Prompts do not enforce permissions; the runtime or tool broker must enforce these constraints technically.

## Trigger examples

- **Positive:** A child agent needs read-only log analysis and must not deploy code.
- **Negative:** A conceptual persona has no tool or resource permissions.
