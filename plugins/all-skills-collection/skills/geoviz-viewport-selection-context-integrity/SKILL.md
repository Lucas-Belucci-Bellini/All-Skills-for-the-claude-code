---
name: geoviz-viewport-selection-context-integrity
description: "Keep a selected map feature's metadata, owning layer, and viewport context consistent across click, follow, and removal."
---

# GeoViz Viewport Selection Context Integrity

## Purpose

Ensure that selecting a rendered entity resolves to the correct source record and becomes invalid safely when its layer or record disappears.

## Required inputs

Picking and selection code, entity metadata registry, layer IDs, stale-record behavior, and interaction tests.

## Workflow

1. Trace hit-testing from screen position to rendered feature, canonical entity ID, source record, and displayed metadata.
2. Document the lifetime and owner of registered selection context, including duplicate IDs from different providers.
3. Test overlapping entities, source refresh, layer disable, and selection of a record that is removed mid-interaction.
4. Verify that follow or inspect actions revalidate the selected entity before using its metadata.

## Validation checklist

- [ ] A picked object resolves only to the context registered for that object and layer.
- [ ] Duplicate provider IDs cannot silently alias different entities.
- [ ] Removed or disabled entities clear owned selection and disable stale actions.
- [ ] Selection tests include overlapping and delayed-update scenarios.

## Required output

An interaction-to-metadata trace, ownership map, and regression suite for stale or ambiguous selections.

## Boundaries and failure handling

Keep testing synthetic or public aggregate features; do not enrich a selection with private-person identity data.

## Trigger examples

- **Positive:** Clicking an overlay sometimes opens metadata belonging to a different layer after refresh.
- **Negative:** A request to infer a private identity from map selection or unrelated public records.
