---
name: atm10-launcher-exit-code-context-analysis
description: "Analyze Minecraft launcher and child-process exit codes in context so a generic nonzero code is not mistaken for a specific mod root cause."
---

# ATM10 Launcher Exit-Code Context Analysis

## Purpose

Determine which process failed first during an ATM10 launch and interpret its exit status alongside Java output, launcher logs, JVM crash files and the final Minecraft log marker.

## Required inputs

Launcher and instance identity, exact Java runtime, captured launch command where available, launcher log, latest.log, crash report and any JVM fatal-error file. Redact tokens and private paths before sharing.

## Workflow

1. Capture the complete launch attempt from the launcher start until process exit, preserving all logs before retrying.
2. Identify the parent launcher process and the Minecraft/Java child process; record which one exited and the actual code reported by each.
3. Find the last confirmed startup phase: JVM launch, loader bootstrap, mod discovery, registry/data loading, world entry or normal gameplay.
4. Treat a nonzero exit code as a symptom, not a root cause. Correlate it with the earliest exception, JVM fatal-error output, dependency resolver message or OS/driver event.
5. Compare the timestamps of launcher messages, Java logs and crash artifacts; note which expected files are missing because startup stopped early.
6. Reproduce once with the same profile and record whether the process terminates at the same phase.
7. Test only the leading evidence-backed hypothesis in a copied profile; avoid changing multiple JVM flags or mods to make an exit code disappear.
8. Deliver a process timeline, evidence-backed classification, confidence and rollback-safe next step.

## Validation checklist

- [ ] Parent launcher and child game process are distinguished.
- [ ] Exact exit code and process source are recorded.
- [ ] The last successful startup phase is identified from logs rather than guessed.
- [ ] The earliest causal error is separated from final shutdown messages.
- [ ] Missing crash artifacts are noted rather than invented.
- [ ] Any candidate correction is tested independently and can be reversed.

## Required output

A process/exit timeline, captured codes, relevant log excerpts, probable failure phase, alternative explanations, confidence and a minimal next diagnostic action.

## Boundaries and failure handling

Never map a generic exit code to a single cause without supporting evidence. Do not delete configs, saves or mods to clear an exit status. If no child-process log exists, explain how to capture the next attempt before changing the environment.

## Trigger examples

- **Positive:** CurseForge or another launcher reports a failed ATM10 start or a numeric process exit code.
- **Negative:** The user asks about gameplay mechanics while the launcher and game start normally.
