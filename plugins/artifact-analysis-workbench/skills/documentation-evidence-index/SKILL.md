---
name: documentation-evidence-index
description: "Builds a retrieval index connecting recurring user questions to authoritative repository source paths, examples, tests, and versioned docs."
---

# Documentation Evidence Index

## Purpose

Builds a retrieval index connecting recurring user questions to authoritative repository source paths, examples, tests, and versioned docs.

## When to use

Help skill authors find the smallest reliable source for each task and claim.

## Required inputs

Documentation tree, version/release info, common questions, and inspected repository revision.

## Workflow

1. Inventory docs by topic, version, audience, source authority, and maintenance state.
2. Link each recurring question to the smallest relevant page, symbol, example, test, or command reference.
3. Flag stale links, duplicates, version conflicts, redirects, and roadmap text presented as released behavior.
4. Prefer original summaries and stable commit/version links; keep direct quotations short.
5. Produce a lookup structure downstream skills can use without copying entire documentation pages.

## Validation checklist

Representative questions resolve to authoritative evidence; stale/non-authoritative sources are marked.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Question-to-source index with topic, canonical path/URL, version/revision, evidence type, staleness warnings, and unresolved links.

## Boundaries and failure handling

Do not publish private docs or reproduce long copyrighted passages. Respect source access controls and licenses.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Map recurring questions to the best documentation, example, and test references.
- **Negative:** Copy the entire docs folder into every new skill.
