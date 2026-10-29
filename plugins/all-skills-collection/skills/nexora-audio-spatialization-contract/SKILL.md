---
name: nexora-audio-spatialization-contract
description: "Keeps 3D audio attenuation, coordinate conventions, and listener transforms consistent with world simulation."
---

# nexora audio spatialization contract

## Purpose

Use this workflow for NEXORA-scale engine work when spatial audio and listener coordinate correctness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define world-to-audio coordinate mapping and handedness.
2. establish listener ownership and update cadence.
3. specify distance attenuation and occlusion inputs.
4. handle origin rebasing and large-world precision.
5. separate gameplay range checks from audio attenuation.
6. test moving listeners and emitters.
7. verify mono/stereo and surround behavior.
8. measure per-voice spatialization cost.
9. document backend-specific limits.

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

Audio positions and attenuation remain consistent across supported coordinate transforms and device layouts.

Do not use audio attenuation as a gameplay visibility or authorization check. Avoid feeding unrebased large-world floats directly to the audio backend.

## Trigger examples

- **Positive:** A code change or incident directly involves spatial audio and listener coordinate correctness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
