---
name: agent-adapter-environment-readiness-check
description: "Checks prerequisites before running adapter conformance tests. Use when a new workspace, CLI, or sandbox is configured."
---

# Agent Adapter Environment Readiness Check

## Purpose

target environment, credentials state, network access, required tools, package manager, and fixture repo

## Required inputs

Verify required dependencies and access scopes using harmless diagnostic operations.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Run a minimum read-only connection and package-discovery test before attempting behavioral cases.
3. A readiness checklist with pass/fail/blocked states and remediation instructions.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not install unknown packages or modify a user's global environment silently. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not install unknown packages or modify a user's global environment silently.

## Boundaries and failure handling

A multi-agent CI runner needs to test a provider adapter. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** All prerequisites are already verified for the exact test run.
- **Negative:** undefined
