---
name: agent-shared-state-version-conflict-resolution
description: "Detects and resolves concurrent writes to shared agent state using explicit versions and merge rules. Use when several workers can update the same record or artifact."
---

# Agent Shared State Version Conflict Resolution

## Purpose

Avoid last-writer-wins data loss and retain a reviewable history of competing edits.

## Required inputs

Shared schema, revision token, writer permissions, merge-safe fields, conflict policy, and store capabilities.

## Workflow

1. Give every mutable object a revision token and require writers to provide the version they observed.
2. Use conditional updates or compare-and-swap so stale writers cannot silently overwrite current state.
3. Classify fields as mergeable, append-only, derived, or single-writer to define safe conflict handling.
4. On conflict, reload current state and apply only explicit field-level merge rules.
5. Send unresolved semantic conflicts to an authorized adjudicator instead of choosing by timestamp or text length.
6. Retain prior revisions and record both proposed changes plus the selected resolution.

## Validation checklist

- [ ] Every mutation references an observed revision.
- [ ] Stale writes fail visibly.
- [ ] Merge behavior is field-specific and tested with concurrent updates.
- [ ] Conflict history is retained without unnecessary private payloads.

## Required output

A versioned state schema, conditional-write contract, merge policy, and concurrent-writer fixtures.

## Boundaries and failure handling

If the store cannot update conditionally, serialize ownership or add a suitable persistence mechanism before claiming concurrency safety.

## Trigger examples

- **Positive:** Two workers edit one shared project plan concurrently.
- **Negative:** A single writer creates an immutable output.
