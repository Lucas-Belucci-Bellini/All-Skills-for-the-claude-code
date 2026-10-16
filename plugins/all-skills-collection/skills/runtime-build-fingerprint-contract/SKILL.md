---
name: runtime-build-fingerprint-contract
description: Define and verify a build fingerprint that identifies the code, toolchain, features, assets, and configuration affecting runtime behavior.
---

# Runtime Build Fingerprint Contract

## Goal

Make crash reports, performance captures and user bug reports comparable to the exact artifact that produced them.

## Inputs to inspect

Build pipeline, commit/release IDs, compiler versions, dependency lockfiles, feature flags, content manifests and runtime version reporting.

## Workflow

1. List inputs that materially affect runtime behavior: source revision, dirty-tree state, toolchain, target, feature set, dependency lock, asset/content version and relevant build flags.
2. Define a canonical fingerprint and distinguish immutable build identity from runtime configuration values that can vary after packaging.
3. Embed or expose the fingerprint in safe startup diagnostics and diagnostic bundles; verify it matches the build manifest used to publish the artifact.
4. Build equivalent artifacts twice under the documented reproducibility rules and identify expected sources of nondeterminism such as timestamps or archive ordering.
5. Add release checks for missing/mismatched fingerprint fields and document how to compare two reports without exposing secrets.

## Validation checklist

- [ ] Fingerprint fields are stable and canonicalized; volatile fields are excluded or explicitly separated.
- [ ] Dirty working tree or unpinned toolchain state is surfaced rather than hidden under the same revision label.
- [ ] Runtime-reported identity matches the packaged artifact manifest.
- [ ] Fingerprinting does not include credentials, host-specific secrets or user data.

## Required output

A fingerprint schema, manifest/runtime comparison, reproducibility notes and release validation gate.

## Boundaries and failure handling

Do not call a build reproducible solely because its commit hashes match; verify all behavior-affecting inputs and the claimed level of artifact equivalence.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
