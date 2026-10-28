---
name: release-versioning-and-changelog
description: "Prepares predictable releases using semantic versioning where appropriate, user-facing changelogs, and verifiable artifacts. Use when shipping a version, tagging a release, or documenting compatibility and breaking changes."
---

# Release Versioning and Changelog

## Goal
Make releases understandable, reproducible, and traceable from source revision to published artifacts.

## Workflow
1. Review the project's existing versioning scheme, release cadence, compatibility promises, and consumer expectations.
2. Classify changes as fixes, features, deprecations, or breaking changes according to the project's versioning contract.
3. Choose a version that communicates compatibility accurately; do not force Semantic Versioning onto projects with a different established policy.
4. Build changelog entries around user-visible impact, migration actions, known limitations, and security-relevant changes.
5. Verify the intended commit, clean working tree, required CI checks, dependency lockfiles, and release configuration.
6. Build artifacts reproducibly where possible and record checksums or provenance when the release process supports them.
7. Test installation, upgrade, and rollback/recovery paths appropriate to the product.
8. Create tags and publish releases only with explicit authorization when those actions affect users or external systems.
9. Verify published notes, assets, package metadata, and links after publication.
10. Record the release commit, artifact identifiers, validation evidence, and follow-up issues.

## Deliverable
- Version decision and changelog.
- Release checklist and validation results.
- Traceability from tag to source and artifacts.

## Acceptance criteria
- Breaking changes and migration needs are explicit.
- Published artifacts correspond to the reviewed source.
- Release notes are useful to actual consumers.
- Publication status is verified rather than assumed.

## Guardrails
- Do not publish or tag a release without authorization.
- Do not claim reproducible builds without evidence.
- Do not omit known critical limitations from release notes.

