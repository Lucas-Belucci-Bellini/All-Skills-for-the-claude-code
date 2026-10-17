---
name: agent-adapter-skill-local-reference-packaging
description: "Packages references needed by a skill without including irrelevant repository content. Use when exporting bundles to other agent clients."
---

# Adapter Skill Reference Packaging

## Purpose

skill dependency graph, local references, package manifest, and target size constraints

## Required inputs

Compute the transitive closure of required local references and distinguish optional docs from required runtime files.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Package only allowed referenced artifacts and verify each link after generation.
3. A package contents list with included references, omitted optional files, and unresolved dependencies.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not copy whole repositories or unrelated project secrets to satisfy one missing reference. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not copy whole repositories or unrelated project secrets to satisfy one missing reference.

## Boundaries and failure handling

A skill is distributed to an agent without access to the canonical repository tree. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The target agent will access all references through an authorized live repository link.
- **Negative:** undefined
