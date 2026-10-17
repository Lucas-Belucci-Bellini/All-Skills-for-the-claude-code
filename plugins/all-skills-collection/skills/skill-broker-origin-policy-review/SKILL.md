---
name: skill-broker-origin-policy-review
description: "Reviews accepted origins and cross-origin access for broker HTTP endpoints. Use when browser-based clients or web tooling call the service."
---

# Skill Broker Origin Policy Review

## Purpose

client origins, endpoint scopes, CORS rules, auth model, and deployment domains

## Required inputs

List legitimate origins and required methods/headers, distinguishing public retrieval from privileged operations.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test disallowed origins, credentials with wildcard origins, preflight, and unintended write methods.
3. An origin-policy report with allowed origin list and negative test outcomes.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not use wildcard credentialed access as a shortcut for a connection problem. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not use wildcard credentialed access as a shortcut for a connection problem.

## Boundaries and failure handling

A web-based agent connector needs a limited origin policy for a remote broker. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No browser-origin or cross-origin request path exists.
- **Negative:** undefined
