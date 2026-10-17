---
name: skill-registry-access-pattern-privacy
description: "Reviews telemetry collected by a shared skills registry. Use when access logs could reveal projects or user behavior."
---

# Skill Registry Access Pattern Privacy

## Purpose

event/metric schema, privacy policy, retention limits, and access control

## Required inputs

Identify which event dimensions are needed to operate the service and which could expose private tasks or identities.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Remove or aggregate unnecessary query text, repository paths, personal identifiers, and high-cardinality attributes.
3. A privacy review with retained fields, redactions, access policy, and retention recommendation.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not retain full prompts or private source snippets by default. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not retain full prompts or private source snippets by default.

## Boundaries and failure handling

A broker needs useful adoption telemetry without storing conversation history. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No telemetry or access logs are collected.
- **Negative:** undefined
