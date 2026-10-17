---
name: agent-adapter-compatibility-regression-fixtures
description: "Maintains fixtures that catch provider adapter regressions. Use when a platform version or package transformer changes."
---

# Adapter Compatibility Regression Fixtures

## Purpose

adapter conformance suite, known bug cases, pinned provider versions, and test skills

## Required inputs

Collect regression cases for prior failures in paths, frontmatter, unsupported tools, permissions, and caching.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Run fixtures against current and proposed adapter versions, recording observed outputs and environment fingerprints.
3. A regression fixture catalog with expected behavior and per-version outcomes.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not remove a failing fixture just because a provider update changes behavior; update it with evidence and review. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not remove a failing fixture just because a provider update changes behavior; update it with evidence and review.

## Boundaries and failure handling

A new agent version may break skill import or request routing. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** There is no adapter behavior or compatibility path to test.
- **Negative:** undefined
