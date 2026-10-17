---
name: patch-field-presence-semantics-contract
description: "Verify that partial-update endpoints distinguish omitted fields, explicit nulls, empty values and unchanged fields consistently across clients and servers."
---

# Patch Field Presence Semantics Contract

## Purpose

Prevent accidental clearing or missed updates when clients encode partial changes and servers conflate absence with null or empty values.

## Required inputs

PATCH schema, server DTO/model mapping, validation rules, generated clients and compatibility fixtures.

## Workflow

1. For each mutable field, document omitted, explicit null, empty string/list/object, default and unchanged meanings.
2. Trace JSON decoding, validation, domain mapping, database updates and response serialization to confirm distinctions survive the full path.
3. Test patching one field while omitting others, clearing nullable values and preserving falsy values such as zero or false.
4. Compare generated SDK types and examples with server behavior where optional and nullable types differ.
5. Verify retries and concurrent updates do not turn omitted fields into overwrites of newer state.

## Validation checklist

- [ ] Omitted versus explicit null is defined per field.
- [ ] Empty and falsy values are not discarded by truthiness checks.
- [ ] Unknown fields and unsupported nulls follow a documented policy.
- [ ] Partial updates do not overwrite unrelated fields.
- [ ] Client schemas match server semantics.

## Required output

A field-presence matrix, request fixtures, schema changes and tests for omission/null/empty/falsy values.

## Boundaries and failure handling

Do not infer that null means delete unless the API contract states so. Do not silently change current partial-update semantics; evaluate compatibility and data-loss risks first.

## Trigger examples

- **Positive:** Sending false leaves a feature flag unchanged because the handler treats false as absent.
- **Negative:** Reviewing a full-replacement PUT endpoint.
