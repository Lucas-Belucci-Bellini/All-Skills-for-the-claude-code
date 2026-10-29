---
name: nexora-network-egress-policy
description: "Controls outbound network access for mods, plugins, and automated engine services."
---

# nexora network egress policy

## Purpose

Use this workflow for NEXORA-scale engine work when mod network access and outbound requests. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory network-capable APIs.
2. define default-deny destination and protocol rules.
3. validate DNS resolution and address changes at connection time.
4. prevent loopback/private-network bypasses when not authorized.
5. bound response sizes and timeouts.
6. rate-limit requests.
7. test redirects and DNS rebinding scenarios.
8. log policy decisions without credentials.
9. document trusted-service exceptions.

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

Outbound requests follow explicit policy and cannot bypass destination checks through redirects or address changes.

Do not rely only on URL string validation. Never expose credentials in logs or permit arbitrary egress by default.

## Trigger examples

- **Positive:** A code change or incident directly involves mod network access and outbound requests and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
