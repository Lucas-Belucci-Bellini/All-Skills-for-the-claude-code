---
name: agent-skill-dependency-cycle-analysis
description: "Finds cycles among declared skill dependencies. Use when composite skill sets or references grow into a dependency graph."
---

# Agent Skill Dependency Cycle Analysis

## Purpose

catalog dependency metadata, version selectors, and optional/reference distinctions

## Required inputs

Build the directed dependency graph and distinguish hard prerequisites from optional related material.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Detect strongly connected components, explain the cycle path, and propose safe dependency or layering changes.
3. A cycle report with affected IDs, cycle paths, and recommended review actions.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not break dependency cycles by dropping required safety checks without approval. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not break dependency cycles by dropping required safety checks without approval.

## Boundaries and failure handling

A skill bundle hangs or recursively loads supporting skills. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The catalog has no dependency declarations or cycle risk.
- **Negative:** undefined
