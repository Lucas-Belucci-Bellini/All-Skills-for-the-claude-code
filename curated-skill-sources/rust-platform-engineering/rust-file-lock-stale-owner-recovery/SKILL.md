---
name: rust-file-lock-stale-owner-recovery
description: "Audits and verifies rust file lock stale owner recovery with explicit acceptance checks and recoverable failure handling. Use when implementation, configuration, release, or incident evidence must be reviewed for this boundary."
---

# Rust File Lock Stale Owner Recovery

## Purpose

Establish an evidence-backed, repeatable procedure for rust file lock stale owner recovery, with explicit guardrails and a reusable validation artifact.

## Required inputs

Repository/module and version; intended behavior; current implementation or configuration; representative logs, fixtures or metrics; applicable platform constraints; and the rollback/authorization policy. Supply the exact evidence relevant to rust file lock stale owner recovery, and redact credentials and sensitive records.

## Workflow

1. Identify the crate/API, Rust toolchain, target triple, feature flags, caller assumptions, and concrete failure or performance signal for rust file lock stale owner recovery.
2. Map ownership, lifetimes, error propagation, concurrency, shutdown and resource limits; mark any unsafe or foreign-function boundary explicitly.
3. Implement the smallest safe change for rust file lock stale owner recovery; prefer types and explicit contracts over broad lint suppressions or undocumented retries.
4. Test successful, malformed, boundary and failure paths; choose relevant evidence such as cargo test, clippy, Miri, Loom, fuzzing, or a benchmark and state when a tool is not applicable.
5. Run formatting and the affected workspace/target checks, compare behavior with the baseline, and record compiler version, commands, results and remaining risks.

## Validation checklist

- [ ] The scope and intended invariant for rust file lock stale owner recovery are explicit and distinguish adjacent responsibilities.
- [ ] Inputs, version/environment and source evidence are recorded without exposing secrets or unnecessary personal data.
- [ ] At least one success case and one negative/boundary/failure case are documented and reproducible.
- [ ] Results include a concrete artifact, command/check output, fixture, or review record rather than an unsupported assertion.
- [ ] Failure handling, remaining uncertainty and any authorization/rollback condition are stated.

## Required output

A rust file lock stale owner recovery evidence record containing scope, exact version/commit/environment, assumptions, checks performed, observed results, failure modes, remediation or rollback guidance, and a clear PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not silence unsafe/lint/concurrency findings to obtain a green build. State toolchain/target assumptions and never claim race freedom from a single successful test run.
If required inputs are missing, record the gap and stop before irreversible changes. Separate implementation from verification, bound retries, preserve a minimal reproduction, and escalate when evidence cannot resolve the issue. Never claim a test, network request, deployment, compatibility result or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A maintainer is changing rust file lock stale owner recovery and needs a repeatable procedure with explicit acceptance evidence and failure handling.
- **Negative:** The request concerns an unrelated subsystem and does not cross or depend on the rust boundary covered by this skill.
