---
name: claude-code-hook-safety-review
description: Audit Claude Code hooks for unintended shell execution, secret exposure, latency, recursive invocation, and destructive side effects.
---

# Claude Code Hook Safety Review

## Goal

Keep event-driven automation predictable and fail-safe across session, tool, and notification boundaries.

## Inputs to inspect

Hook configuration, referenced scripts, environment variables, event types, timeout settings, and expected behavior.

## Workflow

1. Enumerate each configured hook, its event, matcher, command, inherited environment, timeout, and whether it can block or modify a tool call.
2. Follow the full command chain into scripts, package managers, shell startup files, and subprocesses. Resolve relative paths and identify reliance on current working directory or network downloads.
3. Inspect quoting and serialization at every data boundary; test filenames with spaces, quotes, newlines, shell metacharacters, and Unicode where relevant.
4. Check for recursive hook triggers, duplicated execution, broad file writes, accidental credential logging, network exfiltration, and commands that assume trusted tool input.
5. Run hooks in a disposable checkout with timeouts and captured logs. Test missing executables, malformed input, cancellation, non-zero exit codes, and repeated events.

## Validation checklist

- [ ] Hook actions are scoped to explicit paths and known event types.
- [ ] User-controlled values are passed as arguments or structured input rather than interpolated into shell commands.
- [ ] Timeout and error behavior are intentional and do not silently approve risky actions.
- [ ] Repeated calls are idempotent or guarded against duplicate side effects.
- [ ] Logs reveal operational status without printing tokens, secrets, or sensitive file contents.

## Required output

Produce a hook-by-hook safety matrix, confirmed findings, severity, minimal fixes, and a test plan for normal and failure paths.

## Boundaries and failure handling

Do not assume a hook is safe because it lives in the repository; review every executable it invokes and every inherited permission.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
