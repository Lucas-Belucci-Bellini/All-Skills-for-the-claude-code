---
description: "Prepares an evidence-backed go or no-go review for a candidate change without publishing or merging it."
argument-hint: [PR, branch, release candidate, or change scope]
---

Prepare a release-gate assessment for this candidate:

$ARGUMENTS

## Workflow

1. Determine the candidate identity, base/head revisions, changed-file scope, intended consumers, and release criteria. If the candidate cannot be pinned to a revision, mark the gate inconclusive.
2. Delegate a read-only evaluation plan to `agent-orchestration-workbench:agent-evaluation-designer`. Ask for claims to test, baseline, expected evidence, and pass/fail/skip rules.
3. Delegate bounded test execution to `agent-orchestration-workbench:orchestration-test-engineer`. Require synthetic fixtures by default and inspect command side effects before running them.
4. After tests, delegate a read-only runtime review to `agent-orchestration-workbench:orchestration-runtime-reviewer` and a read-only security review to `agent-orchestration-workbench:agent-security-auditor`.
5. Independently verify package/catalog/manifests, source-to-generated parity, version consistency, provenance/license notes, and required documentation where those items are in scope.
6. Treat any missing required evidence as blocked or inconclusive rather than passed. Keep automatic tool results and human editorial reviews as separate categories.
7. Produce a go/no-go recommendation for a human maintainer. A go recommendation means evidence is ready for a human decision; it does not authorize a merge or release.

## Required output

- Candidate revisions and exact scope.
- Gate matrix with evidence links, observed result, and owner for any remaining check.
- Required checks that passed, failed, were skipped, or are unverified.
- Defects and risk acceptances, each tied to an explicit reason and approver.
- Final recommendation: go for human review, no-go, or inconclusive.

## Safety boundaries

- Never treat a draft PR description as proof of tested behavior.
- Do not publish, release, deploy, merge, auto-approve, or change repository visibility.
- Do not invent provenance clearance or claim an external runtime test occurred without observed evidence.
- Do not merge, publish, deploy, or change repository visibility without explicit user authorization.
