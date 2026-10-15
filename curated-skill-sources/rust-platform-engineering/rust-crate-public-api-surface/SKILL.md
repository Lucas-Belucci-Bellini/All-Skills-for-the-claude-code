---
name: rust-crate-public-api-surface
description: Reduce and document a Rust crate's public API by separating intentional entrypoints from accidental exports and unstable internals.
---

# Rust Crate Public Api Surface

## Goal

Keep library APIs understandable, testable, and maintainable as internal implementation grows.

## Inputs to inspect

Module tree, `pub` exports, re-exports, feature gates, docs, and downstream use examples.

## Workflow

1. Inventory public modules, types, traits, functions, macros, and re-exports; identify which are documented and intended for external use.
2. Trace each public item to a supported user task and determine whether callers need to depend on it directly or a narrower facade is sufficient.
3. Check leaked internal dependency types, generic bounds, hidden implementation details, and feature-specific APIs that are not represented in docs.
4. Propose visibility changes or curated re-exports in small groups, preserving required downstream paths or adding deprecation windows.
5. Build rustdoc with warnings, compile external-style examples, and compare the exported API before and after the change.

## Validation checklist

- [ ] Every public export has a purpose and appropriate documentation.
- [ ] Private implementation types are not exposed unintentionally in signatures.
- [ ] Feature-gated APIs are accurately documented and tested.
- [ ] Visibility reductions include a compatibility/deprecation decision.
- [ ] Examples compile from an external consumer context.

## Required output

Deliver a public API inventory, intended facade proposal, compatibility risk table, and automated external-consumer checks.

## Boundaries and failure handling

Do not privatize symbols without checking their existing consumer contract; do not expose internals just to bypass module-boundary design.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
