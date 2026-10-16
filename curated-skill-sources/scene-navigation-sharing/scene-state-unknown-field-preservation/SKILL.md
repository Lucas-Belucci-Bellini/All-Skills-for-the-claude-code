---
name: scene-state-unknown-field-preservation
description: "Check how scene parsers handle unknown fields so forward-compatible metadata is not silently destroyed."
---

# Scene State Unknown Field Preservation

## Purpose

Allow newer producers and older consumers to exchange scene state without corrupting fields the consumer does not understand.

## Required inputs

Scene schema, parser/serializer, unknown-field policy, compatibility fixtures, and state round-trip tests.

## Workflow

1. Classify fields as required, known-optional, vendor extension, or unknown according to the document contract.
2. Trace parsing and serialization to see whether unrecognized keys are dropped, preserved, or rejected.
3. Round-trip fixtures containing future-version fields at root and nested object levels.
4. Verify security-sensitive or action-like fields are not activated merely because they are preserved.

## Validation checklist

- [ ] Unknown-data policy is explicit at each schema boundary.
- [ ] Preserved unknown fields survive round-trip where compatibility requires it.
- [ ] Unknown action fields cannot trigger execution or external requests.
- [ ] Tests cover both nested and root-level extension fields.

## Required output

An unknown-field policy, round-trip test suite, and compatibility gaps by schema location.

## Boundaries and failure handling

Preserving bytes is not the same as trusting their semantics; never execute or honor unrecognized commands.

## Trigger examples

- **Positive:** An older client saves a scene created by a newer version and drops metadata it does not recognize.
- **Negative:** A request to run unknown fields as actions because they were present in a shared scene.
