---
name: multi-agent-skill-release-manifest
description: "Produces a release manifest for a skill batch across canonical sources and provider packages. Use when publishing or reviewing a version of a shared skill library."
---

# Multi-Agent Skill Release Manifest

## Purpose

Provide one verifiable inventory of the exact skills, versions, compatibility claims, and artifacts included in a release.

## Required inputs

Batch records, canonical source paths, versions/digests, generated provider artifacts, package manifests, validation reports, and release channel.

## Workflow

1. Enumerate only canonical skill identities; distinguish source files, generated copies, aliases, and imported entries to prevent double counting.
2. Record stable ID, version/digest, source path, category, origin/provenance status, compatibility status, and supporting files for each entry.
3. Record package and adapter versions separately from skill versions; identify which generated artifacts include each skill.
4. Reconcile manifest entries with the machine-readable catalog, Markdown catalog, package manifests, README counts, and batch acceptance report.
5. Freeze the release manifest against the reviewed commit and verify the emitted artifact inventory using a clean reproducible process where available.

## Validation checklist

- [ ] Each canonical skill ID appears once per release manifest.
- [ ] Generated copies do not inflate the unique count.
- [ ] Manifest digests correspond to the reviewed bytes.
- [ ] Counts and versions reconcile across catalogs and packages.
- [ ] Untested adapters and unresolved license/provenance status remain explicit.

## Required output

A machine-readable release manifest, human-readable summary, count reconciliation, and evidence links.

## Boundaries and failure handling

Do not state that a clean-build verification passed unless the build actually ran. Presence in a manifest alone does not prove provider compatibility.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A 25-skill milestone needs a reviewable inventory before its PR is accepted.
- **Negative:** A private draft has one local skill file and is not being packaged or released.
