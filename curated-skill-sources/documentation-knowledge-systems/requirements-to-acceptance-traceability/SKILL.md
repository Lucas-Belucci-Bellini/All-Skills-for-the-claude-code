---
name: requirements-to-acceptance-traceability
description: "Trace explicit requirements to implementation evidence and acceptance checks to identify untestable claims and uncovered behavior."
---

# Requirements To Acceptance Traceability

## Purpose

Make completion auditable by linking each requirement to verifiable outcomes.

## Required inputs

Specification, acceptance criteria, implementation references, tests, known limitations and change history.

## Workflow

1. Break requirements into atomic unique statements and flag ambiguity without changing intent.
2. Map every requirement to implementation/config evidence and an acceptance check.
3. Classify implemented, tested, partial, blocked, obsolete and unverified states based on evidence.
4. Find tests without requirements and requirements without tests, and explain intentional gaps.
5. Update traceability and distinguish executed tests from merely planned checks.

## Validation checklist

- [ ] Requirements are evaluable.
- [ ] Acceptance results link to evidence or an explicit gap.
- [ ] Partial implementation is not marked complete.
- [ ] Unlinked tests are reviewed rather than automatically deleted.
- [ ] Changed requirements trigger review of affected checks.

## Required output

Requirements/evidence matrix, uncovered items and acceptance-check proposals.

## Boundaries and failure handling

Do not manufacture tests for ambiguous behavior or claim runtime behavior from code presence alone.

## Trigger examples

- **Positive:** A release report marks a feature complete without checking a specified failure case.
- **Negative:** Estimating sprint capacity without a requirements set.
