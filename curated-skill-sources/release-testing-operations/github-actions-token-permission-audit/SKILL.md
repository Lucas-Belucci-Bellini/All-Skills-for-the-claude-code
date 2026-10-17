---
name: github-actions-token-permission-audit
description: "Use when reviewing GitHub Actions workflow permissions and job tokens for excess repository access; not for external cloud credential rotation."
---

# Github Actions Token Permission Audit

## Purpose

Reduce CI authority to the minimum permissions each job needs.

## Required inputs

Workflow YAML, reusable workflows, event triggers, GITHUB_TOKEN scopes, third-party actions, protected environments, required writes.

## Workflow

1. Inventory workflows, triggers, reusable workflows, action versions, and jobs that mutate repository state.
2. Map each job to required API operations; apply restrictive defaults and grant narrow job-level scopes only where needed.
3. Review fork events, publishing triggers, pull_request_target, artifact handoff, and untrusted shell interpolation.
4. Add a policy lint or regression check that prevents new workflows from restoring broad permissions.

## Verification checklist

- [ ] Permissions are explicit and minimally scoped.
- [ ] Fork-originated changes cannot access publishing/deployment authority by default.
- [ ] Third-party actions follow repository pinning policy.
- [ ] Jobs that only test/read do not receive unnecessary write scopes.

## Required output

A workflow-to-permission matrix, risk findings, proposed least-privilege change, and regression guard.

## Boundaries and failure handling

Do not execute production publishing/deployment just to test permissions; never expose repository secrets.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A PR validation workflow has contents: write but only runs tests.
- **Negative:** Rotating a cloud API key used by deployment.
