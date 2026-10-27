---
name: semantic-skill-dedup-review
description: "Compares proposed skills against source, catalog, plugin, and imported copies for duplicate intent, workflow, inputs, triggers, and outputs."
---

# Semantic Skill Dedup Review

## Purpose

Compares proposed skills against source, catalog, plugin, and imported copies for duplicate intent, workflow, inputs, triggers, and outputs.

## When to use

Prevent a central library from accumulating skills that differ only by name or phrasing.

## Required inputs

Candidate skill, canonical catalog, sources, plugin mirrors, imported packs, and adjacent skills.

## Workflow

1. Search the canonical catalog, source folders, bundle mirrors, imported packs, aliases, and nearby descriptions.
2. Compare user intent, prerequisites, input/output contract, decision logic, verification, and failure recovery—not filenames alone.
3. Classify each candidate as exact duplicate, near duplicate, complementary layer, justified specialization, or novel.
4. Recommend keep, merge, retain as reference, or reject; name neighboring entries and cite evidence.
5. Recompute canonical count only after exact subtree de-dup and human decisions on semantic overlap are recorded.

## Validation checklist

A reviewer can reproduce why every retained skill is distinct; aliases and bundle mirrors do not increment count.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Candidate comparison matrix, duplicate findings, keep/merge/hold decisions, canonical owner, and count implications.

## Boundaries and failure handling

Automated similarity cannot prove uniqueness. Preserve uncertainty and require human review for ambiguous scopes.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Compare this new batch with the catalog and decide which skills are truly distinct.
- **Negative:** Treat every unique filename as a unique skill regardless of the workflow.
