---
name: cli-stdout-stderr-channel-contract
description: "Audit CLI channels so machine-readable results remain on stdout while diagnostics, progress and warnings use stderr."
---

# Cli Stdout Stderr Channel Contract

## Purpose

Keep command output composable in pipelines without suppressing useful diagnostics.

## Required inputs

CLI commands, output modes, logging helpers and shell-pipeline consumers.

## Workflow

1. Identify primary results separately from progress, logs, warnings and diagnostics.
2. Define stdout formats and stderr behavior for normal, quiet and machine-readable modes.
3. Trace shared logging helpers and subprocess output for banners that contaminate structured output.
4. Test JSON parsing, redirection, pipelines, verbose mode and non-interactive execution.
5. Verify errors remain diagnosable when stdout is redirected or consumed by another process.

## Validation checklist

- [ ] Structured stdout contains only the declared format.
- [ ] Progress and diagnostics follow the documented channel.
- [ ] Quiet mode suppresses chatter without hiding failure evidence.
- [ ] Redirecting stdout does not hide critical diagnostics.
- [ ] Exit status, not prose scraping, communicates command failure.

## Required output

A command/channel matrix, contaminated call sites and regression tests.

## Boundaries and failure handling

Do not silently change a published output format. Never print secrets or sensitive arguments to either channel.

## Trigger examples

- **Positive:** A command claims to output JSON but writes a startup banner into stdout.
- **Negative:** Styling a human-only help screen with no structured-output contract.
