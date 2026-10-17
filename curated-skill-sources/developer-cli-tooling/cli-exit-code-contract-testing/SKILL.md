---
name: cli-exit-code-contract-testing
description: "Define and verify stable CLI exit-code semantics across success, invalid input, interruption, dependency outage and partial completion."
---

# Cli Exit Code Contract Testing

## Purpose

Make exit statuses reliable for shells and CI instead of forcing callers to parse prose.

## Required inputs

Command outcomes, existing exit codes, wrapper scripts and partial-completion semantics.

## Workflow

1. Inventory normal completion and failures such as bad arguments, missing prerequisites, permissions, timeout and interruption.
2. Define a stable exit-code mapping and reserve success for completion of the documented operation.
3. Trace nested commands to ensure wrappers propagate failures instead of converting them to zero or generic success.
4. Test status independently from output text across shell pipelines and automation wrappers.
5. Document whether partial work may exist after a nonzero result and how callers inspect or recover it.

## Validation checklist

- [ ] Every documented outcome maps to a deterministic code.
- [ ] Invalid input fails before side effects.
- [ ] Cancellation and timeout cannot return success accidentally.
- [ ] Message wording can change without breaking consumers.
- [ ] Partial completion is distinguishable where needed.

## Required output

An exit-code table, command tests and shell/CI integration examples.

## Boundaries and failure handling

Do not change published meanings without compatibility review. If available evidence cannot distinguish causes, return a documented generic failure rather than inventing a diagnosis.

## Trigger examples

- **Positive:** A wrapper continues after a child command fails because it returns exit code zero.
- **Negative:** Rewording CLI help without changing command outcomes.
