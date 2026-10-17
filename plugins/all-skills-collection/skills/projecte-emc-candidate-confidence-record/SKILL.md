---
name: projecte-emc-candidate-confidence-record
description: "Attaches evidence and uncertainty to each proposed EMC value. Use when automated derivation produces estimates rather than confirmed design values."
---

# ProjectE EMC Candidate Confidence Record

## Purpose

candidate value, derivation rule, recipe provenance, anchor values, progression assumptions, and tests

## Required inputs

Separate direct configuration facts, source-derived calculations, heuristic estimates, and human design decisions.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Assign a reproducible confidence state based on evidence completeness and identify exactly which assumption could change the outcome.
3. A candidate record containing value, status, rationale, provenance, confidence, and required approval/test.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not convert confidence into fake precision or present a proposal as official game data. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not convert confidence into fake precision or present a proposal as official game data.

## Boundaries and failure handling

Several EMC candidates need to be reviewed and compared before implementation. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** A value is already verified and the task does not propose or revise it.
- **Negative:** undefined
