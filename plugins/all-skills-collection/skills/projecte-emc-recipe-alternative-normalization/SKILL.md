---
name: projecte-emc-recipe-alternative-normalization
description: "Normalizes alternate recipe ingredients before deriving candidate EMC values. Use when recipes accept tags or several equivalent inputs."
---

# Recipe Alternative Normalization

## Purpose

recipe entries, ingredient tags, alternatives, quantities, output count, and pack version

## Required inputs

Expand each alternative into a separate normalized path while preserving tag membership and version-specific recipe IDs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare the EMC outcome for each valid alternative and detect cheap-substitute paths that undercut the intended tier.
3. A recipe-alternative ledger with per-path quantities, calculated value, and flagged substitutions.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not assume tag alternatives are identical in cost or availability. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not assume tag alternatives are identical in cost or availability.

## Boundaries and failure handling

A machine recipe accepts multiple ores or ingredients through tags. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** The recipe has one fixed ingredient path.
- **Negative:** undefined
