---
name: scene-bundle-import-preview-sandbox
description: "Inspect and preview a scene bundle before import, validating its contents and preventing unsafe paths or automatic execution."
---

# Scene Bundle Import Preview Sandbox

## Purpose

Let users understand imported scene changes before they become active or overwrite existing local work.

## Required inputs

Bundle format, archive/path parser, schema versions, size limits, import UI, and representative safe/malformed fixtures.

## Workflow

1. Enumerate allowed bundle files and fields, including maximum byte counts and supported schema versions.
2. Parse into an isolated preview model that cannot make network requests, change the active scene, or write persistent state.
3. Display a summary of camera anchors, authored moves, data packs, and unsupported references before confirmation.
4. On confirmation, apply validated data transactionally and preserve the previous state if any step fails.

## Validation checklist

- [ ] Path traversal, duplicate paths, oversized payloads, and malformed JSON are rejected.
- [ ] Preview produces no network calls or persistent mutations.
- [ ] Unknown required features block import; unknown optional features are reported.
- [ ] A failed import leaves the current scene and local files intact.

## Required output

An import threat model, preview checklist, validation fixtures, and transactional commit/rollback behavior.

## Boundaries and failure handling

Do not evaluate executable bundle content or follow external references automatically during preview.

## Trigger examples

- **Positive:** A user wants to inspect a downloaded scene bundle before it changes the active map.
- **Negative:** A request to automatically execute scripts or overwrite local scenes found inside a bundle.
