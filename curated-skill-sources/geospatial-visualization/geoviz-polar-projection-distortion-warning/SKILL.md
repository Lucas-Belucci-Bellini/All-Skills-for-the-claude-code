---
name: geoviz-polar-projection-distortion-warning
description: "Provides an evidence-driven workflow for geoviz polar projection distortion warning, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Geoviz Polar Projection Distortion Warning

## Purpose

Provide a task-specific, reproducible workflow for geoviz polar projection distortion warning; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Record coordinate reference system, axis order, units, geometry/source version, viewport/zoom, layer filters and target browser/device for geoviz polar projection distortion warning.
2. Trace the same feature from source payload through normalization, index/query, rendering, selection and export; identify where identity, precision, attribution or state can drift.
3. Build fixtures for boundaries, null/invalid geometries, wraparound, dense/large features, empty results, cancellation and source refresh where relevant.
4. Verify geometry and selection in known control coordinates; profile a realistic viewport and confirm keyboard/accessibility alternatives where the map is not the only way to consume information.
5. Deliver a before/after assertion or screenshot, test inventory, attribution/privacy notes and a clear list of untested projections or devices.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for geoviz polar projection distortion warning are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A geoviz polar projection distortion warning evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not silently change coordinate systems, remove attribution or export sensitive precision. State projection and source limitations; a visually plausible map is not proof of correct coordinates.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change geoviz polar projection distortion warning and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve geoviz polar projection distortion warning or a downstream contract affected by this exact boundary.
