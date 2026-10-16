---
name: voice-agent-result-referent-stability
description: "Keep numbered voice-result references bound to the result set that introduced them, even after refreshes or reordering."
---

# Voice Agent Result Referent Stability

## Purpose

Make follow-up phrases such as 'the second one' deterministic and prevent references from drifting onto unrelated entities.

## Required inputs

Result-card rendering, numbered referent store, result generations, entity IDs, and follow-up parsing tests.

## Workflow

1. Define when a result set receives an immutable referent map and when that map is invalidated.
2. Bind each spoken number to a stable result ID and source metadata rather than current array position alone.
3. Test list refresh, sorting, deleted records, duplicate labels, and multiple voice results in one session.
4. Require re-clarification when the original result set is no longer valid instead of mapping to the new second row.

## Validation checklist

- [ ] Referent IDs are scoped to the result-set generation.
- [ ] Reordering a displayed list does not silently remap an in-flight spoken reference.
- [ ] Expired or removed referents produce a clarification or safe no-op.
- [ ] Tests cover duplicate names and same-number references from different cards.

## Required output

A referent lifetime policy, follow-up test suite, and documented behavior when a result reference expires.

## Boundaries and failure handling

Never resolve ambiguous reference text by guessing a person's identity or combining unrelated sources.

## Trigger examples

- **Positive:** After a live refresh, 'open the third result' selects a different entity than the one originally numbered.
- **Negative:** A request to resolve ambiguous identity by silently merging unrelated people or contact records.
