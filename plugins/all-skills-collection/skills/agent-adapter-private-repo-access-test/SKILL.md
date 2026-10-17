---
name: agent-adapter-private-repo-access-test
description: "Verifies that an adapter can access a private skill repository using approved authorization. Use when source or package contents are not public."
---

# Private Repository Access Test for Agent Adapters

## Purpose

private fixture repository, read-only identity, permission scope, and adapter config

## Required inputs

Test unauthenticated denial and authorized minimal read access to a harmless fixture file.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Verify token handling, repository path mapping, and failure behavior when access is revoked.
3. An access matrix with authorized/denied outcomes and cleanup notes.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never expose a personal token or broaden repository permissions to bypass a failed test. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never expose a personal token or broaden repository permissions to bypass a failed test.

## Boundaries and failure handling

ChatGPT/Codex/Claude adapter needs to fetch a private skill repository. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The skills are in a public repository and no authenticated access is required.
- **Negative:** undefined
