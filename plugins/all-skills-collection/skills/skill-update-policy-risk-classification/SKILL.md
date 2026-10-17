---
name: skill-update-policy-risk-classification
description: "Classifies skill updates by behavioral and operational risk before automatic rollout. Use when deciding which approved changes may update clients automatically."
---

# Skill Update Policy Risk Classification

## Purpose

Make automation proportional to the consequences of an incorrect skill update.

## Required inputs

Diff, behavior-change summary, tools/commands referenced, permissions affected, release blast radius, validation results, and rollback capability.

## Workflow

1. Compare the candidate with its previous immutable version and enumerate changed triggers, decision steps, tool calls, permissions, dependencies, and outputs.
2. Assign risk based on side effects, secret access, external network, destructive operations, release/deploy behavior, target reach, and recoverability.
3. Define eligibility tiers such as metadata-only, low-risk nonbehavioral, ordinary behavior change, high-impact/security-sensitive, and blocked/unreviewable.
4. Map each tier to required tests, human approval, rollout scope, observation window, and rollback requirements.
5. Test classification with safe, ambiguous, security-sensitive, and clearly unsafe diffs; require an explanation for the selected tier.

## Validation checklist

- [ ] Risk is based on behavior and impact, not merely diff size.
- [ ] Unknown or security-sensitive changes do not enter the lowest-risk tier.
- [ ] Auto-update eligibility is explicit and configurable.
- [ ] Required approval cannot be bypassed by skill-authored instructions.
- [ ] The risk record includes reasons and validation evidence.

## Required output

A change risk record, approval/test policy mapping, and classification examples.

## Boundaries and failure handling

Do not enable auto-merge because a model labels a diff low risk. High-impact changes require independent review; if the diff cannot be understood, block rollout as unreviewed.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A proposed skill update needs a risk tier before automatic distribution to agents.
- **Negative:** A client is refreshing an exact cached version and no library content is changing.
