---
name: skill-auto-changelog-semantic-diff
description: "Summarizes behavior differences between skill versions. Use when releasing an update beyond wording-only changes."
---

# Automated Skill Semantic Changelog Diff

## Purpose

old/new skill content, metadata, references, tests, and version policy

## Required inputs

Compare triggers, workflow steps, tool calls, assumptions, outputs, boundaries, dependencies, and permissions.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Classify change as metadata-only, editorial, behavioral, compatibility-breaking, or security-sensitive and cite changed sections.
3. A semantic changelog with risk classification and migration notes.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not classify changes as editorial when they alter actions, permissions, or required validation. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not classify changes as editorial when they alter actions, permissions, or required validation.

## Boundaries and failure handling

A new skill revision needs a reviewer-readable behavior summary. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** Only formatting changes with no semantic differences are in scope.
- **Negative:** undefined
