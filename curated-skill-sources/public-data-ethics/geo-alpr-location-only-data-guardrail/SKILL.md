---
name: geo-alpr-location-only-data-guardrail
description: "Constrain ALPR-related map layers to camera-location metadata and prevent plate capture, lookup, or person-level correlation."
---

# Geo ALPR Location Only Data Guardrail

## Purpose

Ensure an installation-location layer stays a geographic inventory rather than becoming a vehicle or individual tracking system.

## Required inputs

Layer schema, source tags, visible properties, query/search fields, export schema, and negative security tests.

## Workflow

1. Define an explicit allowlist of non-identifying camera-location fields needed to show a map point.
2. Inspect source adapters and UI surfaces for license-plate values, vehicle observations, identity fields, or cross-source join keys.
3. Test query, voice, export, and share flows to confirm they cannot request or persist plate-level or person-level records.
4. Document how to remove unexpected sensitive fields and how to audit the layer for schema drift.

## Validation checklist

- [ ] The layer stores/display camera locations and permitted tags only.
- [ ] No plate strings or per-vehicle observations enter the canonical data store.
- [ ] Search and voice cannot use the layer to query a vehicle or person.
- [ ] Fixtures include forbidden fields and prove they are rejected or dropped at ingestion.

## Required output

A field allowlist, forbidden-data test suite, and documented response to sensitive-field leakage.

## Boundaries and failure handling

Do not implement plate recognition, plate lookup, vehicle/person linkage, or individual tracking; location-only metadata is the maximum intended scope.

## Trigger examples

- **Positive:** An ALPR-related public map should show where cameras are tagged without collecting plate reads.
- **Negative:** A request to search plates, identify an owner, or correlate vehicle appearances across locations.
