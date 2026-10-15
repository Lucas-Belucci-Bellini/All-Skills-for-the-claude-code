---
name: game-save-recovery-testing
description: "Tests recovery and integrity of persistent game saves. Use when interrupted writes, corruption, backups, cloud sync, or version migration could destroy player progress."
---

# Game Save Recovery Testing

## Use when
Save tests cover only successful loading and miss crashes between write phases, partially written files, or stale backup selection.

## Workflow
1. Identify save atomicity guarantees, write ordering, checksums, backup rotation, cloud conflict rules, and migration timing.
2. Inject interruption or corruption at each persistence boundary using disposable fixtures, not real player saves.
3. Verify startup selects the newest valid compatible snapshot and preserves broken inputs for diagnosis or recovery.
4. Exercise restore, duplicate backup, stale cloud version, low disk space, and unsupported future schema scenarios.

## Required output
A failure-injection matrix, save-integrity invariants, recovery policy, and evidence of successful restore paths.

## Validation
- The last known-good save remains recoverable after interrupted writes.
- Corruption is reported explicitly instead of silently resetting progress.
- Recovery and migration are tested against versioned fixtures.

## Guardrails
Never test destructive failure injection against the user's only copy of a world or save.
