---
name: nexora-network-reliable-event-order
description: "Maintains ordering for gameplay events that must not be coalesced or dropped while allowing cosmetic state to be superseded."
---

# nexora network reliable event order

## Purpose

Use this workflow for NEXORA-scale engine work when reliable gameplay event channels. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify messages by ordering and reliability requirements.
2. define sequence scope and wrap handling.
3. separate reliable events from supersedable state.
4. bound retransmission and acknowledgement queues.
5. deduplicate repeated events.
6. specify reconnect behavior.
7. test loss, reordering, duplication, and wrap boundaries.
8. measure head-of-line blocking.
9. document protocol compatibility.

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

Required events are delivered in the documented order without unbounded retransmission growth.

Do not put high-volume cosmetic state in a blocking reliable queue unless required. Never apply duplicate authoritative effects.

## Trigger examples

- **Positive:** A code change or incident directly involves reliable gameplay event channels and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
