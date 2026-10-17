---
name: cli-signal-cancellation-process-tree
description: "Verify command interruption stops child processes, finalizes safe state and returns a documented result without orphaned work."
---

# Cli Signal Cancellation Process Tree

## Purpose

Make cancellation predictable for commands that launch subprocesses or perform long-running work.

## Required inputs

Signal handlers, subprocess launches, task lifecycle, cleanup logic and supported operating systems.

## Workflow

1. Map the parent command and every descendant it may launch, including detached processes.
2. Define behavior for user interruption, termination requests, cancellation tokens and repeated signals.
3. Propagate cancellation to children and bound the time the parent waits for them.
4. Test interruption before work, during writes, during child execution and during cleanup.
5. Verify final status distinguishes interruption and records incomplete work or recovery hints.

## Validation checklist

- [ ] Children receive platform-appropriate cancellation.
- [ ] Cleanup has a bounded deadline.
- [ ] Durable output is finalized or marked incomplete.
- [ ] Repeated signals do not run destructive cleanup twice.
- [ ] Tests detect orphaned children or held resources.

## Required output

A cancellation state diagram, process-tree policy, interruption tests and known limits.

## Boundaries and failure handling

Do not terminate unrelated processes by broad name matching. Killing a process does not prove external side effects were rolled back.

## Trigger examples

- **Positive:** Ctrl+C exits the CLI but leaves a worker consuming CPU.
- **Negative:** Mapping argument validation to exit codes when no subprocess exists.
