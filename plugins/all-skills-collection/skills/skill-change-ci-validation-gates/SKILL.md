---
name: skill-change-ci-validation-gates
description: "Defines automated quality gates for new or changed skill files before they can be released. Use when skills enter the repository through PRs or an autonomous authoring pipeline."
---

# Skill Change CI Validation Gates

## Purpose

Make release eligibility depend on checks and observed evidence rather than on an agent's claim that its own skill is correct.

## Required inputs

Skill diff, repository schema, catalog, source/bundle layout, trigger fixtures, security policy, and CI environment constraints.

## Workflow

1. Run fast structural checks first: required frontmatter, stable slug, file encoding, required sections, reference paths, and prohibited secret patterns.
2. Run catalog checks for unique IDs, valid category/origin, correct source path, category counts, generated bundle parity, manifest and README totals.
3. Run positive and negative trigger fixtures to ensure the skill activates for its intended task and stays out of adjacent tasks.
4. Run domain-specific examples and regressions, clearly separating static checks from runtime tests requiring unavailable tools or services.
5. Produce a gate report with passed, failed, skipped, and unverified checks; require a named reason and approver for any permitted exception.

## Validation checklist

- [ ] A failed required gate blocks eligibility.
- [ ] Source and generated distribution are byte-for-byte equal where required.
- [ ] Positive and negative routing tests are included.
- [ ] Skipped checks cannot be labeled passed.
- [ ] Exceptions are scoped, time-bounded, and visible in the report.

## Required output

A reproducible CI gate definition and per-change quality report with exact failing paths and reasons.

## Boundaries and failure handling

Never modify checks merely to make a new batch pass. A parser success does not prove runtime usefulness; preserve that distinction in reports.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A PR adds a batch of new skills and needs automated acceptance checks.
- **Negative:** A user asks only for high-level ideas before any skill files or repository workflow exist.
