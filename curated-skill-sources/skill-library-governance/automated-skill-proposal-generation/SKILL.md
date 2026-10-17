---
name: automated-skill-proposal-generation
description: "Builds a reviewable skill draft or minimal change from an approved gap request. Use when library maintenance automation is allowed to prepare changes but not publish them."
---

# Automated Skill Proposal Generation

## Purpose

Reduce manual authoring work while ensuring each AI-generated modification remains bounded, traceable, and easy to review.

## Required inputs

Approved gap request, neighboring skills, canonical source rules, naming conventions, license/provenance constraints, and test fixtures.

## Workflow

1. Load the request and nearest existing skills; document why extending an existing skill would or would not be sufficient.
2. Define a narrow change plan naming affected files, scope boundaries, compatibility assumptions, required tests, and files explicitly out of scope.
3. Generate the draft in an isolated branch or patch; preserve unrelated files and avoid bulk rewrites or renames.
4. Attach the request ID, source model/tool metadata when available, change summary, risk classification, and expected behavior change.
5. Run static and semantic duplicate checks, then emit a diff and a checklist for the validation pipeline; do not self-approve the proposal.

## Validation checklist

- [ ] Every generated file maps to an approved gap or maintenance request.
- [ ] The draft has unique scope and positive/negative trigger examples.
- [ ] No unrelated files or stable releases are overwritten.
- [ ] Unverified factual claims and external requirements are marked for review.
- [ ] The generator stops when required context or authorization is missing.

## Required output

An isolated draft branch/patch with a human-readable diff, request link, duplicate analysis, risk label, and validation plan.

## Boundaries and failure handling

Do not merge, publish, or modify the stable skill directly. Do not invent source citations, license permissions, test outcomes, or maintainer approval.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A recurring gap has been accepted and the system should prepare a first draft for review.
- **Negative:** No accepted request or evidence exists and the agent wants to generate many speculative skills to raise a count.
