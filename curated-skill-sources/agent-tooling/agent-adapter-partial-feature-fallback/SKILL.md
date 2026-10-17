---
name: agent-adapter-partial-feature-fallback
description: "Defines how an adapter behaves when only part of a skill's requirements are supported. Use when a provider lacks optional tools or package features."
---

# Agent Adapter Partial Feature Fallback

## Purpose

skill requirement metadata, target capability matrix, fallback policy, and success criteria

## Required inputs

Separate mandatory requirements from optional enhancements and classify missing features.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Choose an explicit fallback only when it preserves the task's required safety and correctness; otherwise stop with a blocker.
3. A feature fallback decision table with preserved requirements and unavailable capabilities.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never silently substitute a weaker tool where it changes safety, privacy, or correctness guarantees. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never silently substitute a weaker tool where it changes safety, privacy, or correctness guarantees.

## Boundaries and failure handling

A skill has optional semantic search but the client supports only lexical retrieval. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** A required destructive-action approval or verification tool is unavailable.
- **Negative:** undefined
