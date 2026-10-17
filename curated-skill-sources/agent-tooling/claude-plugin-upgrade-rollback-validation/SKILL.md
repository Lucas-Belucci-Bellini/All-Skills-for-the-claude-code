---
name: claude-plugin-upgrade-rollback-validation
description: "Use when validating a Claude Code plugin upgrade and its recovery path across manifests, skills, commands, and settings; not as a replacement for broad package compatibility review."
---

# Claude Plugin Upgrade Rollback Validation

## Purpose

Catch upgrade regressions and prove a documented way back to a previously working plugin version.

## Required inputs

Old and proposed plugin revisions, marketplace/plugin manifests, installation procedure, skill/command inventory, config state, and a safe test environment.

## Workflow

1. Record the existing version, enabled features, installed skill/command identifiers, and user configuration before attempting an upgrade.
2. Install the candidate revision in an isolated profile and verify manifest parsing, discovery, command/skill loading, supporting files, and any declared dependencies.
3. Exercise the primary workflows and negative cases, then compare available identifiers and configuration changes with the baseline.
4. Execute the documented rollback and confirm the previous version and working configuration are restored without deleting user data.

## Verification checklist

- [ ] Plugin name/identifier remains stable unless a migration path is explicitly provided.
- [ ] Upgrade and rollback steps are repeatable from a clean profile.
- [ ] Missing dependencies and unsupported manifest fields fail visibly.
- [ ] User configuration and data are backed up or preserved by design.

## Required output

An upgrade/rollback matrix with revisions, installation and discovery outcomes, compatibility notes, and recovery evidence.

## Boundaries and failure handling

Use a disposable profile or VM. Do not delete real user configuration to test rollback.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A new plugin version reorganizes bundled skills and may break discovery.
- **Negative:** Checking only whether two package versions use the same version number.
