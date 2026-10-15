---
name: dependency-supply-chain-verification
description: Review dependency provenance, lockfiles, release artifacts, signatures, build inputs, and known advisories before shipping software.
---

# Dependency Supply Chain Verification

## Goal

Provide evidence that a release was built from reviewed dependency inputs and that risky supply-chain changes are intentional.

## Inputs to inspect

Manifest and lockfile diffs, package registry metadata, checksums/signatures, build workflow, advisories, and release artifacts.

## Workflow

1. Record the exact release commit, lockfile, toolchain, dependency sources, and build workflow used to create the candidate artifact.
2. Review dependency additions, source changes, registry redirects, git dependencies, vendored code, postinstall scripts, and unusually broad permission requirements.
3. Verify checksums, signatures, provenance attestations, or reproducible-build evidence when the ecosystem and project provide them.
4. Check current advisory information and license/provenance policy for changed dependencies; separate a security finding from a policy or maintenance concern.
5. Build the artifact through the trusted CI path, compare expected metadata, and record any unavailable verification step or accepted exception.

## Validation checklist

- [ ] The artifact is linked to an exact reviewed commit and lockfile.
- [ ] New or changed dependency sources have a documented reason and provenance.
- [ ] Signatures/checksums are validated against a trusted source when available.
- [ ] Known advisories are assessed for the actual versions and reachability, not just raw scanner count.
- [ ] Unverified supply-chain claims and accepted exceptions are explicit.

## Required output

Deliver a release supply-chain checklist, dependency change risk table, verification evidence, advisories/exceptions, and go/no-go recommendation.

## Boundaries and failure handling

Do not claim an artifact is reproducible or signed without validating it; do not treat a clean vulnerability scan as proof of trusted provenance.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
