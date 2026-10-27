---
name: issue-and-acceptance-criteria-mining
description: "Converts repository issues, tests, changelog entries, and contribution requirements into falsifiable skill acceptance criteria."
---

# Issue And Acceptance Criteria Mining

## Purpose

Converts repository issues, tests, changelog entries, and contribution requirements into falsifiable skill acceptance criteria.

## When to use

Replace vague skill success conditions with grounded, observable checks.

## Required inputs

Accessible issues/PRs, tests, CI checks, changelog, docs, and a candidate workflow.

## Workflow

1. Inspect supplied acceptance criteria, tests, CI jobs, changelog entries, issue templates, and documentation guarantees.
2. Translate requirements into observable behavior with an input, expected result, and recovery/error condition.
3. Mark each criterion automated, manual-review, environment-dependent, or lacking a test oracle.
4. Separate requested work, merged implementation, planned behavior, and observed test results.
5. Build positive, negative, boundary, regression, and recovery cases for the supported workflow.

## Validation checklist

Every criterion is falsifiable and evidence-linked; roadmap or issue text is not mislabelled as implemented behavior.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Source-linked acceptance criteria and test matrix including criteria without an oracle and human-review decisions.

## Boundaries and failure handling

Do not claim an issue/test passed without checking its state. Exclude confidential issue data from public skills unless authorized.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Turn repository tests and acceptance notes into clear skill success criteria.
- **Negative:** Treat an open issue's desired feature as already implemented and tested.
