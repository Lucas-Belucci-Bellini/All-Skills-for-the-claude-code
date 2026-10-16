---
name: supply-chain-fuzzing-regression-triage
description: "Validate supply chain fuzzing regression triage, including boundary cases, evidence capture, and safe failure handling."
---

# Supply Chain Fuzzing Regression Triage

## Purpose

Make supply chain fuzzing regression triage explicit, testable, and auditable instead of relying on undocumented assumptions. Establish the intended invariant, identify the affected boundary, and produce evidence another engineer can reproduce.

## Required inputs

CI workflow files, dependency manifests and lockfiles, build metadata, artifact digests, and security scan evidence. Focus this review on supply chain fuzzing regression triage and record applicable runtime, version, identity, and ownership constraints.

## Workflow

1. Locate the authoritative implementation, configuration, data contract, owner, and version boundary for supply chain fuzzing regression triage; distinguish local assumptions from platform guarantees.
2. Write the acceptance invariant and the conditions that make it false. Record the expected result, permitted actors, resource boundaries, and failure budget before changing anything.
3. Build a minimal reproducible fixture covering a compliant build, a deliberately noncompliant fixture, and an unavailable or stale evidence source. Keep test data synthetic or sanitized, and make event ordering and expected results explicit.
4. Run supported automated tests and static checks. When execution is unavailable, document the exact command/assertion to run and mark it pending rather than claiming it passed.
5. Compare observed evidence against the invariant using revision-pinned scan reports, workflow permissions, component inventories, artifact digests, and attestation results. Separate confirmed failures, likely causes, false positives, and missing evidence.
6. Propose the smallest corrective change, add a regression test, and document the impact, recovery/rollback path, owner, and any time-bounded exception.
7. Re-run relevant checks and produce the required output with pass/fail/pending status, evidence references, and residual risks.

## Validation checklist

- [ ] The authoritative source, environment, owner, and relevant version are identified.
- [ ] Expected behavior and a concrete failure condition for supply chain fuzzing regression triage are documented.
- [ ] Positive, negative, and boundary/failure cases are reproducible without unnecessary production access.
- [ ] Assertions distinguish a pass from a skipped, flaky, stale, or unavailable check.
- [ ] Diagnostics are useful and sanitized; secrets and unrelated user data are excluded.
- [ ] Any remediation has a regression check and recovery/rollback or exception-expiry plan.
- [ ] The report names evidence, unresolved questions, and the next accountable action.

## Required output

Produce a supply-chain evidence report with severity, affected revision/artifact, verification references, owner, and bounded remediation. Include a concise decision marked PASS, FAIL, or PENDING; exact evidence paths or command output references; observed versus expected behavior; and an owner/date for unresolved issues.

## Boundaries and failure handling

Do not treat a scanner score as security certification. Do not publish artifacts, delete dependencies, weaken branch protection, or change credentials automatically. Record evidence age and exception expiry. If scanner data is stale or incomplete, mark the control unknown; do not convert missing evidence into a passing score.

## Trigger examples

- **Positive:** A release or dependency review needs current evidence about an identified software supply-chain control.
- **Negative:** One aggregate score is being presented as proof that a repository or release is risk-free.
