---
name: agent-adapter-write-approval-gate
description: "Separates read-only skill retrieval from writes, proposals, approvals, and publishing. Use when an agent integration exposes state-changing broker tools."
---

# Adapter Write Approval Gate

## Purpose

adapter permission map, broker operations, approval policy, and test identities

## Required inputs

Map each operation to a permission class and choose read-only as the default for newly connected clients.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Test that a read client cannot submit/approve/publish/revoke and that required human approvals are enforced.
3. A tool-to-permission table and negative-access test report.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not let a skill request or prompt elevate a client's broker permissions. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not let a skill request or prompt elevate a client's broker permissions.

## Boundaries and failure handling

A shared skill broker allows agents to submit gap reports or propose changes. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The adapter exposes only local read-only files.
- **Negative:** undefined
