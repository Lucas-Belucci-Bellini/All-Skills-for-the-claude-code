---
name: netcode-lag-compensation-validation
description: Evaluate server-authoritative lag compensation for hitscan and interactions using recorded latency, rewind limits, and abuse-resistant validation.
---

# netcode lag compensation validation

## Goal

Make networked interactions fair under latency without allowing clients to dictate historical truth.

## Inputs to inspect

Server tick model, latency estimates, input timestamps, rewindable state, hit tests, and anti-cheat boundaries.

## Workflow

1. Document the authoritative event timeline and which state can be rewound for each interaction type.
2. Set maximum rewind windows and validate client timestamps against server-observed timing and plausible clock drift.
3. Reconstruct historical hit-test inputs from authoritative snapshots; keep client-side prediction as a presentation aid, not final authority.
4. Test low/high latency, jitter, packet reordering, clock skew, target movement, and clients deliberately submitting old or future timestamps.
5. Compare accepted/rejected results and record how rewind limits affect fairness, server cost, and exploit surface.

## Validation checklist

- [ ] Server uses observed timing and bounded history rather than trusting arbitrary client timestamps.
- [ ] Rewind rules are consistent across hit tests and related world interactions.
- [ ] Jitter and packet reordering have deterministic handling.
- [ ] Abuse tests cover repeated timestamp manipulation and maximum-window edges.
- [ ] A test report separates intended latency trade-offs from confirmed exploit risks.

## Required output

Deliver a lag-compensation contract, rewind limit rationale, latency scenario matrix, security findings, and measurable acceptance criteria.

## Boundaries and failure handling

Do not rewind authoritative state indefinitely; do not describe client prediction success as proof a server-side hit was valid.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
