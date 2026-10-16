---
name: geo-track-data-privacy-safe-export
description: "Review exported geographic tracks and trails for excessive precision, duration, identifiers, and unintended metadata."
---

# Geo Track Data Privacy Safe Export

## Purpose

Let users share the minimum information needed while avoiding persistent person-level trails or accidental disclosure in files.

## Required inputs

Export formats, track schema, share workflow, metadata fields, privacy policy, and generated synthetic exports.

## Workflow

1. Inventory coordinate/time samples, source IDs, local paths, comments, and metadata embedded in each export format.
2. Apply an allowlist and precision/retention policy before writing the file, using coarse or aggregate values where sufficient.
3. Check filename, JSON properties, image EXIF, URL parameters, and bundle manifests for hidden sensitive fields.
4. Round-trip the sanitized file and verify its intended visualization remains useful without reintroducing removed details.

## Validation checklist

- [ ] Only approved fields are exported.
- [ ] No credentials, local paths, raw transcripts, or unnecessary user identifiers appear in artifacts.
- [ ] Person-level trails are blocked or require a clearly justified and permitted use-case review.
- [ ] Sanitization is tested against both visible content and embedded metadata.

## Required output

An export-field allowlist, redaction tests, and sample sanitized artifacts with documented remaining risks.

## Boundaries and failure handling

Do not help create a covert tracking archive of private individuals; exporting public data still requires purpose limitation and terms review.

## Trigger examples

- **Positive:** A user wants to share a scene while excluding unnecessary exact location history and machine metadata.
- **Negative:** A request to export or combine an individual's movement trail across sources.
