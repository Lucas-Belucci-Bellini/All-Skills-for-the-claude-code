---
name: skill-auto-change-no-op-detection
description: "Detects proposals with no meaningful semantic change. Use before spending CI and reviewer time on generated patches."
---

# Automated Change No-Op Detection

## Purpose

base version, candidate diff, normalized content, and expected behavior change

## Required inputs

Normalize irrelevant whitespace and ordering without dropping meaningful content.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Compare semantic sections and artifact digests; close or revise proposals that contain no behavior or documentation value.
3. A no-op report with normalized diff and rationale.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not discard provenance or license changes as no-ops; metadata can carry release meaning. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not discard provenance or license changes as no-ops; metadata can carry release meaning.

## Boundaries and failure handling

An AI generator repeatedly proposes the same unchanged skill. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The candidate updates a required provenance notice or behavior.
- **Negative:** undefined
