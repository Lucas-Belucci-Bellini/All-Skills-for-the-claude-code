---
name: asset-bundle-content-addressing
description: Design content-addressed asset bundles with stable hashes, dependency manifests, integrity checks, and safe cache invalidation.
---

# Asset Bundle Content Addressing

## Goal

Make packaged game assets reproducible and cacheable without serving stale, corrupted or mismatched dependencies.

## Inputs to inspect

Asset package builder, bundle manifests, content hashes, compression/encryption stages if present, cache keys and patch delivery flow.

## Workflow

1. Define the canonical byte representation used for hashing and specify whether metadata, importer version, platform variant and compression settings belong in the identity.
2. Build a manifest that maps stable asset identifiers to content hashes, sizes, formats, dependencies and compatible runtime/build versions.
3. Verify hashes after packaging and after cache/download reads; ensure deterministic packaging does not depend on filesystem traversal order or timestamps.
4. Exercise same-name/different-content assets, renamed assets, partial downloads, corrupted cache entries and bundle rollback to confirm invalidation is content-based.
5. Measure bundle deduplication, download/patch size and lookup overhead, then define manifest migration and garbage-collection rules for unreferenced blobs.

## Validation checklist

- [ ] The same canonical content produces the intended stable hash across repeated builds on supported environments.
- [ ] Hash identity includes all inputs that can materially change runtime interpretation.
- [ ] A mismatch is rejected before the asset is used and triggers a defined cache repair path.
- [ ] Manifest references cannot escape the package root or point to incompatible asset variants.

## Required output

A bundle identity specification, manifest example, integrity/cache tests, and measured patch/deduplication results.

## Boundaries and failure handling

Do not treat a matching filename or manifest entry as integrity proof; do not use content hashes as access-control secrets.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
