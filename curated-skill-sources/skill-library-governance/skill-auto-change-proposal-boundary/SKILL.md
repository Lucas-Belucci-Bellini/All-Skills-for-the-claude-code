---
name: skill-auto-change-proposal-boundary
description: "Constrains the files and behavior an AI-generated skill change may touch. Use before generating an autonomous patch from a gap request."
---

# Automated Change Proposal Boundary

## Purpose

approved gap, allowed paths, intended behavior, excluded files, and repository contribution rules

## Required inputs

Translate the accepted gap into an explicit allowlist of source files, tests, metadata, and generated artifacts.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Reject or quarantine a proposal that changes unrelated skills, permission policy, release config, or protected-branch content outside scope.
3. A proposal boundary manifest and out-of-scope change report.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not let generated instructions grant their author additional write permissions or widen their own allowlist. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not let generated instructions grant their author additional write permissions or widen their own allowlist.

## Boundaries and failure handling

An agent is permitted to prepare one skill update in an isolated branch. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** No approved gap or change request exists.
- **Negative:** undefined
