---
name: voice-agent-pointer-context-snapshot
description: "Bind point-and-ask voice requests to an immutable pointer or viewport snapshot captured for that turn."
---

# Voice Agent Pointer Context Snapshot

## Purpose

Ensure the feature a user points at is the feature the corresponding spoken question describes, even if the cursor later moves.

## Required inputs

Pointer picking, viewport/crop capture, turn IDs, entity context, and asynchronous speech/tool event timing.

## Workflow

1. Define the exact moment the pointer location, selected feature, and viewport context are captured for a turn.
2. Store an immutable snapshot with a generation ID rather than reading current pointer state when the tool eventually runs.
3. Test cursor movement, map panning, entity removal, and a second question while the first is pending.
4. Verify that stale snapshots are either explicitly referenced or rejected with a clarification instead of silently rebound.

## Validation checklist

- [ ] Each request uses the snapshot associated with its own turn ID.
- [ ] A moving pointer cannot retarget an in-flight question.
- [ ] Entity context is revalidated for removal and privacy policy before use.
- [ ] Captured images or coordinates obey retention and deletion limits.

## Required output

A snapshot timing contract, concurrent-turn fixtures, and an explicit stale-context fallback.

## Boundaries and failure handling

Do not capture more of the screen or more precise location than the action needs; avoid hidden collection beyond user intent.

## Trigger examples

- **Positive:** A user points to one marker and asks a question, but the answer uses a later cursor position.
- **Negative:** A request to collect or retain screenshots continuously without a clear user action.
