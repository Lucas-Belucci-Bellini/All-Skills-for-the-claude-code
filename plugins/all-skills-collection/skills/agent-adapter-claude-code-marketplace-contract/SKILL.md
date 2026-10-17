---
name: agent-adapter-claude-code-marketplace-contract
description: "Validates the marketplace packaging contract used to distribute canonical skills to Claude Code. Use when rebuilding or publishing the Claude Code plugin catalog."
---

# Claude Code Marketplace Adapter Contract

## Purpose

canonical skill sources, plugin manifest, marketplace manifest, and tested Claude Code version

## Required inputs

Map canonical IDs and package paths to the marketplace's supported fields and immutable naming rules.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Check manifest parity, generated path inclusion, version alignment, and install/discovery evidence in a disposable environment.
3. A marketplace conformance report with manifest checks and runtime status.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not claim a plugin is installable only because the json parses. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not claim a plugin is installable only because the JSON parses.

## Boundaries and failure handling

A new skills batch must be included in the Claude Code marketplace. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The task does not distribute or install Claude Code plugins.
- **Negative:** undefined
