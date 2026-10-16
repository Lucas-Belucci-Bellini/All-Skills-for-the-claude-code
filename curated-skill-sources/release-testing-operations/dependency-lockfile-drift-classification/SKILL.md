---
name: dependency-lockfile-drift-classification
description: "Use when local, CI, release, or platform lockfiles resolve different dependency graphs; not for vulnerability prioritization."
---

# Dependency Lockfile Drift Classification

## Purpose

Use when local, CI, release, or platform lockfiles resolve different dependency graphs; not for vulnerability prioritization.

## Required inputs

Inputs: manifests/lockfiles, package-manager versions, install commands, platform, registry/cache context, CI logs.

## Workflow

1. Inventory authoritative lockfiles and record package manager version and resolution mode.
2. Re-resolve in clean temporary checkouts and compare versions, checksums, optional dependencies, and platform branches.
3. Classify differences as intended target variance, stale lockfile, tool-version drift, registry mutability, or undeclared dependencies.
4. Propose minimal regeneration/pinning and CI detection for unexplained changes.

## Verification checklist

Checks: correct package manager/version used; target-specific dependencies distinguished; checksum mismatch fails visibly; CI does not rewrite locks silently.

## Required output

Output: lockfile comparison matrix, drift classification, reproducible commands, CI guard.

## Boundaries and failure handling

Boundary: don't upgrade every dependency as a side effect; redact private registry credentials.

If evidence or permissions are missing, record the blocker and don't report unrun validation as passed.

## Trigger examples

- Positive: Positive: CI installs different versions from a developer machine despite same manifest.
- Negative: Negative: ranking CVEs in a consistently resolved graph.
