---
name: engine-editor-undo-redo-transaction
description: Design and audit transactional editor undo/redo operations so multi-object edits remain atomic, reversible, and safe across asset or scene changes.
---

# Engine Editor Undo/Redo Transaction

## Purpose

Make editor commands reversible without leaving partially modified scenes, stale references, or inconsistent derived state.

## Required inputs

Editor command model, scene/document data model, selection and object identity rules, asset references, undo history format, and existing regression tests.

## Workflow

1. Identify the unit of user intent and group all mutations from one operation into a single command or transaction.
2. Define before/after state capture, stable object identifiers, and ownership of resources created or destroyed by the command.
3. Specify rollback behavior when validation or persistence fails halfway through a multi-object operation.
4. Verify undo and redo restore authoritative state while invalidating or rebuilding derived caches, indexes, and editor views.
5. Handle deleted or externally changed assets, stale selections, nested commands, and history truncation explicitly.
6. Test command sequences with apply/undo/redo cycles, injected failures, repeated operations, and save/reopen boundaries.
7. Measure history memory growth and document when commands store snapshots, inverse operations, or compact deltas.

## Validation checklist

- [ ] Each editor operation is atomic or has a documented partial-failure recovery path.
- [ ] Undo then redo restores the same canonical document state.
- [ ] Stable IDs prevent references from silently binding to a different object after deletion/recreation.
- [ ] Derived state is rebuilt or invalidated after history traversal.

## Required output

A command/transaction contract, state transition table, failure-recovery rules, and regression sequence fixtures.

## Boundaries and failure handling

Do not assume every command is safely reversible. For external side effects, define compensating actions or mark the operation as a history boundary.

## Trigger examples

- **Positive:** The task concerns editor command history, reversible scene edits, atomic multi-object changes, or undo/redo bugs.
- **Negative:** The task only concerns runtime gameplay state that is not edited through the engine's authoring tools.
