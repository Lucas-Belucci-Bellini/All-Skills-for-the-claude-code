---
name: agent-plan-vs-execution-verification
description: Compare an agent's proposed plan with its actual tool actions, diff, and verification evidence before declaring a task complete.
---

# Agent Plan Vs Execution Verification

## Goal

Detect skipped steps, scope drift, unperformed tests, and false completion claims in autonomous workflows.

## Inputs to inspect

Initial plan, tool-call trace, repository diff, expected artifacts, test outputs, and permission constraints.

## Workflow

1. Translate the plan into observable acceptance criteria and mark steps that require an external action, user approval, or environmental access.
2. After execution, reconstruct actual actions from tool results, changed files, commands, and outputs; do not infer completion from agent narration alone.
3. Compare intended scope against the actual diff and side effects, including files changed unexpectedly and planned tasks not attempted.
4. Map each acceptance criterion to direct evidence such as a passing command, inspected file, API result, or clearly marked blocked status.
5. Generate a final ledger of done, verified, partially done, blocked, and not tested; require approval before attempting out-of-scope repairs.

## Validation checklist

- [ ] Each claimed completion maps to observed evidence.
- [ ] Tests not run are distinguished from tests that failed.
- [ ] Scope drift and extra side effects are called out explicitly.
- [ ] External actions are not reported successful without confirmation from the tool/service.
- [ ] Final acceptance is based on outputs and diffs, not the length or confidence of the narrative.

## Required output

Deliver a plan-versus-execution ledger, acceptance evidence map, scope-diff review, and honest final status report.

## Boundaries and failure handling

Do not fabricate command output or assume a tool call succeeded because it was issued; do not extend scope just to make all plan items appear completed.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
