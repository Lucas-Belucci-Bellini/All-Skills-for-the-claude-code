---
name: projecte-emc-balance-change-approval-record
description: "Records approval and rationale for EMC behavior changes before release. Use when reviewers must accept or reject proposed balancing decisions."
---

# ProjectE EMC Balance Change Approval Record

## Purpose

reviewed diff, policy profile, tests, affected progression items, reviewer identity, and decision status

## Required inputs

Summarize behavioral impact, evidence, unresolved risks, and rollback method for each change group.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Capture explicit approve/reject/defer decisions and require outstanding high-risk findings to have an owner or block release.
3. An approval record tied to candidate digest and test evidence.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce an ai-generated recommendation is not approval; never infer a human sign-off from silence. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

An AI-generated recommendation is not approval; never infer a human sign-off from silence.

## Boundaries and failure handling

The final values are ready for release review. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The work is exploratory and no approval/release decision is being recorded.
- **Negative:** undefined
