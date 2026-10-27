---
name: agent-escalation-on-uncertainty-policy
description: "Sets explicit conditions for an agent to stop, ask for review, or continue under uncertainty. Use when missing or conflicting evidence could change action safety or correctness."
---

# Agent Escalation on Uncertainty Policy

## Purpose

Make uncertainty decisions impact-aware and actionable instead of relying on vague instructions to use judgment.

## Required inputs

Task objective, impact tier, evidence requirements, fallback actions, calibration examples, and human escalation route.

## Workflow

1. List uncertainties that can affect identity, scope, authorization, data integrity, or irreversible consequences.
2. Map uncertainty classes and impact tiers to stop, escalate, or reversible fallback behaviors.
3. Distinguish missing evidence from contradictory evidence and ambiguous requirements.
4. State the unresolved question and the smallest check or input that could resolve it.
5. Continue only on independent reversible work that does not rely on the uncertain premise.
6. Test representative cases where the correct decision is continue, ask, stop, or inconclusive.

## Validation checklist

- [ ] Escalation depends on impact and reversibility, not confidence alone.
- [ ] Missing and contradictory evidence are separate conditions.
- [ ] Requests identify the decision needed and evidence available.
- [ ] Uncertain assumptions are not promoted into facts downstream.

## Required output

An uncertainty taxonomy, impact/action matrix, escalation template, and decision fixtures.

## Boundaries and failure handling

Do not invent calibrated confidence scores; hard authorization requirements cannot be overridden by confidence.

## Trigger examples

- **Positive:** An agent finds ambiguous resource ownership before modifying a remote asset.
- **Negative:** A low-impact creative task permits reasonable stylistic choices.
