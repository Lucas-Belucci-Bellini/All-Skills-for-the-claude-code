---
name: skill-broker-privacy-minimization
description: "Minimizes personal and project data in broker requests, feedback, and telemetry. Use when agents send task context to a shared registry."
---

# Skill Broker Privacy Minimization

## Purpose

request schema, personal-data risk, retention rules, and diagnostic requirements

## Required inputs

Map each field to its purpose and remove any not necessary for search, authorization, or reproducible feedback.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Use synthetic identifiers and redaction; test that required outcomes remain analyzable without raw prompts or source files.
3. A data-minimization report with retained fields, redaction behavior, and remaining risks.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not use private conversations as training examples or shared skill content without explicit authorization. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not use private conversations as training examples or shared skill content without explicit authorization.

## Boundaries and failure handling

A broker needs to learn from failed skill searches without retaining private conversation text. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The service processes only public package metadata with no user-linked fields.
- **Negative:** undefined
