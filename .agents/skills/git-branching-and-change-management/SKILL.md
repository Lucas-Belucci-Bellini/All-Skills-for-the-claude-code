---
name: git-branching-and-change-management
description: "Plans safe branch-based changes with clear scope, review boundaries, and traceable commits. Use when starting a feature, preparing a focused commit series, or coordinating work without modifying protected branches directly."
---

# Git Branching and Change Management

## Goal
Keep changes reviewable, traceable, and isolated so work can be validated and integrated deliberately.

## Workflow
1. Inspect repository status, current branch, remotes, recent commits, and existing project contribution rules before changing files.
2. Confirm the intended base branch and create a descriptive feature or fix branch from the correct commit.
3. Define a small scope and acceptance criteria; split unrelated changes into separate branches or commits.
4. Check whether the target files already contain local changes. Never overwrite or discard uncommitted work without explicit authorization.
5. Make incremental edits and inspect the diff after each coherent unit of work.
6. Run relevant formatting, linting, tests, and validation before committing; record checks that could not run.
7. Write commits that explain intent, keep unrelated formatting churn out, and avoid secrets or generated artifacts unless required.
8. Before opening a pull request, confirm the base/head relationship, changed-file list, diff summary, and whether the branch is stacked on another unmerged branch.
9. Keep review and integration separate from implementation. Merge only with explicit authorization and after required checks pass.
10. Report branch, commits, tests, known limitations, and next safe action.

## Deliverable
- Branch and change scope.
- Focused commits and reviewed diff.
- Validation results and integration notes.

## Acceptance criteria
- Existing user changes remain intact.
- The diff matches the stated scope.
- Validation is reported accurately.
- No protected branch is modified or merged without permission.

## Guardrails
- Do not force-push or rewrite shared history without explicit approval.
- Do not merge a pull request just because it is green.
- Do not claim tests passed when they were not run.

