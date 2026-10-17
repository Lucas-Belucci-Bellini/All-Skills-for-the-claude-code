---
name: agent-adapter-agent-version-fingerprint
description: "Captures the platform/runtime version needed to interpret compatibility test results. Use when adapter behavior changes across releases."
---

# Agent Version Fingerprint

## Purpose

agent CLI/runtime version, workspace configuration, adapter version, and test timestamp

## Required inputs

Collect exact version identifiers from supported diagnostic commands or platform metadata.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Store the version tuple with every conformance and install test, and invalidate results when a relevant component changes.
3. A version fingerprint attached to the capability matrix and test evidence.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not infer a patch version from a product label or remembered behavior. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not infer a patch version from a product label or remembered behavior.

## Boundaries and failure handling

A new release might alter plugin discovery or tool access. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The integration is a static export with no runtime compatibility claim.
- **Negative:** undefined
