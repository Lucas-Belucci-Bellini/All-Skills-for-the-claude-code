---
name: public-data-source-terms-matrix
description: "Build a per-source terms matrix covering collection method, permitted use, quotas, retention, attribution, and redistribution."
---

# Public Data Source Terms Matrix

## Purpose

Keep application code, public feeds, packaged datasets, and third-party assets under their correct separate terms.

## Required inputs

Source registry, provider terms and licenses, bundled-data inventory, app features using each source, and deployment context.

## Workflow

1. List every live provider, bundled dataset, imagery/3D asset, and external service independently.
2. Record license/terms URL, attribution, commercial-use restrictions, quotas, retention rules, and whether redistribution is allowed.
3. Map each source to the code paths and features that display, cache, export, or bundle it.
4. Flag unknown, conflicting, or non-commercial terms for human review before enabling the affected distribution path.

## Validation checklist

- [ ] Source code license is not assumed to cover third-party data or 3D assets.
- [ ] Every bundle item has a source and current permission record or an explicit unresolved status.
- [ ] Commercial and non-commercial uses are evaluated separately.
- [ ] Changes to a provider or dataset trigger a terms review.

## Required output

A source-to-feature terms matrix, unresolved-rights queue, and clear go/no-go gates for distribution.

## Boundaries and failure handling

This workflow organizes evidence, not legal advice; unresolved or contradictory terms must be escalated rather than guessed.

## Trigger examples

- **Positive:** A geospatial app mixes MIT-licensed code with imagery, public extracts, and provider APIs.
- **Negative:** A request to declare all packaged content MIT-licensed because the top-level repository uses MIT.
