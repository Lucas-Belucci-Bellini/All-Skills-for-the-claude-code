---
name: geoviz-coordinate-input-normalization
description: "Normalize coordinate text and validate latitude, longitude, and altitude inputs before map navigation."
---

# GeoViz Coordinate Input Normalization

## Purpose

Give typed coordinate search one predictable interpretation across decimal degrees, signed values, and supported coordinate formats.

## Required inputs

Accepted coordinate formats, parser/formatter code, locale rules, input examples, and map-navigation contract.

## Workflow

1. Document accepted formats and unambiguous separators; distinguish coordinate-like text from ordinary place names.
2. Parse into a typed coordinate record, normalizing whitespace, sign, decimal separator policy, and optional altitude.
3. Reject out-of-range, partial, non-finite, or ambiguous input with actionable feedback rather than guessing.
4. Round-trip valid samples through formatter and parser, including boundaries and negative hemispheres.

## Validation checklist

- [ ] Latitude and longitude range checks run before any network request or camera mutation.
- [ ] Decimal commas and locale-specific separators follow an explicit rule.
- [ ] Malformed values cannot be misread as a valid location.
- [ ] Parser and formatter tests include boundary, signed, and whitespace cases.

## Required output

A format grammar, parser test matrix, user-facing validation messages, and documented normalization rules.

## Boundaries and failure handling

Do not geolocate arbitrary names as coordinates based on loose substring matching; do not transmit invalid input to providers before validation.

## Trigger examples

- **Positive:** Coordinate search accepts some signed inputs but mishandles west or south coordinates.
- **Negative:** A request to discover someone's exact home address from partial coordinates or personal clues.
