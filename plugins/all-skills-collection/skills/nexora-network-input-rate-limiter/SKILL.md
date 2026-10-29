---
name: nexora-network-input-rate-limiter
description: "Protects authoritative input processing from abusive rates and accidental client bursts."
---

# nexora network input rate limiter

## Purpose

Use this workflow for NEXORA-scale engine work when multiplayer input flood and rate limiting. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify commands by cost and trust level.
2. define token or leaky-bucket budgets per connection and command type.
3. account for legitimate burst allowances.
4. validate payload size before charging expensive parsing.
5. distinguish rate limiting from gameplay rejection.
6. bound queued inputs.
7. test bursts, slow-drip abuse, and reconnect resets.
8. record sanitized throttle counters.
9. document enforcement and appeal behavior.

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

Input processing cost remains bounded while legitimate burst patterns remain supported.

Do not let reconnect reset global abuse accounting without policy. Avoid using rate limits as a substitute for semantic validation.

## Trigger examples

- **Positive:** A code change or incident directly involves multiplayer input flood and rate limiting and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
