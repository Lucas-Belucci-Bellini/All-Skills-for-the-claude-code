---
name: continuous-integration-pipeline-design
description: "Designs CI pipelines that provide fast, trustworthy feedback with least-privilege credentials and reproducible checks. Use when creating or improving workflows for tests, builds, security checks, and pull-request validation."
---

# Continuous Integration Pipeline Design

## Goal
Make each proposed change pass repeatable, appropriately scoped checks before integration.

## Workflow
1. Identify supported runtimes, package managers, build targets, platform requirements, and the repository's contribution policy.
2. Define the required gates: formatting, linting, type checks, unit tests, integration tests, build, and security checks as applicable.
3. Pin or constrain toolchain versions where reproducibility requires it; use supported lockfiles and deterministic install commands.
4. Separate fast pull-request checks from expensive scheduled or release-only jobs.
5. Use dependency and build caches only when cache keys and invalidation are safe; avoid letting stale artifacts hide failures.
6. Apply least privilege to workflow permissions, use short-lived credentials where possible, and do not expose secrets to untrusted fork code.
7. Set timeouts, concurrency cancellation, artifact retention, and failure summaries deliberately.
8. Test workflow changes on a branch or controlled event; verify path filters and required status checks do not silently skip critical validation.
9. Keep logs useful while redacting credentials and sensitive environment values.
10. Document required checks, local equivalents, supported platforms, and known limitations.

## Deliverable
- Workflow stages and trigger policy.
- Permission and secret-handling rationale.
- Local reproduction instructions and failure diagnostics.

## Acceptance criteria
- Checks are repeatable and failures are visible.
- Untrusted changes cannot access privileged secrets.
- Required validation cannot be bypassed by accidental filters.
- Runtime and cache choices are justified.

## Guardrails
- Do not grant write-all permissions by default.
- Do not print secrets in logs or artifacts.
- Do not make a workflow appear green by swallowing failing exit codes.

