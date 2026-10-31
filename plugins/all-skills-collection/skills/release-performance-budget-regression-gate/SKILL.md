---
name: release-performance-budget-regression-gate
description: "Audits and verifies release performance budget regression gate with explicit acceptance checks and recoverable failure handling. Use when implementation, configuration, release, or incident evidence must be reviewed for this boundary."
---

# Release Performance Budget Regression Gate

## Purpose

Establish an evidence-backed, repeatable procedure for release performance budget regression gate, with explicit guardrails and a reusable validation artifact.

## Required inputs

Repository/module and version; intended behavior; current implementation or configuration; representative logs, fixtures or metrics; applicable platform constraints; and the rollback/authorization policy. Supply the exact evidence relevant to release performance budget regression gate, and redact credentials and sensitive records.

## Workflow

1. Name the repository, commit, artifact/control, environment and release owner for release performance budget regression gate; define a measurable pass condition before running checks.
2. Trace the relevant source, dependency lock, build job, generated artifact, permission or operational control end to end; capture immutable identifiers where available.
3. Create or select positive and negative fixtures that would expose a regression in release performance budget regression gate, including expiry, drift, denial, failure or rollback when applicable.
4. Exercise the check in a disposable or staging context; rehearse the stop/rollback path and do not perform a production or destructive action without authorization.
5. Publish an evidence bundle with exact command/check results, artifact/commit IDs, exceptions with expiry, owner, and an explicit pass/fail/unverified status.

## Validation checklist

- [ ] The scope and intended invariant for release performance budget regression gate are explicit and distinguish adjacent responsibilities.
- [ ] Inputs, version/environment and source evidence are recorded without exposing secrets or unnecessary personal data.
- [ ] At least one success case and one negative/boundary/failure case are documented and reproducible.
- [ ] Results include a concrete artifact, command/check output, fixture, or review record rather than an unsupported assertion.
- [ ] Failure handling, remaining uncertainty and any authorization/rollback condition are stated.

## Required output

A release performance budget regression gate evidence record containing scope, exact version/commit/environment, assumptions, checks performed, observed results, failure modes, remediation or rollback guidance, and a clear PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not deploy, delete artifacts, rotate production credentials or waive a gate without approval. A green local check is not evidence that remote CI or a production rollout passed.
If required inputs are missing, record the gap and stop before irreversible changes. Separate implementation from verification, bound retries, preserve a minimal reproduction, and escalate when evidence cannot resolve the issue. Never claim a test, network request, deployment, compatibility result or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A maintainer is changing release performance budget regression gate and needs a repeatable procedure with explicit acceptance evidence and failure handling.
- **Negative:** The request concerns an unrelated subsystem and does not cross or depend on the release boundary covered by this skill.
