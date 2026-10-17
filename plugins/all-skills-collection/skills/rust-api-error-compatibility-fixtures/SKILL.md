---
name: rust-api-error-compatibility-fixtures
description: Use fixtures to verify that public Rust crates preserve promised error types, variants, display behavior, and source-chain semantics across releases.
---

# Rust API Error Compatibility Fixtures

## Goal

Catch downstream-breaking error API changes that ordinary compilation tests may miss.

## Inputs to inspect

Public error enums/structs, semver policy, release notes, API snapshots, downstream examples and error serialization if applicable.

## Workflow

1. Inventory public error types and distinguish stable programmatic fields/variants from diagnostic display text that is not promised as a compatibility surface.
2. Create compile-time consumer fixtures that pattern-match supported variants and construct documented error wrappers where those operations are public API.
3. Test source-chain behavior, error codes and documented serialization forms only where the crate promises them to consumers.
4. Compare fixtures across the proposed release and classify changes as additive, behavior-changing or breaking under the project's semver policy.
5. Add a compatibility gate and require release notes/migration guidance for intentional changes that affect downstream matching or recovery logic.

## Validation checklist

- [ ] Tests reflect the explicit public API contract rather than freezing every incidental message string.
- [ ] Non-exhaustive and extensibility annotations are considered when interpreting variant additions.
- [ ] Error source chains preserve the intended root cause across wrappers.
- [ ] Intentional breaking changes are documented and released under the correct compatibility policy.

## Required output

A public error-surface inventory, downstream compile fixtures, compatibility diff and release notes for required changes.

## Boundaries and failure handling

Do not declare every diagnostic string stable unless documented; focus checks on explicitly promised behavior.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
