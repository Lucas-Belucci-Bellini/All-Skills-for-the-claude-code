---
name: minecraft-instance-path-portability-audit
description: "Find machine-specific absolute paths and OS assumptions that prevent a modpack instance from being copied or launched elsewhere."
---

# Minecraft Instance Path Portability Audit

## Purpose

Separate local launcher state from portable configuration and content.

## Required inputs

Instance files, launcher metadata, configs, scripts, JVM args and target operating systems.

## Workflow

1. Scan text files for user-profile paths, drive letters, home directories and temporary locations.
2. Classify each finding as launcher-owned, intentional external dependency or accidental path leak.
3. Use relative paths or environment variables only when the consuming component supports them.
4. Test a copied instance under an independent root path, including a path with spaces.
5. Document files the launcher regenerates so they are not mistaken for portable source-of-truth.

## Validation checklist

- [ ] No accidental personal absolute paths remain in distributable files.
- [ ] Launcher-managed data is distinguished from portable configuration.
- [ ] Separators and quoting fit supported platforms.
- [ ] Relocation test uses an independent path.
- [ ] Intentionally local files are excluded or regenerated explicitly.

## Required output

Path findings, disposition for each, portability changes and relocation-test evidence.

## Boundaries and failure handling

Do not delete launcher metadata simply because it has an absolute path. Remove personal paths and tokens from shared logs.

## Trigger examples

- **Positive:** A config refers to one user's Downloads folder and fails on another PC.
- **Negative:** Changing in-game coordinates with no filesystem portability issue.
