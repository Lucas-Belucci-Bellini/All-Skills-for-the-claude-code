---
name: npc-crowd-avoidance-determinism
description: "Provides an evidence-driven workflow for npc crowd avoidance determinism, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# NPC Crowd Avoidance Determinism

## Purpose

Provide a task-specific, reproducible workflow for npc crowd avoidance determinism; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Establish the simulation scope, tick/update model, seed and entity population; capture a short reproducible trace before changing npc crowd avoidance determinism.
2. Identify the state owner, event sources, dependencies and invariants that define correct behavior; distinguish observed state from inferred or remembered state where relevant.
3. Create fixtures for normal, boundary, delayed, contradictory and restart/replay cases; pin seeds and isolate random streams so failures are reproducible.
4. Exercise the smallest scenario that exposes the boundary, then repeat at representative population scale and with cancellation, sleep/wake or partial failure when applicable.
5. Compare event/state traces and relevant budgets against the baseline; preserve a concise repro, metrics, proposed fix and known uncertainties.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for npc crowd avoidance determinism are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A npc crowd avoidance determinism evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Keep authority and randomness explicit. Do not claim emergent behavior is correct from a single seed or small run; preserve replayable evidence and bound NPC/agent computation rather than invoking an expensive model every tick.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change npc crowd avoidance determinism and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve npc crowd avoidance determinism or a downstream contract affected by this exact boundary.
