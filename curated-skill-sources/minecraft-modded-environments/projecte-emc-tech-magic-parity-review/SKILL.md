---
name: projecte-emc-tech-magic-parity-review
description: "Compares similar progression costs between technology and magic mod branches. Use when one branch offers a much cheaper route to equivalent capability."
---

# ProjectE Technology and Magic Tier Parity Review

## Purpose

tech/magic progression graphs, role-equivalent items, recipes, gates, and balance profile

## Required inputs

Match items by capability and tier rather than namespace or visual appearance.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Compare prerequisites, acquisition cost, automation, risk, and EMC values; flag asymmetry that may be intentional or accidental.
3. A parity table with matched capabilities, observed discrepancies, and explicit exception rationale.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce do not force equal emc values when branch mechanics or pack goals differ materially. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Do not force equal EMC values when branch mechanics or pack goals differ materially.

## Boundaries and failure handling

A magic route may produce a tech-tier capability much earlier and cheaper. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No equivalent capabilities can be identified.
- **Negative:** undefined
