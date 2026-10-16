---
name: modpack-launch-environment-audit
description: Audit a modded Minecraft launch environment for Java version, memory flags, loader arguments, paths, architecture, and launcher-specific assumptions.
---

# Modpack Launch Environment Audit

## Goal

Separate environment misconfiguration from mod incompatibility before changing the pack itself.

## Inputs to inspect

Launcher profile, Java executable/version, JVM/game arguments, OS/architecture, RAM limits, instance path, and launch log.

## Workflow

1. Capture the exact launcher, instance version, game/loader build, Java executable/version, OS architecture, RAM allocation, and launch arguments.
2. Inspect JVM flags for unsupported/duplicate options, excessive heap relative to system memory, malformed paths, quoting errors, and shell/OS-specific assumptions.
3. Check instance and library paths for missing files, permission issues, symlinks, disk capacity, and path encoding/length constraints where relevant.
4. Compare a known-good launch configuration with the failing one without deleting mods or overwriting user settings.
5. Run a controlled launch and capture the first meaningful failure; if launch succeeds, test entry into a world/server separately.

## Validation checklist

- [ ] Java version is verified from the exact executable used by the launcher.
- [ ] Heap settings consider operating-system headroom and other running applications.
- [ ] Paths and quoting match the launcher/OS combination.
- [ ] Environment errors are distinguished from dependency or code exceptions.
- [ ] The previous profile and settings remain recoverable.

## Required output

Deliver a sanitized environment snapshot, launcher/JVM diff, earliest failure evidence, and minimal reversible remediation.

## Boundaries and failure handling

Do not copy random JVM flag lists; do not erase the instance or configs to make a launch attempt simpler.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
