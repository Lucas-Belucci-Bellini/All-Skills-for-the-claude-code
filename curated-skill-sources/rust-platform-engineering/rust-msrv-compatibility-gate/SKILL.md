---
name: rust-msrv-compatibility-gate
description: "Use when a Rust workspace must keep building on its declared minimum supported Rust version; not for target-triple coverage."
---

# Rust Msrv Compatibility Gate

## Purpose

Prevent dependency updates or language features from silently raising the compiler requirement.

## Required inputs

MSRV policy, Cargo manifests/lockfile, workspace members, CI toolchains, supported targets, dependency diff.

## Workflow

1. Locate the authoritative rust-version policy and per-member overrides.
2. Build/test using the declared minimum toolchain, not only newest stable.
3. Classify failures into project API/syntax use, dependency MSRV, build scripts, or target-specific constraints.
4. Add a CI gate that detects MSRV increases and requires an explicit policy decision.

## Verification checklist

- [ ] Declared rust-version matches a tested toolchain.
- [ ] Workspace members and build scripts are included.
- [ ] Lockfile/dependency graph used are recorded.
- [ ] An MSRV increase requires explicit review and migration notes.

## Required output

MSRV report with toolchain, targets, failing items, CI recommendation, and compliance status.

## Boundaries and failure handling

Do not claim compatibility from latest stable builds alone; do not raise MSRV implicitly to silence CI.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A crate works on latest stable but fails on the project's advertised Rust version.
- **Negative:** Checking Linux/Windows target support using the same modern toolchain.
