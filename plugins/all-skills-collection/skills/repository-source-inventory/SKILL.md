---
name: repository-source-inventory
description: "Creates an immutable, evidence-linked inventory of an upstream repository before its contents are used to design skills."
---

# Repository Source Inventory

## Purpose

Creates an immutable, evidence-linked inventory of an upstream repository before its contents are used to design skills.

## When to use

Understand what is actually present before drafting skills from a repository.

## Required inputs

Repository URL/path, selected revision or commit, user goal, and existing skill catalog.

## Workflow

1. Record the repository URL, selected revision/commit, date of inspection, and whether the checkout is partial.
2. Inspect README, contribution guidance, root/nested license and NOTICE files, package manifests, layout, and CI/test workflows.
3. Identify generated, vendored, archived, binary, mirrored, and third-party paths that should not be treated as original source by default.
4. Map packages, entry points, public interfaces, examples, tests, docs, and extension points with path-level references.
5. Separate inspected facts from README claims, inferences, inaccessible files, and unresolved questions.

## Validation checklist

Every capability claim links to a path or is marked inferred/unverified; revision and partial-checkout limits are explicit.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Source inventory with revision, inspected paths, package map, source types, license pointers, coverage limits, and prioritized evidence gaps.

## Boundaries and failure handling

Do not copy upstream content during inventory. Public visibility or possession of a clone is not blanket permission for every type of reuse; redact accidentally exposed secrets.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Inspect this repository and make an inventory with exact modules, tests, docs, and evidence gaps.
- **Negative:** Generate skills from README headings alone and treat every feature as implemented.
