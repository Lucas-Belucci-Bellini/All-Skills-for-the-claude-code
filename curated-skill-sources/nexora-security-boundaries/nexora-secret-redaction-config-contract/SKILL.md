---
name: nexora-secret-redaction-config-contract
description: "Prevents tokens, passwords, and private keys from leaking through configuration parsing and diagnostics."
---

# nexora secret redaction config contract

## Purpose

Use this workflow for NEXORA-scale engine work when engine configuration secrets and logs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify secret-bearing configuration fields and their lifecycle.
2. keep secret values out of debug formatting and error messages.
3. redact nested structures before logging.
4. validate file permissions where supported.
5. avoid storing secrets in world saves or crash reports.
6. test synthetic secret markers through all error paths.
7. define environment/secret-provider precedence.
8. document rotation and reload behavior.
9. review telemetry exports for leakage.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Synthetic secrets remain absent from logs, reports, and persisted non-secret configuration artifacts.

Do not print full configuration objects in errors. Avoid claiming encrypted storage unless an actual key-management design exists.

## Trigger examples

- **Positive:** A code change or incident directly involves engine configuration secrets and logs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
