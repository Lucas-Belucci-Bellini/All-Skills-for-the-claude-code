---
name: resolving-merge-conflicts-safely
description: "Diagnoses and resolves Git merge or rebase conflicts while preserving the intent of both sides. Use when Git reports conflicts in source, configuration, generated files, or documentation."
---

# Resolving Merge Conflicts Safely

## Goal
Resolve conflicts by understanding intent and validating the resulting behavior rather than choosing a side mechanically.

## Workflow
1. Record the current branch, operation in progress, repository status, and conflicted paths.
2. Identify the merge base and inspect the common ancestor plus both conflicting versions when available.
3. For each conflict, determine the intended behavior of the current branch and incoming branch; read nearby code and relevant tests.
4. Resolve semantic conflicts manually. Preserve independent changes from both sides where compatible.
5. For generated or lock files, use the project's documented regeneration procedure rather than hand-editing opaque sections.
6. Check related call sites, configuration, APIs, and tests for assumptions affected by the resolution.
7. Review the complete resolved diff, including files Git no longer marks conflicted.
8. Run formatting, static analysis, targeted tests, and broader checks appropriate to the risk.
9. Confirm the repository state and finish the merge/rebase only when the user-authorized workflow permits it.
10. Summarize conflict choices, unresolved questions, checks run, and any remaining risk.

## Deliverable
- Conflict-by-conflict rationale.
- Resolved diff and validation evidence.
- Clear note of any unresolved ambiguity.

## Acceptance criteria
- No conflict markers remain in affected files.
- Both sides' intended behavior is accounted for or explicitly rejected with rationale.
- Relevant tests and checks pass, or failures are clearly documented.
- Git operation state is clean and understood.

## Guardrails
- Do not resolve all conflicts by blindly accepting ours or theirs.
- Do not abort, reset, or discard work without understanding the consequences.
- Do not force-push a rewritten branch without explicit approval.

