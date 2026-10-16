---
name: scene-replay-data-pack-manifest
description: "Validate a replay data-pack manifest for file identity, timestamps, coordinate coverage, licensing notes, and deterministic ordering."
---

# Scene Replay Data Pack Manifest

## Purpose

Make bundled replay data inspectable and reproducible without confusing packaged historical records with live observations.

## Required inputs

Replay manifest schema, data-pack file list, source notes, temporal bounds, hash conventions, and replay loader.

## Workflow

1. Inventory every referenced asset with path, hash, data role, source, time range, and permission/attribution note.
2. Validate referenced files exist and their hashes match the manifest before playback starts.
3. Check that temporal ordering, coordinate reference, and unit assumptions are consistent across pack entries.
4. Load a small representative replay and verify the UI labels it as replayed/bundled data rather than live feed.

## Validation checklist

- [ ] Manifest paths remain within the pack root and cannot escape via traversal.
- [ ] Missing or changed files produce an explicit validation error.
- [ ] Time ranges and coordinate/unit metadata are required where the consumer depends on them.
- [ ] Data source and license references travel with the pack.

## Required output

A replay-pack conformance report, manifest schema, integrity results, and source-attribution checklist.

## Boundaries and failure handling

Do not package third-party datasets just because the source code license is permissive; review each data asset's terms separately.

## Trigger examples

- **Positive:** A shared flood or weather scene needs a reproducible data pack with hashes and provenance.
- **Negative:** A request to bundle a third-party dataset while ignoring its non-commercial or attribution restrictions.
