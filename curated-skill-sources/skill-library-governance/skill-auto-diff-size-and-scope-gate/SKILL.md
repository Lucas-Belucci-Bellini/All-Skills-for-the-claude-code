---
name: skill-auto-diff-size-and-scope-gate
description: "Flags unexpectedly broad skill changes before review. Use when an AI proposes a patch to a shared skill library."
---

# Automated Diff Size and Scope Gate

## Purpose

diff, expected changed paths, size budget, generated-file rules, and request scope

## Required inputs

Compare actual changed files and changed lines with the declared change boundary and baseline size.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Escalate unexpected renames, deletions, mass reformatting, or catalog-wide churn for review rather than accepting by count alone.
3. A scoped diff report with expected/unexpected paths and reviewer actions.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce small diffs are not automatically safe, and large generated diffs are not automatically wrong; evaluate scope and rationale. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Small diffs are not automatically safe, and large generated diffs are not automatically wrong; evaluate scope and rationale.

## Boundaries and failure handling

A new skill proposal unexpectedly edits hundreds of unrelated files. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The change is a reviewed release-wide regeneration explicitly requested by the maintainer.
- **Negative:** undefined
