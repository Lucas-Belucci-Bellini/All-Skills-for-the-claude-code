---
name: api-contract-to-skill-spec
description: "Transforms repository APIs, CLI commands, configuration formats, and examples into explicit input/output contracts for reusable skills."
---

# Api Contract To Skill Spec

## Purpose

Transforms repository APIs, CLI commands, configuration formats, and examples into explicit input/output contracts for reusable skills.

## When to use

Ensure repository-derived skills use documented/tested API or CLI interfaces correctly.

## Required inputs

Interface source, type definitions, CLI docs/help, configuration examples, and available tests.

## Workflow

1. Identify public interfaces from docs and cross-check implementation, type definitions, examples, or tests where available.
2. Capture required/optional parameters, defaults, units, formats, returns, error categories, version qualifiers, environment assumptions, and side effects.
3. Cite source references for each contract claim and distinguish documentation from implementation observations or hypotheses.
4. Create sanitized normal, invalid, boundary, and unsupported examples; never embed live credentials or private data.
5. Write contracts that detect missing parameters and stop safely instead of guessing.

## Validation checklist

A reviewer can verify every contract item against source or see it marked unverified; secrets are absent.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

API/CLI/config contract with source evidence, version notes, safe examples, error cases, and unresolved discrepancies.

## Boundaries and failure handling

Do not invent guarantees or invoke remote endpoints without authorization. Call out undocumented API reliance and compatibility risk.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Extract this library's CLI/config contract into a skill-ready spec.
- **Negative:** Guess defaults and claim compatibility with versions not inspected.
