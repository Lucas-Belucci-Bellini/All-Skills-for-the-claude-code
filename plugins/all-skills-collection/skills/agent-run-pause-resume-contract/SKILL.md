---
name: agent-run-pause-resume-contract
description: "Defines how a run is suspended and resumed without losing state or repeating completed side effects. Use when agents await approval, external input, or resources."
---

# Agent Run Pause and Resume Contract

## Purpose

Treat pause/resume as durable transitions rather than an in-memory sleep.

## Required inputs

Run-state schema, checkpoint format, pause reason, resume authorization, side-effect receipts, and retention policy.

## Workflow

1. Declare pause reasons and whether each reason permits resume, cancellation, or restart.
2. Persist completed step IDs, pending inputs, artifact digests, and external-action receipts before acknowledging pause.
3. Define who may resume, which new evidence is required, and when the checkpoint expires.
4. On resume, verify artifacts, permissions, schemas, and relevant external state remain compatible.
5. Create a new attempt ID while keeping logical run identity stable and skip only proven-complete steps.
6. Reject expired checkpoints with a recovery report and safe restart option.

## Validation checklist

- [ ] Pause is acknowledged only after the required checkpoint is durable.
- [ ] Resume authority and expiry are explicit.
- [ ] Completed side effects are not repeated just because memory was lost.
- [ ] Invalid checkpoints fail visibly.

## Required output

A pause/resume state diagram, checkpoint schema, access/expiry rules, and restart fixtures.

## Boundaries and failure handling

External systems can change while paused; reconcile them before any consequential continuation.

## Trigger examples

- **Positive:** A run waits hours for a person to approve a prepared action.
- **Negative:** A stateless response completes within one request.
