---
name: projecte-emc-config-schema-version-check
description: "Verifies that the target EMC data format matches the installed ProjectE version. Use before generating or editing any EMC file."
---

# ProjectE EMC Configuration Schema Version Check

## Purpose

installed JAR/version, config files, official source/docs for that version, and current parser behavior

## Required inputs

Identify the canonical format and load location by checking the installed version and relevant upstream implementation/documentation.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Validate a sample file and determine naming, value, merge, reload, and error behavior before exporting a full table.
3. A schema compatibility note with sample validation evidence and unsupported fields.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce never assume a file path, json shape, or command matches a different projecte release. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Never assume a file path, JSON shape, or command matches a different ProjectE release.

## Boundaries and failure handling

An automated tool needs to emit EMC assignments for the user's modpack. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The task only analyzes values without reading or writing config files.
- **Negative:** undefined
