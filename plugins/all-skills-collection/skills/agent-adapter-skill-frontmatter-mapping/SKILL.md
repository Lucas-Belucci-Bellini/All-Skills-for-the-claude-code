---
name: agent-adapter-skill-frontmatter-mapping
description: "Maps canonical metadata into provider-specific skill schemas. Use when different agents accept different frontmatter conventions."
---

# Adapter Skill Frontmatter Mapping

## Purpose

canonical frontmatter, target schema, adapter version, and metadata preservation rules

## Required inputs

Map stable identity, description, compatibility, and provenance fields while identifying unsupported target fields.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Round-trip sample records and detect safety-critical metadata loss or altered trigger semantics.
3. A mapping table and conversion loss report.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not drop safety requirements or overwrite canonical metadata to satisfy one platform's format. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not drop safety requirements or overwrite canonical metadata to satisfy one platform's format.

## Boundaries and failure handling

A skill should be imported into a provider with a different package schema. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The target provider consumes the canonical file unchanged.
- **Negative:** undefined
