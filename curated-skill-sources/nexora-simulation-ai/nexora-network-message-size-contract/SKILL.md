---
name: nexora-network-message-size-contract
description: "Prevents oversized or malicious network payloads from exhausting memory or crashing protocol parsing."
---

# nexora network message size contract

## Purpose

Use this workflow for NEXORA-scale engine work when network packet framing and payload validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Set maximum frame sizes before allocation.
2. validate lengths, nesting, collection counts, and encoding.
3. define decompression output and CPU limits.
4. reject unknown critical fields while handling optional extensions.
5. apply per-connection rate budgets.
6. bound fragmented-message memory and lifetime.
7. test truncated and oversized frames.
8. log sanitized rejection reasons.
9. keep client/server limits consistent.

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

Malformed and oversized messages are rejected before unbounded allocation.

Never allocate directly from an untrusted declared length or parse compressed data without limits.

## Trigger examples

- **Positive:** A code change or incident directly involves network packet framing and payload validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
