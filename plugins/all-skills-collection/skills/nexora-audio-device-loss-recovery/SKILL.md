---
name: nexora-audio-device-loss-recovery
description: "Recovers audio playback safely when an output device disappears or changes format."
---

# nexora audio device loss recovery

## Purpose

Use this workflow for NEXORA-scale engine work when audio device loss and runtime recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define device lifecycle states and fallback behavior.
2. stop submitting buffers to invalid device handles.
3. recreate backend resources outside real-time callbacks.
4. preserve or intentionally restart voice state.
5. resample or renegotiate formats where supported.
6. bound retry attempts.
7. test unplug/replug and default-device changes.
8. measure silence duration and recovery errors.
9. report fallback device selection.
10. verify shutdown remains safe after failed recovery.

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

Device loss produces bounded recovery and no use-after-free or indefinite callback stalls.

Do not perform blocking device discovery inside an audio callback. Handle devices that repeatedly fail to initialize.

## Trigger examples

- **Positive:** A code change or incident directly involves audio device loss and runtime recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
