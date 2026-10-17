---
name: skill-registry-audit-event-schema
description: "Defines audit events for skill registry actions. Use when fetches, proposals, approvals, releases, and revocations need traceability."
---

# Skill Registry Audit Event Schema

## Purpose

registry operations, identity model, log schema, retention policy, and redaction rules

## Required inputs

Define a stable event envelope with action, skill/version ID, actor scope, correlation ID, outcome, and timestamp.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Validate event coverage across read/propose/approve/publish/revoke and ensure no content secrets are emitted.
3. An audit event schema with event examples and field sensitivity classifications.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not log full skill bodies, private prompts, tokens, or sensitive source contents. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not log full skill bodies, private prompts, tokens, or sensitive source contents.

## Boundaries and failure handling

Maintainers need to audit who promoted a skill version and why. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** A local nonpersistent experiment has no audit or stateful action.
- **Negative:** undefined
