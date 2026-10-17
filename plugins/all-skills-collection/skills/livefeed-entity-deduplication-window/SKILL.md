---
name: livefeed-entity-deduplication-window
description: "Deduplicate records from overlapping public feeds using stable keys and bounded time windows."
---

# Live Feed Entity Deduplication Window

## Purpose

Reduce duplicate map contacts without merging distinct entities that happen to share partial attributes.

## Required inputs

Canonical entity IDs, provider/source identifiers, timestamp semantics, overlap samples, and downstream selection behavior.

## Workflow

1. Define identity precedence: provider-stable ID, source-scoped ID, and conservative fallback key when no stable ID exists.
2. Choose a time and spatial matching window only for feeds where approximate matching is justified.
3. Build fixtures for duplicate arrivals, ID reuse, delayed packets, near but distinct entities, and source handoff.
4. Verify merge behavior preserves source references and can be reversed or inspected when ambiguity remains.

## Validation checklist

- [ ] Stable provider IDs take precedence over weak similarity scores.
- [ ] IDs are namespaced when providers may reuse the same value.
- [ ] Ambiguous pairs stay separate or are explicitly marked as uncertain.
- [ ] Deduplication does not erase original timestamps or provenance.

## Required output

A deduplication rule table, collision test set, and explainable merge/audit fields.

## Boundaries and failure handling

Do not use this process to identify or correlate private people across camera feeds; keep entity resolution scoped to legitimate public telemetry.

## Trigger examples

- **Positive:** The same public aircraft contact appears twice because sources overlap in coverage.
- **Negative:** A request to join camera observations into a persistent identity profile for an individual.
