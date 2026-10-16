---
name: cli-working-directory-independence
description: "Find commands that depend accidentally on the caller's directory rather than an explicit project root or documented path rule."
---

# Cli Working Directory Independence

## Purpose

Prevent commands from reading or writing the wrong files when invoked by schedulers, scripts or nested tools.

## Required inputs

CLI entry points, path construction, project-root discovery and supported invocation patterns.

## Workflow

1. Inventory config, template, cache, output and helper paths; label each base directory.
2. Trace project-root discovery and behavior when no workspace is detected.
3. Run representative commands from root, nested, unrelated and space-containing directories.
4. Test supported symlinks and platform-specific separators where applicable.
5. Require an explicit override or clear error when project-root inference is ambiguous.

## Validation checklist

- [ ] Every relative path has a documented base.
- [ ] Changing cwd does not redirect operations unexpectedly.
- [ ] Missing/ambiguous project roots fail clearly.
- [ ] Paths with spaces and supported symlinks are tested.
- [ ] Potential overwrites show their target before execution.

## Required output

A path-origin table, reproducible failures and tests for supported invocation locations.

## Boundaries and failure handling

Do not force user-relative paths to the project root when that is intentional. Avoid selecting a neighboring repository silently.

## Trigger examples

- **Positive:** The CLI works from repo root but cannot find templates when invoked from a script runner.
- **Negative:** Changing a deliberately cwd-relative output location.
