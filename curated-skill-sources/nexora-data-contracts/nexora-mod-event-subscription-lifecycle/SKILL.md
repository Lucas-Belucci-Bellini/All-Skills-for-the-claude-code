---
name: nexora-mod-event-subscription-lifecycle
description: "Prevents mods from receiving callbacks after unload or retaining engine resources through event subscriptions."
---

# nexora mod event subscription lifecycle

## Purpose

Use this workflow for NEXORA-scale engine work when mod event subscriptions and unload safety. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Track subscription ownership by plugin instance.
2. define unsubscribe semantics and in-flight callback behavior.
3. cancel queued callbacks during unload.
4. avoid calling plugin code after lifecycle termination.
5. make repeated unsubscribe safe.
6. test unload during dispatch and callback failure.
7. inspect reference cycles between bus and plugin.
8. instrument live subscriptions.
9. document thread-affinity rules.

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

Unloaded plugins receive no new callbacks and owned subscriptions do not leak.

Do not free plugin state while callbacks are still executing. Avoid event bus ownership cycles that prevent unload.

## Trigger examples

- **Positive:** A code change or incident directly involves mod event subscriptions and unload safety and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
