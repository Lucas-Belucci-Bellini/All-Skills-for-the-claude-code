---
name: agent-adapter-client-cache-installation
description: "Defines safe installation/update of a local skill cache. Use when a client needs offline access to approved versions."
---

# Agent Adapter Client Cache Installation

## Purpose

canonical IDs, pinned digests, cache root, filesystem permissions, and refresh policy

## Required inputs

Resolve the selected versions and stage downloads in a temporary directory before activating them.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Verify digests, paths, file permissions, and atomic swap behavior; retain the previous known-good cache on failure.
3. An install report with version/digest, paths, result, and rollback status.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not place private content in shared caches accessible to other projects or users. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not place private content in shared caches accessible to other projects or users.

## Boundaries and failure handling

An agent needs a local cache of approved broker-fetched skills. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The adapter always uses a live server and intentionally has no local cache.
- **Negative:** undefined
