---
name: livefeed-source-timestamp-normalization
description: "Normalize source timestamps, retrieval timestamps, and timezone assumptions before combining live data."
---

# Live Feed Source Timestamp Normalization

## Purpose

Prevent cross-feed sorting and staleness calculations from mixing event time with ingestion time.

## Required inputs

Raw provider timestamp formats, canonical time fields, timezone assumptions, invalid sample fixtures, and consumers.

## Workflow

1. Inventory each timestamp field with its meaning, unit, timezone, and nullable conditions.
2. Normalize valid values to a consistent UTC representation while preserving the raw field when auditability requires it.
3. Define handling for seconds-versus-milliseconds ambiguity, invalid date strings, future values, and missing time.
4. Compare multi-source sorting, age calculations, and exports with fixtures representing skew and mixed precision.

## Validation checklist

- [ ] Source time and retrieval time are stored separately.
- [ ] Unit conversion does not accidentally shift milliseconds by a factor of one thousand.
- [ ] Invalid or implausible times become unknown/degraded rather than current.
- [ ] Sorting and staleness tests cover mixed source formats.

## Required output

A timestamp schema, conversion tests, and a field-level list of provider assumptions.

## Boundaries and failure handling

Do not invent precision that the source never supplied; preserve uncertainty instead of guessing a precise event time.

## Trigger examples

- **Positive:** Different feeds appear out of order because one sends epoch seconds and another sends milliseconds.
- **Negative:** A request to change source timestamps to make events appear more recent than they are.
