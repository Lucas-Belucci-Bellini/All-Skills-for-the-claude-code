---
name: agent-adapter-hidden-file-packaging
description: "Checks whether hidden files required by a skill are included in provider packages. Use when manifests, templates, or configuration resources begin with a dot."
---

# Adapter Hidden File Packaging Audit

## Purpose

canonical tree, package inclusion rules, provider ignore patterns, and required hidden resources

## Required inputs

List hidden files and determine which are functional inputs, local metadata, or intentionally excluded artifacts.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Inspect the emitted package to verify required resources are present and private/local-only files remain excluded.
3. A hidden-file packaging matrix with required/included/excluded decisions.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never include credentials, local env files, or private machine state just because the packager can include hidden files. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never include credentials, local env files, or private machine state just because the packager can include hidden files.

## Boundaries and failure handling

A skill relies on a dotfile manifest or config example. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The skill has no hidden supporting files.
- **Negative:** undefined
