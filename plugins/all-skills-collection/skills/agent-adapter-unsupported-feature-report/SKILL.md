---
name: agent-adapter-unsupported-feature-report
description: "Reports skill features a target agent cannot execute or interpret. Use when importing provider-neutral content with tool-specific steps."
---

# Adapter Unsupported Feature Report

## Purpose

skill requirements, target agent feature map, and connector configuration

## Required inputs

Identify every tool call, command, package feature, or interactive behavior required by the skill.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Classify each requirement as supported, needs configuration, emulatable with caveat, or unsupported; do not silently remove it.
3. A per-skill feature gap report with usable alternatives and blockers.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not claim full compatibility by hiding unsupported sections. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not claim full compatibility by hiding unsupported sections.

## Boundaries and failure handling

A broker selects a skill that mentions a tool unavailable in the current agent. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The skill uses only portable text and supported local references.
- **Negative:** undefined
