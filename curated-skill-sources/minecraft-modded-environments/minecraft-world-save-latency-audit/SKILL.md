---
name: minecraft-world-save-latency-audit
description: "Use when world saves/autosaves stall a modded server and save latency must be separated from normal tick load; not for backup/restore correctness."
---

# Minecraft World Save Latency Audit

## Purpose

Measure save impact and identify disk, serialization, mod hooks, or concurrent storage work.

## Required inputs

Server/loader version, mod list, save cadence, tick timings, save logs, storage metrics, copied representative world.

## Workflow

1. Capture tick and save phase timing during controlled autosaves and explicit saves.
2. Separate serialization, region writes, mod save hooks, chunk flushes, and external backup/sync activity where possible.
3. Repeat with representative chunks and controlled background I/O; compare median and tail latency.
4. Test targeted changes and verify stalls improve without weakening persistence guarantees.

## Verification checklist

- [ ] Save duration is measured separately from average tick time.
- [ ] Tail latency and loaded world size are represented.
- [ ] No suggestion disables required persistence or assumes unflushed data is durable.
- [ ] Backup/antivirus/sync activity is recorded as a possible confounder.

## Required output

A save-latency timeline, correlated tick/I/O evidence, candidate causes, and safe mitigations.

## Boundaries and failure handling

Use copied worlds or approved test windows; do not disable saving or force-kill a server for a benchmark.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Players freeze periodically during autosave in a growing modpack.
- **Negative:** Sizing CPU/RAM for player count with no save-time symptom.
