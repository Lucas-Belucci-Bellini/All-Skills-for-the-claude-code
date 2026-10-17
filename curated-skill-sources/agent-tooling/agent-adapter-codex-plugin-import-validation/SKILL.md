---
name: agent-adapter-codex-plugin-import-validation
description: "Validates how a canonical skill bundle is imported by Codex. Use when updating a Codex catalog or plugin distribution."
---

# Codex Plugin Import Validation

## Purpose

Codex version, plugin catalog, package manifest, source path, and import diagnostics

## Required inputs

Verify required catalog fields and how skill directories are discovered by the targeted Codex version.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Import in an isolated test workspace and confirm the expected skill IDs, supporting files, and descriptions appear.
3. An import report with tested version, discovered skills, and missing artifacts.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not infer codex compatibility from a claude marketplace manifest. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not infer Codex compatibility from a Claude marketplace manifest.

## Boundaries and failure handling

A new skill set needs to be available in Codex through a supported import route. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The task does not target Codex or any plugin package.
- **Negative:** undefined
