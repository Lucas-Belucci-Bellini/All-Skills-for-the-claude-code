---
name: livefeed-data-fallback-provenance-labeling
description: "Retain data-source lineage and fallback status when live providers are replaced by cached or alternate records."
---

# Live Feed Data Fallback Provenance Labeling

## Purpose

Ensure downstream layers and answers never hide which source actually supplied an observation.

## Required inputs

Provider registry, cache keys, fallback adapters, canonical records, UI badges, and export schema.

## Workflow

1. Define provenance fields for origin provider, retrieval path, cached/fallback flag, and source timestamp.
2. Trace field preservation from adapter through deduplication, UI render, voice summary, and export.
3. Force primary-provider failure and verify alternate/cache records keep their own identity and freshness.
4. Test serialization/deserialization to ensure provenance survives sharing without leaking credentials.

## Validation checklist

- [ ] Fallback status is visible wherever freshness or confidence matters.
- [ ] Source identity never defaults to the intended provider when a different one returned the data.
- [ ] Cached results retain the age of the source observation.
- [ ] Exports include permitted lineage fields but not authorization secrets.

## Required output

A provenance schema, source-transition fixtures, and UI/export assertions for fallback labeling.

## Boundaries and failure handling

Do not present multi-source agreement as independent confirmation when the sources share an upstream dataset.

## Trigger examples

- **Positive:** The app silently shows cached or alternate-provider data under the primary provider's label.
- **Negative:** A request to disguise a fallback or claim independent verification without evidence.
