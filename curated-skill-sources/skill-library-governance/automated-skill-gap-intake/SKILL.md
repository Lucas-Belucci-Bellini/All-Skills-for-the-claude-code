---
name: automated-skill-gap-intake
description: "Converts a missing skill or repeated workflow failure into a deduplicated, privacy-safe request. Use when an agent cannot find an appropriate skill in the registry."
---

# Automated Skill Gap Intake

## Purpose

Capture real unmet needs in a form that maintainers can act on without storing unnecessary project secrets or creating redundant skills.

## Required inputs

Search candidates, reason for rejection, task category, sanitized failure evidence, environment constraints, and desired outcome.

## Workflow

1. Confirm that search ran against the current catalog and record the queries, candidate IDs, and reasons candidates were rejected.
2. Extract the missing capability as an atomic task, including trigger, minimum inputs, expected output, verification method, and explicit non-goals.
3. Sanitize logs, paths, prompts, repository snippets and identifiers; remove credentials, personal data, customer data and proprietary content not needed for diagnosis.
4. Check exact and semantic overlap with existing skills; decide whether the gap requires a new skill, a scoped revision, better metadata, or an adapter fix.
5. Create a deduplicated request with stable request ID, recurrence count, evidence links, urgency, risk, and a maintainer decision state.

## Validation checklist

- [ ] The gap record contains a clear failure-to-find reason.
- [ ] The request is compared with existing skills before proposing a new identity.
- [ ] Sensitive content is removed or explicitly withheld.
- [ ] Repeated reports aggregate without duplicating requests.
- [ ] Every request can be traced to its sanitized evidence and subsequent disposition.

## Required output

A structured skill-gap issue or record with priority, duplicate candidates, acceptance criteria, and privacy notes.

## Boundaries and failure handling

Do not turn one failed attempt into a requirement for a new skill. If sensitive evidence cannot be sanitized safely, preserve only a summary and request a human review.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** The broker returns no suitable skill for diagnosing a recurring mod conflict and the agent needs to report the gap.
- **Negative:** A matching skill exists and the agent simply has not followed its documented workflow yet.
