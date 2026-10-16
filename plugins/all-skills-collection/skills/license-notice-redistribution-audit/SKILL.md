---
name: license-notice-redistribution-audit
description: "Use when packaging third-party skills, templates, or docs for redistribution and checking attribution/notice completeness; not for legal advice."
---

# License Notice Redistribution Audit

## Purpose

Find missing attributions and license notices before a package is distributed.

## Required inputs

Source inventory, upstream repository/revision, license text, file notices, modification history, and package inclusion rules.

## Workflow

1. Map every imported/adapted component to source revision, license status, and file-level notice requirements.
2. Inspect actual license and notice text for terms potentially relevant to copying, modification, and distribution.
3. Compare source obligations with package LICENSE, NOTICE, acknowledgements, and per-skill notices.
4. Flag ambiguous/missing terms for authorized review and quarantine uncertain material pending a decision.

## Verification checklist

- [ ] Every imported component has a recorded source and license status or is marked unknown.
- [ ] Required notices and license texts are preserved.
- [ ] A repository name or license filename alone is not treated as clearance.
- [ ] Upstream material and local modifications remain distinguishable.

## Required output

A source/notice matrix, missing-notice list, package exclusions, and items for qualified review.

## Boundaries and failure handling

This is an engineering inventory, not legal advice; do not claim redistribution rights are cleared without evidence.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A plugin bundle combines skills from several upstream repositories.
- **Negative:** Evaluating skill workflow quality without a distribution question.
