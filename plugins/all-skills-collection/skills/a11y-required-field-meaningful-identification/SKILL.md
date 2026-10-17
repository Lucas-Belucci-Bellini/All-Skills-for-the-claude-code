---
name: a11y-required-field-meaningful-identification
description: "Audits and verifies a11y required field meaningful identification with explicit acceptance checks and recoverable failure handling. Use when implementation, configuration, release, or incident evidence must be reviewed for this boundary."
---

# A11y Required Field Meaningful Identification

## Purpose

Establish an evidence-backed, repeatable procedure for a11y required field meaningful identification, with explicit guardrails and a reusable validation artifact.

## Required inputs

Repository/module and version; intended behavior; current implementation or configuration; representative logs, fixtures or metrics; applicable platform constraints; and the rollback/authorization policy. Supply the exact evidence relevant to a11y required field meaningful identification, and redact credentials and sensitive records.

## Workflow

1. Select the user task, component/page, supported browser/viewport and assistive-technology combinations relevant to a11y required field meaningful identification; capture the current behavior.
2. Inspect semantic structure, accessible name/role/state, DOM focus order and keyboard operation; verify the control remains understandable without visual cues.
3. Complete the entire flow using keyboard only and a screen reader, including validation errors, dynamic updates, cancellation and return-focus behavior where relevant to a11y required field meaningful identification.
4. Check zoom/reflow, high-contrast or forced-colors presentation, touch spacing and reduced-motion preference as applicable; do not rely on color or animation alone.
5. Record manual reproduction steps plus automated test results, known assistive-technology variance and a regression fixture; an automated scanner alone is not proof of conformance.

## Validation checklist

- [ ] The scope and intended invariant for a11y required field meaningful identification are explicit and distinguish adjacent responsibilities.
- [ ] Inputs, version/environment and source evidence are recorded without exposing secrets or unnecessary personal data.
- [ ] At least one success case and one negative/boundary/failure case are documented and reproducible.
- [ ] Results include a concrete artifact, command/check output, fixture, or review record rather than an unsupported assertion.
- [ ] Failure handling, remaining uncertainty and any authorization/rollback condition are stated.

## Required output

A a11y required field meaningful identification evidence record containing scope, exact version/commit/environment, assumptions, checks performed, observed results, failure modes, remediation or rollback guidance, and a clear PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not equate automated scan results with full accessibility. Preserve equivalent task completion and report the tested browser/assistive technology and any limitations.
If required inputs are missing, record the gap and stop before irreversible changes. Separate implementation from verification, bound retries, preserve a minimal reproduction, and escalate when evidence cannot resolve the issue. Never claim a test, network request, deployment, compatibility result or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A maintainer is changing a11y required field meaningful identification and needs a repeatable procedure with explicit acceptance evidence and failure handling.
- **Negative:** The request concerns an unrelated subsystem and does not cross or depend on the a11y boundary covered by this skill.
