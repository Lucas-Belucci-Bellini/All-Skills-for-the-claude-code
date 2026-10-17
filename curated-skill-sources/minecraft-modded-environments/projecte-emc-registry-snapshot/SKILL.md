---
name: projecte-emc-registry-snapshot
description: "Captures a versioned snapshot of registered item identifiers before any EMC analysis. Use when starting an audit or comparing runs."
---

# ProjectE EMC Registry Snapshot

## Purpose

Create a reproducible list of actual item IDs from the runtime registry.

## Required inputs

Registry API/output, mod list, data packs, ProjectE version, and loader version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Capture canonical registry IDs, namespaces, stable names, and variant/subtype keys.
3. Record pack version, collection method, timestamp, failed queries, and registry counts.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a versioned registry snapshot with row counts, duplicate candidates, read failures, and provenance metadata. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A versioned registry snapshot with row counts, duplicate candidates, read failures, and provenance metadata.

## Boundaries and failure handling

Never infer registered items from a wiki or an assumed ATM10 release when runtime evidence is available. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A ProjectE balance audit needs a reproducible list of actual item IDs.
- **Negative:** The task only changes prose and does not inspect a modpack registry.
