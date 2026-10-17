---
name: projecte-emc-fluid-container-integrity
description: "Checks EMC behavior for empty, full, and partially filled containers. Use for buckets, cells, tanks, or canisters."
---

# ProjectE Fluid Container EMC Integrity

## Purpose

Determine whether stored fluid and amount participate in EMC lookup.

## Required inputs

Container IDs, fluid component model, fill states, recipes, and ProjectE version.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and configuration sources. If version evidence is unavailable, stop before proposing changes.
2. Test empty, filled, and partial states with harmless fixtures; record serialization and lookup result.
3. Compare fill/empty transitions, crafting remainders, and container output for value or content laundering.
4. Validate findings with a disposable fixture or independent lookup, compare current and proposed behavior, and mark unresolved data rather than filling gaps with assumptions.
5. Produce a container integrity matrix with value changes, reproductions, and format limitations. with source references, confirmed-versus-proposed status, confidence, affected IDs, and the next safe action.

## Validation checklist

- [ ] Target versions and evidence sources are recorded; unknown version details are not guessed.
- [ ] Item identifiers and quantities are confirmed against target registry/config rather than display names alone.
- [ ] The topic-specific behavior has an observable reproduction or data check.
- [ ] Proposed values are distinct from confirmed values and include a justification or a clear review-needed state.
- [ ] No production world/config is changed without backup, scoped diff, and rollback path.

## Required output

A container integrity matrix with value changes, reproductions, and format limitations.

## Boundaries and failure handling

Never treat container names as proof that stored contents are considered by EMC. If registry, recipe, format, or runtime evidence is incomplete, mark the result unknown and state the smallest additional evidence needed. Do not claim that all EMC values are configured or balanced without measurable coverage and validation.

## Trigger examples

- **Positive:** A filled container might transmute for the empty container's value and retain fluid.
- **Negative:** The container has no stored state or the implementation rejects it consistently.
