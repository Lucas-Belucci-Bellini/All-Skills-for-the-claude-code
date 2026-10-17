---
name: rust-crate-publish-dry-run-audit
description: "Use when preparing a Rust crate release and checking published files/metadata; not for MSRV testing."
---

# Rust Crate Publish Dry Run Audit

## Purpose

Use when preparing a Rust crate release and checking published files/metadata; not for MSRV testing.

## Required inputs

Inputs: Cargo.toml/workspace, include/exclude rules, README/license files, release features, package listing.

## Workflow

1. Run cargo package --list and --dry-run in a clean checkout with intended features.
2. Inspect for missing files, local artifacts, secrets, binaries, and workspace-only paths.
3. Build/test the packaged crate to expose files present locally but absent from archive.
4. Verify version, license notices, repository links, and dependency metadata.

## Verification checklist

Checks: file inventory reviewed; packaged crate builds from its own contents; metadata/license matches policy; failures are documented.

## Required output

Output: publish-readiness checklist, package file list, dry-run/build results, blockers.

## Boundaries and failure handling

Boundary: do not publish or tag a release unless explicitly requested; never include private artifacts or credentials.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: workspace builds but a downloaded crate fails for consumers.
- Negative: Negative: comparing latest stable to declared MSRV.
