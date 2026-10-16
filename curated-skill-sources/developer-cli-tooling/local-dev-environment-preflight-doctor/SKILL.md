---
name: local-dev-environment-preflight-doctor
description: "Design a non-destructive preflight that diagnoses missing tools, versions, paths and required connectivity before development tasks run."
---

# Local Dev Environment Preflight Doctor

## Purpose

Find blockers before lengthy installs or builds and provide actionable remediation without silently changing a machine.

## Required inputs

Task prerequisites, supported platforms, tool versions, filesystem needs and connectivity requirements.

## Workflow

1. Translate prerequisites into checks with expected values and safe probes.
2. Separate required blockers from optional recommendations and transient warnings.
3. Run read-only checks first; put any installation or fix behind a separate explicit action.
4. Test missing executables, wrong versions, permissions, offline mode and unusual installation paths.
5. Redact secrets and personal paths in reports that may be attached to support issues.

## Validation checklist

- [ ] Preflight does not install packages or modify files.
- [ ] Each check reports actual state and remediation.
- [ ] Warnings are distinct from blockers.
- [ ] Network failure is not misreported as a missing executable.
- [ ] Shareable output minimizes secrets and personal paths.

## Required output

Prerequisite matrix, diagnostic flow, sample report and failure-mode tests.

## Boundaries and failure handling

Do not elevate permissions or fix the environment silently. Verify credential presence without printing credential values.

## Trigger examples

- **Positive:** A build fails after ten minutes because the compiler was absent.
- **Negative:** Installing a dependency before any prerequisites have been defined.
