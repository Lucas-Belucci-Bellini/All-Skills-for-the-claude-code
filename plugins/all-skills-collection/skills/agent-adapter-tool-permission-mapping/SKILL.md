---
name: agent-adapter-tool-permission-mapping
description: "Maps provider-side tool permissions to broker operation scopes. Use when agents expose multiple tools with different access levels."
---

# Adapter Tool Permission Mapping

## Purpose

provider tool list, broker endpoints, identity scopes, and approval model

## Required inputs

Create a many-to-many map between available tools and permitted broker operations.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Test direct calls to each tool with minimal/insufficient scopes and ensure the server also enforces access.
3. A permission mapping and negative-call evidence.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not rely only on prompt instructions to restrict a write-capable endpoint. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not rely only on prompt instructions to restrict a write-capable endpoint.

## Boundaries and failure handling

A connected agent should retrieve skills but not publish them. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** No tools or server-side operations are exposed.
- **Negative:** undefined
