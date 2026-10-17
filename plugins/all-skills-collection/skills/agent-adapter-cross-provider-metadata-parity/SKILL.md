---
name: agent-adapter-cross-provider-metadata-parity
description: "Checks that adapters preserve common skill metadata across providers. Use after conversion, import, or bundle generation."
---

# Cross-Provider Metadata Parity Audit

## Purpose

canonical skill record, provider artifacts, adapter mappings, and digest metadata

## Required inputs

Compare stable ID, version, trigger description, provenance, dependencies, validation state, and safety boundary.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Report fields preserved, transformed intentionally, lost, or unsupported across each provider output.
3. A cross-provider field matrix with transformation rationale.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not report parity when the target format omits a behavior-critical safety field. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not report parity when the target format omits a behavior-critical safety field.

## Boundaries and failure handling

The same skill is exported into Claude Code and Codex packages. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The target system uses the canonical metadata unchanged.
- **Negative:** undefined
