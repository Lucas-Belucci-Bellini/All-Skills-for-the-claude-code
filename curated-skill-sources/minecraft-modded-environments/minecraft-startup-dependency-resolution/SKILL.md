---
name: minecraft-startup-dependency-resolution
description: Diagnose modpack startup failures by resolving loader, Minecraft, Java, mod, library, and side constraints from evidence.
---

# minecraft startup dependency resolution

## Goal

Identify the earliest real incompatibility in a startup failure without random mod removal.

## Inputs to inspect

Full startup log, crash report, exact JAR filenames, game/loader versions, Java runtime, manifest, and recent changes.

## Workflow

1. Record exact game, loader, Java major/version, launch arguments, and installed mod filenames; distinguish client and server environments.
2. Find the earliest meaningful error and trace the dependency-resolution chain before later cascading failures obscure the root cause.
3. Build a constraint table for required dependencies, version ranges, side restrictions, loader API level, Java bytecode target, and conflicting duplicate libraries.
4. Compare the failing environment with the last-known-good inventory and identify the smallest relevant difference or incompatible version constraint.
5. Test the proposed fix in a copy of the instance and confirm both startup and the previously failing feature; preserve original logs and configuration.

## Validation checklist

- [ ] The diagnosis cites exact log lines and filenames, not only the final exception.
- [ ] Dependency constraints are distinguished from guesses based on mod names.
- [ ] Client-only/server-only artifacts and duplicate libraries are checked.
- [ ] One material variable is changed per experiment where possible.
- [ ] The outcome states confirmed, likely, and untested causes separately.

## Required output

Produce a dependency graph/table, earliest root-cause evidence, minimal fix proposal, verification steps, and rollback notes.

## Boundaries and failure handling

Do not blame the last mod mentioned in a stack trace by default; do not delete configuration or world data as a startup shortcut.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
