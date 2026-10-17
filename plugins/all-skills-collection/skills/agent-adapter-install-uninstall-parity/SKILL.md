---
name: agent-adapter-install-uninstall-parity
description: "Verifies that installing and removing a skill package leaves the environment in a known state. Use for plugin and local-cache lifecycle tests."
---

# Adapter Install and Uninstall Parity Test

## Purpose

clean test environment, package manifest, install/uninstall method, and before/after file inventory

## Required inputs

Install a disposable package and compare actual files to the manifest and expected permissions.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Uninstall it and verify only package-owned files are removed, preserving user data and unrelated plugins.
3. A lifecycle report with before/after inventories, leftovers, and unexpected deletions.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never test uninstall behavior against a user's production profile. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never test uninstall behavior against a user's production profile.

## Boundaries and failure handling

A plugin installer or local cache manager needs lifecycle validation. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** No package installation or removal is being performed.
- **Negative:** undefined
