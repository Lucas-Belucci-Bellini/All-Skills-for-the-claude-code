---
name: release-candidate-evidence-manifest
description: Assemble a machine-readable release evidence manifest linking artifact hashes to tests, provenance, compatibility results, known risks, and approval state.
---

# Release Candidate Evidence Manifest

## Goal

Make release decisions auditable and prevent an artifact from being promoted when required evidence belongs to another build.

## Inputs to inspect

Release artifacts, build fingerprints, test reports, dependency/SBOM data, compatibility matrix, known issues and approval records.

## Workflow

1. Define required evidence fields and severity gates for the release type, including exact artifact hash, source revision, build environment, tests and compatibility results.
2. Collect reports through stable paths and validate that every report references the same artifact/build fingerprint being proposed for release.
3. Represent skipped/failed/inconclusive tests distinctly; include owner and rationale for accepted exceptions rather than collapsing them into success.
4. Verify manifest integrity and retention, and ensure evidence artifacts do not include secrets or sensitive user data.
5. Add a release gate that rejects missing mandatory evidence or mismatched build IDs while allowing explicitly approved, auditable exceptions.

## Validation checklist

- [ ] Artifact identity ties evidence to the exact bytes being promoted.
- [ ] Skipped and inconclusive checks cannot be mistaken for passed checks.
- [ ] Known risks and approval exceptions have owners and scope.
- [ ] The manifest is reproducible and does not expose private credentials or unsupported claims.

## Required output

A release-evidence schema, example manifest, validation checklist and gate criteria for promotion.

## Boundaries and failure handling

Do not fabricate evidence or mark a release approved solely because a manifest file exists; verify the referenced reports and artifact hashes.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
