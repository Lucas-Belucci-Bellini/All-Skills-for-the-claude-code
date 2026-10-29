---
name: nexora-remote-console-authentication
description: "Secures remote administrative consoles with explicit authentication, authorization, and session lifecycle rules."
---

# nexora remote console authentication

## Purpose

Use this workflow for NEXORA-scale engine work when remote console and administrative API. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Determine whether remote access is required and default it off otherwise.
2. define authentication mechanism and credential storage.
3. require transport protection where supported.
4. rate-limit failed attempts.
5. enforce command-level authorization.
6. bind sessions to expiry and revocation.
7. protect against replay and CSRF where relevant.
8. test unauthorized, expired, and brute-force cases.
9. log audit events without secrets.
10. document safe deployment defaults.

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

Remote administration is disabled or protected by tested authentication and authorization with bounded sessions.

Do not expose unauthenticated administrative endpoints to the network. Never log passwords, tokens, or session cookies.

## Trigger examples

- **Positive:** A code change or incident directly involves remote console and administrative API and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
