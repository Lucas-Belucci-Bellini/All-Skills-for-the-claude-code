---
name: save-disk-full-safe-shutdown
description: "Provides an evidence-driven workflow for save disk full safe shutdown, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Save Disk Full Safe Shutdown

## Purpose

Provide a task-specific, reproducible workflow for save disk full safe shutdown; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Record the game/content pipeline version, save schema, registry/content IDs, platform and source/target versions involved in save disk full safe shutdown; make a verified backup before any migration experiment.
2. Map data owners and references across files, chunks, entities, indexes and manifests; state which unknown or missing fields must be preserved, mapped or rejected.
3. Build fixtures for old/current/future schema versions, missing dependencies, truncated/corrupt content, interrupted writes and disk/path edge cases specific to this task.
4. Run the conversion or packaging path on a disposable copy, checkpoint long-running migrations and verify atomic commit/rollback; never overwrite the only known-good save or source artifact.
5. Compare stable IDs, checksums, counts and references before/after; deliver a compatibility matrix, recovery plan and explicit PASS / FAIL / UNVERIFIED evidence.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for save disk full safe shutdown are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A save disk full safe shutdown evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Save data is user progress: never migrate in place without a verified backup, compatibility fixtures and a rollback route. Do not silently discard unknown IDs or fields; label unresolved content and migration assumptions.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change save disk full safe shutdown and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve save disk full safe shutdown or a downstream contract affected by this exact boundary.
