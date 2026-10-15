---
name: skill-documentation-example-audit
description: Validate the code snippets, commands, links, assumptions, and expected outputs included in a skill before publishing it.
---

# Skill Documentation Example Audit

## Goal

Prevent a skill from teaching a plausible-looking but invalid workflow, especially when commands or APIs change over time.

## Inputs to inspect

Skill entrypoint, local supporting files, referenced external documentation, sample commands, claimed outputs, and supported environments.

## Workflow

1. Extract all code blocks, shell commands, package names, API endpoints, flags, file paths, version claims, and external links from the skill.
2. Classify each example as executable, illustrative placeholder, pseudo-code, or environment-dependent. Ensure placeholders are labeled and cannot be mistaken for real credentials or endpoints.
3. Validate syntax and command semantics in a disposable environment when possible. Use official/current documentation for version-sensitive behavior and record the supported version range.
4. Check examples for destructive defaults, leaking secrets, insecure permissions, unbounded file operations, and assumptions about OS, shell, directory, or installed tools.
5. Reconcile prose with observed output. If runtime validation was unavailable, state that limitation in the skill's validation notes rather than implying execution.

## Validation checklist

- [ ] Executable examples are tested or explicitly labeled untested.
- [ ] Placeholders are conspicuous and safe to copy accidentally.
- [ ] External links resolve to relevant official or primary documentation where possible.
- [ ] Commands include necessary context and warn before irreversible side effects.
- [ ] Expected outputs align with actual behavior and do not assert unsupported success.

## Required output

Produce an example inventory with validation status, source links, fixes, environment requirements, and remaining unverified claims.

## Boundaries and failure handling

Do not invent output to make a tutorial look complete; do not run destructive examples against a user's real environment.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
