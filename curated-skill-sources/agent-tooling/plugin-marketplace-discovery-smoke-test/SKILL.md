---
name: plugin-marketplace-discovery-smoke-test
description: "Use when verifying a Claude Code plugin appears in marketplace discovery and installed skills are discoverable; not for workflow quality alone."
---

# Plugin Marketplace Discovery Smoke Test

## Purpose

Use when verifying a Claude Code plugin appears in marketplace discovery and installed skills are discoverable; not for workflow quality alone.

## Required inputs

Inputs: marketplace/plugin manifests, repository ref, isolated Claude Code profile/version, expected skill names, install logs.

## Workflow

1. Compare marketplace source/version and identifiers against the plugin manifest and target revision.
2. Install/update in a disposable profile and record selected version and installed path.
3. Check discovery for a new skill and an existing skill, not just files in Git.
4. Repeat after update/reinstall and distinguish stale cache from parse or packaging failure.

## Verification checklist

Checks: identifiers resolve to correct source/ref; installed version matches manifest; skills actually appear in discovery; clean profile outcome recorded.

## Required output

Output: end-to-end discovery report with version, revision, visible skill identifiers, and failures.

## Boundaries and failure handling

Boundary: do not claim discovery success from manifest inspection alone.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: new SKILL.md files exist but don't appear in Claude Code.
- Negative: Negative: polishing trigger prose after discovery is already confirmed.
