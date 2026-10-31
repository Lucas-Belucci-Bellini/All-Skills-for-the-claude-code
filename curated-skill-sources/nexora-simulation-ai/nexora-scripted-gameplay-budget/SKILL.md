---
name: nexora-scripted-gameplay-budget
description: "Contains user-authored gameplay scripts with bounded execution and explicit API access."
---

# nexora scripted gameplay budget

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay scripting and mod-authored scripts. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory script entry points and host APIs.
2. define instruction, time, memory, recursion, and output limits.
3. grant capabilities explicitly.
4. validate host-call arguments and world ownership.
5. define cancellation and cleanup on budget exhaustion.
6. separate deterministic simulation APIs from presentation APIs.
7. test infinite loops and oversized outputs.
8. record sanitized diagnostics.
9. document whether code is sandboxed or trusted native code.

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

Script execution has measurable limits and privileged host operations enforce authorization.

Do not claim isolation for unrestricted native code. A timeout alone cannot interrupt arbitrary native instructions safely.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay scripting and mod-authored scripts and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
