---
name: static-analysis-and-linting
description: "Configures and interprets formatters, linters, type checkers, and static analyzers to catch defects consistently. Use when adding code-quality gates, diagnosing warnings, or tightening a project's static checks."
---

# Static Analysis and Linting

## Goal
Catch likely defects and enforce consistent conventions with actionable, low-noise tooling.

## Workflow
1. Identify the language, supported versions, existing formatter/linter/type checker, and current baseline of warnings.
2. Prefer the project's established toolchain; introduce a new analyzer only for a specific gap it addresses.
3. Configure checks reproducibly and align editor, local commands, and CI settings.
4. Separate correctness rules from style preferences and explain any rule with meaningful maintenance or safety impact.
5. Run analysis on the current baseline before enforcing new rules; distinguish pre-existing findings from regressions.
6. Fix findings by understanding the underlying issue rather than suppressing diagnostics indiscriminately.
7. Scope suppressions narrowly, add a reason, and use expiry or follow-up tracking where supported.
8. Check generated code and vendored files explicitly so exclusions do not hide first-party problems.
9. Add CI gates in stages if a large legacy baseline would otherwise block all progress.
10. Report tool versions, commands, warnings, and remaining exceptions.

## Deliverable
- Tool configuration and documented commands.
- Baseline/regression policy.
- Findings resolved or narrowly suppressed with rationale.

## Acceptance criteria
- Local and CI results are consistent.
- New issues are detected without hiding unrelated errors.
- Suppressions are explainable and minimal.
- Tooling does not duplicate existing checks without clear value.

## Guardrails
- Do not disable broad rule sets merely to get a green build.
- Do not automatically rewrite large unrelated parts of the repository.
- Do not equate zero lint warnings with correct runtime behavior.

