---
name: nexora-security-regression-corpus
description: "Maintains reproducible fixtures for previously discovered security and resource-exhaustion bugs."
---

# nexora security regression corpus

## Purpose

Use this workflow for NEXORA-scale engine work when engine security regressions and hostile inputs. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Collect minimized inputs for confirmed vulnerabilities.
2. remove secrets and unrelated private data.
3. record affected versions and expected rejection behavior.
4. classify each fixture by parser, protocol, mod API, or save boundary.
5. ensure fixtures cannot trigger destructive external side effects.
6. run under bounded time and memory.
7. verify the regression test fails on the vulnerable baseline where practical.
8. version the corpus.
9. document remediation and residual risk.

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

Each confirmed security issue has a safe reproducible regression fixture and explicit expected behavior.

Do not store real credentials or user world data in the corpus. Keep fuzz and regression execution resource-bounded.

## Trigger examples

- **Positive:** A code change or incident directly involves engine security regressions and hostile inputs and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
