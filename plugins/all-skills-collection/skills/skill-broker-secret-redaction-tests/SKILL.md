---
name: skill-broker-secret-redaction-tests
description: "Verifies broker logs and errors redact tokens and private payloads. Use when requests include authentication or project context."
---

# Skill Broker Secret Redaction Tests

## Purpose

log outputs, error fixtures, token patterns, and redaction policy

## Required inputs

Create synthetic secret-like values across headers, query strings, payloads, and exception text.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Exercise success and failure paths and scan output artifacts to ensure values never appear unredacted.
3. A redaction test report with safe evidence and affected log fields.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce use fake tokens only and never print actual secrets for verification. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Use fake tokens only and never print actual secrets for verification.

## Boundaries and failure handling

A broker logs denied requests or remote provider failures. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The test has no credentials, payloads, or sensitive logging paths.
- **Negative:** undefined
