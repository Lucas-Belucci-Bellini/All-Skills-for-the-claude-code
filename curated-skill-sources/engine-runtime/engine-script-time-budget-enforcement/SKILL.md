---
name: engine-script-time-budget-enforcement
description: "Audits and verifies engine script time budget enforcement with explicit acceptance checks and recoverable failure handling. Use when implementation, configuration, release, or incident evidence must be reviewed for this boundary."
---

# Engine Script Time Budget Enforcement

## Purpose

Establish an evidence-backed, repeatable procedure for engine script time budget enforcement, with explicit guardrails and a reusable validation artifact.

## Required inputs

Repository/module and version; intended behavior; current implementation or configuration; representative logs, fixtures or metrics; applicable platform constraints; and the rollback/authorization policy. Supply the exact evidence relevant to engine script time budget enforcement, and redact credentials and sensitive records.

## Workflow

1. Capture the expected behavior, build/runtime identity, reproduction steps, and a before-state snapshot relevant to engine script time budget enforcement.
2. Map the state owner, lifecycle transitions, downstream consumers, and resource or persistence boundaries that intersect engine script time budget enforcement.
3. Write explicit invariants for normal operation, invalid/stale input, interruption, restart or reload, and partial failure; turn each invariant into a fixture or observable check.
4. Apply the smallest reversible probe or change focused on engine script time budget enforcement; instrument the boundary rather than changing unrelated subsystems.
5. Run deterministic cases plus the appropriate stress, cancellation, replay, or reload scenario; compare against baseline and preserve logs, measurements, and rollback instructions.

## Validation checklist

- [ ] The scope and intended invariant for engine script time budget enforcement are explicit and distinguish adjacent responsibilities.
- [ ] Inputs, version/environment and source evidence are recorded without exposing secrets or unnecessary personal data.
- [ ] At least one success case and one negative/boundary/failure case are documented and reproducible.
- [ ] Results include a concrete artifact, command/check output, fixture, or review record rather than an unsupported assertion.
- [ ] Failure handling, remaining uncertainty and any authorization/rollback condition are stated.

## Required output

A engine script time budget enforcement evidence record containing scope, exact version/commit/environment, assumptions, checks performed, observed results, failure modes, remediation or rollback guidance, and a clear PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not change save formats or resource ownership without an explicit migration/rollback plan. Keep deterministic fixtures and avoid claiming a performance win without measured before/after data.
If required inputs are missing, record the gap and stop before irreversible changes. Separate implementation from verification, bound retries, preserve a minimal reproduction, and escalate when evidence cannot resolve the issue. Never claim a test, network request, deployment, compatibility result or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A maintainer is changing engine script time budget enforcement and needs a repeatable procedure with explicit acceptance evidence and failure handling.
- **Negative:** The request concerns an unrelated subsystem and does not cross or depend on the engine boundary covered by this skill.
