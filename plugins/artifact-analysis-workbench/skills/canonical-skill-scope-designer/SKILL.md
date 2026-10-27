---
name: canonical-skill-scope-designer
description: "Defines one distinct canonical skill identity, triggers, exclusions, prerequisites, and output contract from observed capability."
---

# Canonical Skill Scope Designer

## Purpose

Defines one distinct canonical skill identity, triggers, exclusions, prerequisites, and output contract from observed capability.

## When to use

A candidate looks useful but may overlap an existing skill or be too broad to execute reliably.

## Required inputs

Workflow card, source evidence, nearby catalog entries, and expected deliverable.

## Workflow

1. State the user task in one sentence and identify the artifact the skill must produce.
2. Define a positive trigger and at least three neighboring negative triggers using actual catalog entries.
3. Specify prerequisites, inputs, scope, workflow, decision points, output, validation, recovery, and stop conditions.
4. Compare intent, inputs, method, and deliverables against the closest existing skills before accepting the identity.
5. Split only when subworkflows require meaningfully different decisions or outputs; merge naming/wording variants.

## Validation checklist

A reviewer can identify when to invoke the skill, what it returns, and which neighboring tasks are excluded.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Canonical skill name, trigger contract, negative triggers, prerequisites, deliverable, and semantic-overlap rationale.

## Boundaries and failure handling

Do not inflate counts with aliases, translations, broad domain labels, or minor rewrites. Avoid unsupported promises.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Design a precise scope and trigger boundary for a new skill from this repo.
- **Negative:** Rename an existing skill and count it as new without a substantive workflow difference.
