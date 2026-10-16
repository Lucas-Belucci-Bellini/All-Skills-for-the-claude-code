---
name: multiplayer-reconnect-command-deduplication
description: "Use when reconnects resend commands whose server result is unknown and duplicate actions are possible; not for general state resynchronization."
---

# Multiplayer Reconnect Command Deduplication

## Purpose

Use when reconnects resend commands whose server result is unknown and duplicate actions are possible; not for general state resynchronization.

## Required inputs

Inputs: command IDs, session epochs, server processing path, dedupe storage, acknowledgements and reconnect harness.

## Workflow

1. Define stable command identity across retransmission and distinguish new input after epoch changes.
2. Test disconnect before send, after server commit but before ack, during processing, and after resync.
3. Verify dedupe state survives the retry window and returns original result or stale-command response.
4. Bound storage/expiry so old commands cannot execute again too soon or records grow without limit.

## Verification checklist

Checks: same action retains identity; commit-before-ack cannot apply twice; epochs prevent new-command collisions; eviction policy matches retry window.

## Required output

Output: reconnect/ack diagram, duplicate-command tests, retention policy, state-reconciliation evidence.

## Boundaries and failure handling

Boundary: use isolated sessions and synthetic data; never replay commands against live player state.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: a purchase commits before disconnect and is resent after reconnect.
- Negative: Negative: repairing a stale entity snapshot when no command is retried.
