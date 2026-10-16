---
name: technical-example-executability-audit
description: "Validate documented code, shell commands and configuration examples in isolated fixtures against stated versions and prerequisites."
---

# Technical Example Executability Audit

## Purpose

Prevent tutorials and references from teaching commands that no longer run under their claimed environment.

## Required inputs

Documentation pages, fenced examples, supported runtimes, dependencies and safe validation environment.

## Workflow

1. Inventory runnable snippets and label runtime, prerequisites and whether each is executable or illustrative.
2. Extract self-contained snippets while preserving context for examples with earlier setup steps.
3. Run examples in temporary isolated fixtures with pinned dependencies and no production credentials.
4. Compare observed output and error behavior with documentation, allowing only defined variable fields.
5. Record unexecuted snippets explicitly and add CI checks for high-value copy/paste examples.

## Validation checklist

- [ ] Runnable examples state prerequisites and versions.
- [ ] Tests cannot modify real user data or access production credentials.
- [ ] Expected output identifies variable fields.
- [ ] Failures identify source page and snippet location.
- [ ] Unexecuted examples are not reported as verified.

## Required output

Example inventory, execution status, reproducible failures and a prioritized CI plan.

## Boundaries and failure handling

Do not run destructive documented commands against real workspaces. Update version claims rather than hiding incompatibility.

## Trigger examples

- **Positive:** A README install command fails on the minimum supported runtime.
- **Negative:** Styling prose that contains no runnable example.
