---
name: scene-share-url-state-roundtrip
description: "Verify that a share URL serializes and restores supported camera, layer, style, and selection state without ambiguity."
---

# Scene Share URL State Roundtrip

## Purpose

Make links reproducible while keeping URL payloads small, versioned, and limited to shareable state.

## Required inputs

Share-state schema, URL parser/serializer, feature IDs, privacy policy, and round-trip test fixtures.

## Workflow

1. Define an explicit allowlist of state fields that may be shared and normalize them before serialization.
2. Serialize supported state in a stable form and version it so future parsers can recognize older links.
3. Round-trip valid URLs and test omitted, repeated, malformed, overlong, and unknown query values.
4. Restore only the allowed state, revalidating live targets and provider availability at open time.

## Validation checklist

- [ ] Serialization is deterministic for equivalent normalized states.
- [ ] Share URLs exclude credentials, local file paths, transcript content, and unapproved sensitive coordinates.
- [ ] Malformed links fall back safely with a visible explanation.
- [ ] Versioned links retain compatibility or give a documented unsupported-version result.

## Required output

A share-field allowlist, round-trip suite, URL size budget, and compatibility policy.

## Boundaries and failure handling

Treat incoming URLs as untrusted input; never execute arbitrary actions solely because query parameters request them.

## Trigger examples

- **Positive:** A scene share link restores the camera but loses active layers or serializes private state.
- **Negative:** A request to embed an API key or private person-level trail in a public URL.
