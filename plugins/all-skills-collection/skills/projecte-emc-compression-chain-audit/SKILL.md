---
name: projecte-emc-compression-chain-audit
description: "Audits compressing and unpacking recipes across material families. Use when storage blocks, compacted dusts, or dense resources may generate EMC loops."
---

# Compression and Decompression Chain Audit

## Purpose

recipe graph, input/output quantities, current values, and remainder data

## Required inputs

Enumerate all compression and decompression routes and identify cycles with different quantities or outputs.

## Workflow

1. Confirm Minecraft, loader, ProjectE, and modpack versions from the actual target instance; capture exact IDs and config sources. If version evidence is unavailable, stop before proposing changes.
2. Calculate net EMC change across round trips and report recipe paths that create value or break intended ratios.
3. A compression-chain table with round-trip equations, cycle evidence, and proposed fixes.
4. Validate the finding against a disposable fixture, repeatable calculation, or independent data lookup; compare current and proposed behavior and mark unknowns explicitly.
5. Produce never label a loop exploitable without a reproducible path and confirmed recipe availability. with evidence references, confirmed-versus-proposed status, affected IDs, assumptions, confidence, and the next safe action.

## Validation checklist

- [ ] The target version and evidence source are recorded; unknown version details are not guessed.
- [ ] The topic-specific behavior or data relationship has a reproducible check.
- [ ] Inputs, quantities, units, gates, or other assumptions relevant to the decision are explicit.
- [ ] Proposed values are distinguished from confirmed values and include rationale or a review-needed status.
- [ ] No production config/world is changed without backup, scoped diff, and rollback path.

## Required output

Never label a loop exploitable without a reproducible path and confirmed recipe availability.

## Boundaries and failure handling

A packed material can be unpacked and converted into more EMC than it costs. If recipe, registry, format, or runtime evidence is incomplete, mark the result unknown and name the smallest additional evidence needed. Do not claim universal coverage or successful balancing without measurable validation.

## Trigger examples

- **Positive:** No reverse or related conversion recipe exists.
- **Negative:** undefined
