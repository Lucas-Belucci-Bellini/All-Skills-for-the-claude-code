---
name: agent-artifact-quality-gates
description: "Defines acceptance gates for files produced by agents. Use when an agent generates code, reports, plans, schemas, migrations, or assets that must be reviewed before adoption."
---

# Agent Artifact Quality Gates

## Use when
An agent declares work finished although outputs are missing, inconsistent, untested, or unsupported by evidence.

## Workflow
1. Define deliverable paths, schema/format requirements, completeness criteria, and the evidence each artifact must include before work begins.
2. Validate cheap structural properties automatically, then run domain-specific checks proportional to risk and reversibility.
3. Cross-check related artifacts for version, names, IDs, dependencies, and claims that must agree.
4. Return precise failures and retry only failed checks; do not replace a missing artifact with a success summary.

## Required output
A deliverable contract, machine-checkable acceptance list, error report format, and escalation conditions.

## Validation
- Every required output has an observable existence/content check.
- Validation distinguishes passed, failed, skipped, and not applicable.
- A final success status requires all mandatory gates.

## Guardrails
Do not treat generated text, tool-call completion, or a green linter as proof that the real-world behavior works.
