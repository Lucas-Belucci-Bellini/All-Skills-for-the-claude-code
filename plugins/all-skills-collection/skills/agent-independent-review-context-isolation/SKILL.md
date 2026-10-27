---
name: agent-independent-review-context-isolation
description: "Separates review evidence from a generating agent's persuasive narrative to reduce anchoring. Use when a second agent must independently assess a change or result."
---

# Agent Independent Review Context Isolation

## Purpose

Treat review independence as a property of review inputs, not merely a different agent identity.

## Required inputs

Artifact or diff, acceptance rubric, required evidence, reviewer role, shared-context rules, and sensitive-data policy.

## Workflow

1. Define the artifacts and acceptance criteria the reviewer needs, excluding generator commentary that may anchor the verdict.
2. Create a minimal packet with immutable artifact digest, requirements, reproducible checks, and known limitations.
3. Keep generator conclusions and unsupported confidence claims out of blind review context where practical.
4. Record shared provider, shared data, and prior exposure that limit independence.
5. Collect criterion-by-criterion findings with artifact references, then compare the independent reviews.
6. Preserve disagreements until a separate evidence-based adjudication resolves them.

## Validation checklist

- [ ] Reviewer and generator refer to the same artifact version.
- [ ] Blind or partial context boundaries are recorded.
- [ ] Shared sources and provider limitations are disclosed.
- [ ] Findings cite criteria and evidence rather than copied conclusions.

## Required output

A review-packet manifest, context-exposure statement, independent findings, and unresolved-disagreement register.

## Boundaries and failure handling

Separate agents are not necessarily statistically independent; do not claim blind review after the reviewer saw the generator's rationale.

## Trigger examples

- **Positive:** A second agent must independently review a pull request or evidence-based report.
- **Negative:** Shared-context pair programming is intentional and no independent verdict is claimed.
