---
name: polyglot-multi-runtime-test-fixture-reconciliation
description: "Original polyglot engineering workflow for verify equivalent behavior across language-specific implementations across independently versioned language runtimes."
---

# Multi-runtime test-fixture reconciliation

## Purpose

Verify equivalent behavior across language-specific implementations. This skill coordinates language boundaries without assuming equivalent-looking types, error models, numeric behavior, or runtime guarantees are interchangeable.

## When to use

Use when one product contains two or more of the 31 profile languages, or when an implementation must interoperate with another runtime, toolchain, or artifact format.

## Required inputs

Shared fixtures, expected outputs, runtime versions, locale/time assumptions, and test commands.

## Workflow

1. Inventory every participating language, compiler/interpreter version, runtime, generated client, and boundary owner.
2. Define a language-neutral contract with explicit field presence, numeric ranges, encoding, ordering, error semantics, versioning, and compatibility rules.
3. Map each neutral concept to native types and runtime behavior in every language; record lossy conversions and unsupported states.
4. Build shared fixtures covering valid, boundary, malformed, missing, oversized, and version-skewed payloads.
5. Implement adapters at explicit boundaries; do not leak one runtime's internal types or exception model into another.
6. Run contract tests in each supported runtime and compare normalized results, failure behavior, and serialization round trips.
7. Publish the compatibility matrix, commands, observed results, migration/rollback notes, and unresolved mismatches.

## Validation checklist

- [ ] Every participating language and runtime version is pinned or explicitly constrained.
- [ ] Schema, nullability, numeric precision, encoding, and error behavior are specified.
- [ ] Shared fixtures are consumed by all implementations without hand-edited expected values.
- [ ] Round-trip, negative, boundary, and version-skew tests are included.
- [ ] Non-equivalent behavior is documented as a deliberate contract difference.

## Required output

A cross-language contract, adapter map, compatibility matrix, shared fixture set, test evidence, and unresolved semantic differences.

## Boundaries and failure handling

Do not silently coerce data, erase precision, swallow errors, or claim compatibility from compilation alone. Do not generate or execute untrusted native code. If a runtime cannot be tested, mark it unverified and provide the exact validation command and environment needed.

## Trigger examples

- **Positive:** Validate this TypeScript API against the Rust and Python implementations using shared fixtures.
- **Negative:** Assume all runtimes serialize dates, integers, errors, and null values identically.
