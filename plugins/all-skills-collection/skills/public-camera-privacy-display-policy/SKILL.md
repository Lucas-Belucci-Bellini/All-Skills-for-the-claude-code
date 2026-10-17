---
name: public-camera-privacy-display-policy
description: "Review public-camera integrations so the UI communicates camera provenance while minimizing person-level identification and exposure."
---

# Public Camera Privacy Display Policy

## Purpose

Keep camera features focused on legitimate scene context rather than identifying, profiling, or following private individuals.

## Required inputs

Camera source inventory, display capabilities, privacy policy, retention/export paths, and synthetic review scenarios.

## Workflow

1. Document whether an integration provides camera locations, live video, or only coarse camera metadata.
2. Define allowed display and interaction behavior, including what image capture, export, indexing, and retention are disabled by default.
3. Review UI labels to state source freshness, limitations, and whether imagery is public, estimated, or unavailable.
4. Test that selection, voice, search, and sharing cannot create person-identity records or persistent individual trails.

## Validation checklist

- [ ] Camera location metadata is not treated as permission to identify everyone visible.
- [ ] Video capture or persistence is not enabled implicitly by displaying a camera source.
- [ ] User-facing labels explain source and limitations.
- [ ] Exports omit unnecessary frames, faces, license plates, and person-level identifiers.

## Required output

A camera privacy policy, UI-state test cases, and a list of person-level features blocked or requiring formal review.

## Boundaries and failure handling

Do not build face recognition, individual tracking, covert surveillance, or identity enrichment workflows for private people.

## Trigger examples

- **Positive:** A public-camera layer needs clear provenance and privacy-safe interaction rules.
- **Negative:** A request to identify a person from CCTV or follow their movements between cameras.
