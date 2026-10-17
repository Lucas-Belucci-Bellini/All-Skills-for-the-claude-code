---
name: agent-skill-local-cache-integrity
description: "Verifies files stored in a local agent skill cache before use. Use when skills are downloaded, expanded, or shared across workspaces."
---

# Agent Local Cache Integrity

## Purpose

local cache root, expected digests, path ownership, permissions, and cache manifest

## Required inputs

Verify content digests, manifest entries, symlink/path behavior, and file permissions before resolving a skill.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Test cache tampering, partial download, duplicate entries, and disk corruption with disposable fixtures.
3. A local cache integrity report and recovery action for each detected failure.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not execute or load corrupted cache contents and do not silently trust a stale digest. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not execute or load corrupted cache contents and do not silently trust a stale digest.

## Boundaries and failure handling

An agent reports different skill behavior across two local workspaces. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The skill is fetched directly from a verified immutable package each time.
- **Negative:** undefined
