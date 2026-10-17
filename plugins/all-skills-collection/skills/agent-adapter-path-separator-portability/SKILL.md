---
name: agent-adapter-path-separator-portability
description: "Checks path portability across operating systems and provider runtimes. Use when skills reference local scripts, files, or commands."
---

# Adapter Path Separator Portability

## Purpose

package paths, target OS, shell, and case-sensitivity assumptions

## Required inputs

Scan references for hard-coded path separators, drive letters, case differences, and traversal assumptions.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Verify normalized relative paths on the target platform or in a platform-appropriate fixture.
3. A portability report with exact path failures and safe normalization proposals.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not rewrite operating-system-specific paths unless the skill's target runtime is known. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not rewrite operating-system-specific paths unless the skill's target runtime is known.

## Boundaries and failure handling

A skill package must work on Windows and Unix-like environments. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** All paths are abstract URLs or portable relative references with no OS-specific use.
- **Negative:** undefined
