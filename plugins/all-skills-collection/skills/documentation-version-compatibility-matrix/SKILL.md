---
name: documentation-version-compatibility-matrix
description: "Build version-aware docs mapping setup steps, flags, APIs and migrations to supported releases."
---

# Documentation Version Compatibility Matrix

## Purpose

Prevent users from applying current instructions to older releases or mixing incompatible migration guidance.

## Required inputs

Supported version policy, docs tree, release notes, removed settings, APIs and migration guides.

## Workflow

1. Enumerate supported releases and pages that depend on version-specific behavior.
2. Trace each version-sensitive claim to a release note, source tag, schema or test fixture.
3. Record availability, changed behavior, deprecation and migration path for each feature.
4. Flag unqualified examples that imply a feature exists across versions when it does not.
5. Define how end-of-life docs are archived or labeled instead of silently overwritten.

## Validation checklist

- [ ] Supported versions and maintenance policy are explicit.
- [ ] Settings and API behavior have source evidence.
- [ ] Migration guidance covers relevant breaking changes.
- [ ] Version assumptions appear in examples where needed.
- [ ] Expired support claims are not presented as current.

## Required output

Feature/version matrix, inconsistent claims and sustainable review schedule.

## Boundaries and failure handling

Do not infer support policy solely from tags. Mark unknown compatibility rather than guessing.

## Trigger examples

- **Positive:** A guide uses a setting introduced after one supported release.
- **Negative:** Editing one release note without a cross-version doc question.
