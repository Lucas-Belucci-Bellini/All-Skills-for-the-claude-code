---
name: agent-adapter-resource-link-resolution
description: "Resolves canonical skill links and package-relative references after adaptation. Use when skills contain supporting resources and local paths."
---

# Adapter Resource Link Resolution

## Purpose

canonical source tree, output package structure, relative links, and provider URI rules

## Required inputs

Map every canonical relative path to a valid target package location without escaping the package root.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Check nested references and links from converted frontmatter/Markdown, including case and separator behavior.
3. A link resolution report with canonical-to-provider path mapping.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not create links to local developer paths or expose files outside the allowed package. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not create links to local developer paths or expose files outside the allowed package.

## Boundaries and failure handling

A skill includes a reference file that should load correctly in multiple clients. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The skill is a self-contained instruction with no linked resources.
- **Negative:** undefined
