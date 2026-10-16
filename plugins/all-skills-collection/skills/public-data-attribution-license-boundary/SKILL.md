---
name: public-data-attribution-license-boundary
description: "Verify in-product attribution and license notices match the exact active data sources and redistributed assets."
---

# Public Data Attribution License Boundary

## Purpose

Keep attribution visible and preserve license boundaries even when map modes, recordings, and bundles change.

## Required inputs

Source terms matrix, credit registry, UI modes, bundle manifests, data notices, and distribution checklist.

## Workflow

1. Translate source terms into required text, link, location, display duration, and redistribution-notice rules.
2. Trace credits from provider registration through active layers, clean view, export, and downloaded bundle.
3. Check that third-party datasets and models keep adjacent notices where required and are not relabeled as project-owned.
4. Exercise source disable/replace and export paths to ensure only the correct credits and notices are included.

## Validation checklist

- [ ] Active provider credits match the documented source and terms.
- [ ] Recording and clean-view modes preserve required attribution.
- [ ] Redistributed assets carry their required notice or are excluded pending review.
- [ ] Fallback sources update attribution rather than inheriting the previous provider's label.

## Required output

An attribution test matrix, missing-notice report, and source-specific remediation list.

## Boundaries and failure handling

Do not remove credits or assume that source-code permissions override a dataset's own license.

## Trigger examples

- **Positive:** Provider switching or recording hides the license credits required by an imagery source.
- **Negative:** A request to strip attribution or present third-party assets as original project work.
