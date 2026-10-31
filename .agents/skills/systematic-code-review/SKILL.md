---
name: systematic-code-review
description: "Reviews code changes for correctness, regressions, maintainability, and security using evidence from the diff and surrounding code. Use when reviewing a pull request or preparing changes for approval."
---

# Systematic Code Review

## Goal
Find consequential defects and communicate them with actionable evidence, prioritizing behavior over stylistic preference.

## Workflow
1. Read the change request and repository instructions; establish the intended behavior and explicit non-goals.
2. Inspect the full diff and surrounding call sites, tests, configuration, and data contracts. Do not infer behavior from the patch alone.
3. Trace changed paths through normal, boundary, error, concurrency, and permission cases as applicable.
4. Prioritize findings by impact and likelihood: correctness/data loss, security, compatibility, reliability, then maintainability.
5. For each finding, identify the exact location, triggering condition, observed or logically demonstrated consequence, and a focused remedy.
6. Distinguish confirmed defects from questions, preferences, and unverified hypotheses. Avoid presenting style opinions as blockers.
7. Check tests for meaningful assertions and missing regression cases. Treat green CI as evidence, not proof that no defect exists.
8. Re-check findings against the current diff and avoid duplicating the same root cause across comments.
9. Provide a concise summary of strengths, blockers, non-blocking risks, and checks that were or were not run.

## Finding format
- **Severity:** critical / high / medium / low, justified by impact.
- **Location:** changed file and precise line or hunk.
- **Scenario:** conditions required to trigger the problem.
- **Impact:** concrete user or system consequence.
- **Recommendation:** smallest viable corrective action.

## Acceptance criteria
- Findings are reproducible or supported by clear code-path evidence.
- Each blocking comment explains why the issue matters.
- Absence of findings is not described as a guarantee of safety.
- Review scope and unrun checks are explicit.

## Guardrails
- Do not approve or merge on the user's behalf unless explicitly asked and authorized.
- Do not report speculative issues as facts.
- Do not demand unrelated refactors in a focused PR.
- Do not repeat secrets or sensitive payloads in review comments.

