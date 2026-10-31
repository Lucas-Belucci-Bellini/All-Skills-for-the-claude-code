---
name: nexora-ai-generated-content-validation
description: "Validates AI-generated item, quest, dialogue, or behavior data before adding it to the engine registry."
---

# nexora ai generated content validation

## Purpose

Use this workflow for NEXORA-scale engine work when AI-generated game content and runtime validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Treat generated output as untrusted structured data.
2. parse against a strict schema.
3. validate identifiers, references, and semantic constraints.
4. check content policy and license/provenance requirements as applicable.
5. cap size and complexity.
6. compile or simulate in a disposable validation environment.
7. reject unresolved dependencies.
8. publish only through the normal content transaction.
9. record source and validation status.
10. test malformed and adversarial output.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Generated content cannot bypass ordinary schema, capability, and registry validation.

Do not execute generated code during validation. Never publish content merely because it is syntactically valid.

## Trigger examples

- **Positive:** A code change or incident directly involves AI-generated game content and runtime validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
