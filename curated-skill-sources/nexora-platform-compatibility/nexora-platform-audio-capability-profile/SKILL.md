---
name: nexora-platform-audio-capability-profile
description: "Selects supported audio formats and spatialization features based on the active device and backend."
---

# nexora platform audio capability profile

## Purpose

Use this workflow for NEXORA-scale engine work when audio device capability negotiation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Query supported sample rates, channels, and spatial features.
2. choose a preferred format with explicit fallback order.
3. validate conversion cost and latency.
4. handle device changes after initialization.
5. test stereo-only and constrained devices.
6. record selected format and reason.
7. avoid blocking audio callbacks during renegotiation.
8. define behavior for unavailable audio.
9. measure fallback quality and CPU use.

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

Audio initializes with a compatible format or a clear degraded/no-device state.

Do not assume all devices support the same channel layout or sample rate.

## Trigger examples

- **Positive:** A code change or incident directly involves audio device capability negotiation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
