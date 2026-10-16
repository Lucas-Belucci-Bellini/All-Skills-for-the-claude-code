---
name: modpack-release-manifest-audit
description: Verify that a modpack release manifest exactly matches distributed JARs, loaders, configs, overrides, and required licenses/notices.
---

# Modpack Release Manifest Audit

## Goal

Ensure a released pack is reproducible and its inventory is complete, accurate, and auditable.

## Inputs to inspect

Manifest, mods directory, launcher/export package, config/defaultconfig/overrides, loader version, and distribution notices.

## Workflow

1. Generate an inventory from actual distributed files, preserving exact filenames, versions, sizes, and checksums; do not infer missing values from mod display names.
2. Compare inventory against the manifest/export metadata and classify missing, extra, duplicate, renamed, and version-mismatched files.
3. Verify required configs, scripts, datapacks, resource packs, overrides, and server-specific instructions are included when part of the release contract.
4. Review dependency/license/provenance metadata and required attribution for redistributable artifacts; flag terms that need human review.
5. Build a clean install from the release package and compare the resulting runtime inventory and startup behavior to the manifest.

## Validation checklist

- [ ] The inventory is derived from package contents, not copied from a stale folder listing.
- [ ] Checksums and version metadata are consistent across manifest and distributed artifacts.
- [ ] Client/server-specific omissions are documented and intentional.
- [ ] Required notices and license restrictions are not replaced by guesswork.
- [ ] A clean install test verifies the package consumers actually receive.

## Required output

Produce a release inventory, exact manifest diff, provenance/notice exceptions, clean-install results, and a release go/no-go decision.

## Boundaries and failure handling

Do not claim that the official pack includes a JAR without checking the exact release manifest; do not redistribute files whose terms are unresolved.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
