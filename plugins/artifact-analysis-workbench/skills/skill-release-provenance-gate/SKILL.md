---
name: skill-release-provenance-gate
description: "Performs the final evidence gate for repository-derived skill batches, including license, uniqueness, packaging, and human review."
---

# Skill Release Provenance Gate

## Purpose

Performs the final evidence gate for repository-derived skill batches, including license, uniqueness, packaging, and human review.

## When to use

A skill batch is drafted and must be checked before merge or distribution.

## Required inputs

Source revision, provenance manifest, duplicate decisions, files, bundle, catalog, CI logs, and PR details.

## Workflow

1. Verify source/revision, provenance record, license review, notices, and nested third-party content handling.
2. Check canonical IDs, descriptions/triggers, required sections, expected outputs, links/resources, and placeholder-free files.
3. Review semantic duplicate decisions across sources and mirrors; distinguish file count from canonical skill count.
4. Reconcile generated bundles, manifests, catalogs, roadmaps, READMEs, versions, and CI outputs.
5. Recommend hold/go for human decision; runtime installation and routing remain separate gates unless actually performed.

## Validation checklist

Counts reconcile across source/bundle/docs; every gate is pass/fail/skipped/not-run with evidence.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Release checklist, provenance/duplicate blockers, inventory reconciliation, observed CI states, runtime gaps, and human decision request.

## Boundaries and failure handling

Never merge, publish, or change visibility without approval. Keep private/restricted source material out of public packages.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Review this batch for provenance, semantic duplicates, source/bundle parity, and release blockers.
- **Negative:** Merge automatically because structural CI is green.
