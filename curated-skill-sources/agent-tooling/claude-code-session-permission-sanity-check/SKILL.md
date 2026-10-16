---
name: claude-code-session-permission-sanity-check
description: "Use before repository or shell actions to check active Claude Code session approvals, trust mode, and allowed paths; not for remote OAuth scopes."
---

# Claude Code Session Permission Sanity Check

## Purpose

Use before repository or shell actions to check active Claude Code session approvals, trust mode, and allowed paths; not for remote OAuth scopes.

## Required inputs

Inputs: Claude Code version, effective permission summary, workspace roots, tool allow/deny rules, intended action.

## Workflow

1. Inspect supported UI/CLI surfaces for effective session mode and workspace roots.
2. Compare task needs for read/write/shell/network/external effects with granted capabilities.
3. Identify broad grants, outside-workspace access, and tools with unexpected side effects.
4. Recommend narrow settings and re-check effective mode before risky work.

## Verification checklist

Checks: effective mode/path roots recorded; necessary and unrelated permissions distinguished; external/destructive actions have approval boundaries; prompt text isn't mistaken for enforcement.

## Required output

Output: session permission summary, task-to-permission mapping, risky grants, recommended settings.

## Boundaries and failure handling

Boundary: don't weaken safeguards to avoid approval prompts; don't probe unrelated files or secrets.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: verify an agent can't write outside its assigned repository.
- Negative: Negative: reviewing OAuth scopes for a remote API.
