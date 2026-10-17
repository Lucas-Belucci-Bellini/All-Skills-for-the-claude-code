---
name: skill-auto-review-request-package
description: "Builds a review packet for maintainers from a skill change. Use when a skill generator is ready to request review."
---

# Automated Skill Review Request Package

## Purpose

diff, issue/gap ID, validations, dependencies, risk class, and known limitations

## Required inputs

Summarize purpose, behavior change, changed paths, provenance, test results, and known unverified areas.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Attach targeted questions and highlight high-risk decisions instead of asking reviewers to reread unrelated context.
3. A review package with links, diff summary, validation evidence, unresolved questions, and required approvers.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not claim approval or passing tests when the evidence was not observed. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not claim approval or passing tests when the evidence was not observed.

## Boundaries and failure handling

An autonomous generator has prepared a skill patch and needs human review. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The change is unmodified generated output with no decision left to review.
- **Negative:** undefined
