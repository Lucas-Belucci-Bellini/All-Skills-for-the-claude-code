---
name: test-fixture-to-skill-validation
description: "Uses repository tests and sanitized fixtures to turn a candidate skill's claims into repeatable checks and examples."
---

# Test Fixture To Skill Validation

## Purpose

Uses repository tests and sanitized fixtures to turn a candidate skill's claims into repeatable checks and examples.

## When to use

Validate a skill against available tests, examples, schemas, or safe fixtures.

## Required inputs

Draft skill, source-backed behavior contract, sanitized fixtures, and local test instructions.

## Workflow

1. Choose fixtures that match intended input and contain no secrets/private data.
2. Trace each expected result to an existing test, source contract, approved reference implementation, or reviewed fixture.
3. Add positive, negative, boundary, malformed-input, missing-prerequisite, and recovery cases as appropriate.
4. Document commands, environment, dependencies, flaky behavior, and whether each test actually ran or was only designed.
5. Separate validation of skill instructions from validation of the underlying product feature.

## Validation checklist

Each main claim has a concrete check or explicit no-oracle note; unexecuted checks are never marked passed.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Fixture/test map, expected-versus-observed matrix, sanitized examples, environment notes, and open coverage gaps.

## Boundaries and failure handling

Do not mutate production data or contact external systems to create fixtures without authorization; preserve provenance and redact user values.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Use this repo's tests to build safe fixtures and a validation checklist for the new skill.
- **Negative:** Mark a skill complete just because the repo has a test directory.
