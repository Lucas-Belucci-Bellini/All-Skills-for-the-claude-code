---
name: repository-to-skill-batch-planner
description: "Plans a bounded skill batch from an evidence-backed capability map while accounting for license, duplication, validation, and review cost."
---

# Repository To Skill Batch Planner

## Purpose

Plans a bounded skill batch from an evidence-backed capability map while accounting for license, duplication, validation, and review cost.

## When to use

Turn a large repository into a small, reviewable batch instead of generating speculative files at scale.

## Required inputs

Source inventory, capability map, workflow cards, duplicate findings, reviewer capacity, and release gates.

## Workflow

1. Start from an immutable revision and source-backed capability map.
2. Rank candidates by user value, evidence quality, distinctness from catalog, maintenance cost, and safety risk.
3. Choose a pilot of 10–25 candidates and map prerequisites, shared sources, dependencies, and reviewer roles.
4. Reserve effort for provenance, semantic dedup, routing evaluation, structure, generated bundle checks, and human PR review.
5. Define go/no-go criteria; let the next batch depend on evidence and review findings rather than a quota.

## Validation checklist

Every planned skill has evidence and distinct scope; the pilot remains small enough to review and weak candidates are held back.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Dependency-aware batch plan with candidate IDs, source refs, priority, expected files, validation, reviewer owners, and stop/go gates.

## Boundaries and failure handling

Never auto-publish/merge or turn target count into a quota. Respect source access and licensing constraints.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Plan a pilot batch from this repo with provenance, duplicate review, tests, and PR gates.
- **Negative:** Generate thousands of speculative skills in one batch without an inventory.
