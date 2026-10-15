---
name: minecraft-modpack-repro-issue-bundle
description: Assemble a privacy-safe, minimal reproduction bundle for a modded Minecraft crash, startup failure, or server desynchronization.
---

# Minecraft Modpack Repro Issue Bundle

## Goal

Give maintainers enough consistent evidence to reproduce a modpack issue without sharing an entire private instance or irrelevant megabytes of logs.

## Inputs to inspect

Symptom and reproduction steps, loader/game/mod versions, crash logs, latest log, config changes, operating system, Java runtime, and recent modpack changes.

## Workflow

1. Capture the exact symptom, trigger sequence, expected versus observed behavior, frequency, and whether it occurs on client, single-player, or dedicated server.
2. Record game/loader/Java versions and produce a normalized mod inventory with exact filenames and versions. Distinguish stock-pack contents from manual additions only when evidence supports the distinction.
3. Collect the relevant crash report, log excerpt around first error, configuration diff, and required reproduction world or save copy. Exclude unrelated logs and caches unless the failure depends on them.
4. Redact access tokens, server addresses when private, player identifiers, local usernames, and unrelated chat or personal paths while preserving technical context needed for reproduction.
5. Verify that the bundle can be opened from a clean folder, includes a README with ordered steps, checksums or inventory metadata where useful, and contains no files outside the agreed scope.

## Validation checklist

- [ ] The report describes a minimal repeatable sequence and labels frequency honestly.
- [ ] Exact versions and filenames are preserved rather than guessed from mod display names.
- [ ] Redaction is reviewed without removing timestamps, stack frames, or configuration values required for diagnosis.
- [ ] The package excludes saves, world data, or private files unless explicitly needed and approved.
- [ ] A second person can identify where to start, what output to expect, and how to report a failed reproduction.

## Required output

Create a zipped issue bundle or manifest containing reproduction steps, version inventory, relevant logs, config diff, redaction notes, and a list of excluded artifacts.

## Boundaries and failure handling

Do not upload an entire multi-gigabyte instance by default; do not declare a mod guilty solely from its name appearing near the bottom of a stack trace.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
