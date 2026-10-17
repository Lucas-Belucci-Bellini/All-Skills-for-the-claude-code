---
name: skill-auto-script-static-analysis
description: "Runs proportionate static checks on scripts shipped with skills. Use when a skill package includes executable helpers or automation."
---

# Automated Skill Script Static Analysis

## Purpose

script files, supported languages, dependency policy, sandbox limits, and allowed side effects

## Required inputs

Detect language and run syntax/lint checks using pinned tools available in CI.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Scan for unsafe shell patterns, unbounded deletion, credential exfiltration, unexpected network calls, and undeclared dependencies.
3. A per-script static-analysis report with tools/versions and findings.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce static analysis is not proof of safety; do not execute unknown scripts against real data to test them. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Static analysis is not proof of safety; do not execute unknown scripts against real data to test them.

## Boundaries and failure handling

A skill introduces a script that edits files or calls APIs. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill is documentation-only and includes no executable files.
- **Negative:** undefined
