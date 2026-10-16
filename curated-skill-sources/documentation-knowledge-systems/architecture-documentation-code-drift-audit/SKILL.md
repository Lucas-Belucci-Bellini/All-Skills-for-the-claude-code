---
name: architecture-documentation-code-drift-audit
description: "Compare architecture docs and diagrams with repository structure and runtime wiring to find stale claims about dependencies, ownership and execution flow."
---

# Architecture Documentation Code Drift Audit

## Purpose

Keep architecture docs useful for design and onboarding with source-backed claims.

## Required inputs

Architecture pages/diagrams, repository tree, module manifests, runtime entry points and dependency wiring.

## Workflow

1. Extract testable claims about ownership, dependency direction, entry points, persistence and deployment units.
2. Locate source evidence such as manifests, imports, route registration and composition roots.
3. Classify claims current, stale, ambiguous or unverifiable from available evidence.
4. Correct the smallest affected doc section and link the evidence future reviewers can repeat.
5. Automate checks for stable facts while keeping conceptual diagrams under human review.

## Validation checklist

- [ ] Documented modules and entry points exist at stated paths.
- [ ] Ownership and dependency claims match source evidence.
- [ ] Runtime/generated/external edges are disclosed where material.
- [ ] Aspirational intent is not presented as implemented fact.
- [ ] Corrections have traceable references.

## Required output

Claim-to-source table, drift report and corrected doc patch with automation candidates.

## Boundaries and failure handling

Do not infer runtime composition from imports alone. Keep roadmap aspirations separate from implemented capabilities.

## Trigger examples

- **Positive:** Docs say one module owns authentication but route wiring delegates to another.
- **Negative:** Updating a vision document without making claims about current implementation.
