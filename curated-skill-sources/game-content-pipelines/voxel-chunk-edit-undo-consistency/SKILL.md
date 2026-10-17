---
name: voxel-chunk-edit-undo-consistency
description: "Use when voxel edits must support undo/redo and remain correct across chunk borders, save/load, or concurrent edits; not for general mesh seam validation."
---

# Voxel Chunk Edit Undo Consistency

## Purpose

Keep the edit history consistent with the authoritative world state when edits span chunk boundaries or persistence events.

## Required inputs

Block-edit API, transaction grouping, undo journal format, chunk coordinates, save checkpoints, and supported conflict policy.

## Workflow

1. Define which changes form a single undoable transaction and record the minimal before/after values with stable world/chunk coordinates.
2. Test interior edits, cross-chunk edits, multiple edits to the same block, grouped operations, redo after a new edit, and invalidated chunks.
3. Save and reload between edit and undo/redo; verify the journal's version and world identity prevent applying history to a different world state.
4. Exercise conflict behavior when another system modifies the affected block, and choose an explicit reject, merge, or compensation rule.

## Verification checklist

- [ ] Undo restores the exact prior logical state, not merely a visually similar mesh.
- [ ] Cross-chunk transactions either complete atomically or have safe recovery semantics.
- [ ] Redo history is invalidated or reconciled after a divergent new edit.
- [ ] Persistent journals reject incompatible schema/world revisions clearly.

## Required output

An undo transaction contract, boundary/reload test matrix, conflict policy, and invariant results.

## Boundaries and failure handling

Use disposable world fixtures. Never apply a test undo journal to valuable or live world data.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Undoing one brush stroke across two chunk boundaries sometimes restores only one side.
- **Negative:** Checking only whether neighboring chunk meshes produce matching seams.
