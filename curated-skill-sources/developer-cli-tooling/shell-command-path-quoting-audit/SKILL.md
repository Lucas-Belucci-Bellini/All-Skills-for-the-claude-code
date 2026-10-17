---
name: shell-command-path-quoting-audit
description: "Audit shell commands for path quoting, argument boundaries, wildcard expansion and platform-specific escaping."
---

# Shell Command Path Quoting Audit

## Purpose

Make paths containing spaces, Unicode, wildcard characters or leading dashes behave as intended.

## Required inputs

Shell scripts, subprocess invocation code, supported shells and representative path fixtures.

## Workflow

1. Identify paths and arguments crossing shell parsing boundaries; distinguish argv arrays from command strings.
2. Create fixtures with spaces, Unicode, quotes, wildcard characters, brackets and leading hyphens.
3. Prefer direct argument arrays and verify quoting only where shell parsing is necessary.
4. Test globbing, option-like filenames, nested quoting and Windows/POSIX conventions separately.
5. Check errors and logs for unnecessary exposure of sensitive absolute paths.

## Validation checklist

- [ ] User paths remain a single argument when required.
- [ ] Direct subprocess APIs avoid unnecessary shell parsing.
- [ ] Wildcard and leading-dash behavior is intentional.
- [ ] Platform-specific escaping is tested in the right shell.
- [ ] Tests include spaces and non-ASCII paths.

## Required output

A shell-boundary inventory, unsafe call sites and cross-platform regression fixtures.

## Boundaries and failure handling

Quoting does not replace validation or permission checks. Do not execute destructive commands against real user paths while auditing.

## Trigger examples

- **Positive:** A workspace path with spaces gets split into several subprocess arguments.
- **Negative:** Formatting CLI help with no argument-boundary issue.
