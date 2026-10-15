---
name: skill-trigger-routing-evaluation
description: "Measures whether skill descriptions route requests to the right skill. Use when skill invocation is inconsistent, overlapping skills compete, or a large library needs reliable retrieval."
---

# Skill Trigger Routing Evaluation

## Use when
Agents fail to trigger useful skills or activate neighboring skills because descriptions use generic, overlapping language.

## Workflow
1. Create positive, negative, and confusable user requests for each candidate skill, including paraphrases and borderline cases.
2. Record intended skill, actually selected skill if observable, competing skills, and whether no skill should be selected.
3. Edit descriptions to emphasize distinctive tasks, objects, constraints, and trigger phrases rather than stacking generic keywords.
4. Repeat the same evaluation set and report precision-like activation, missed routes, and unresolved overlaps.

## Required output
A routing benchmark corpus, confusion table, proposed description edits, and before/after observations.

## Validation
- Evaluation cases cover positive, negative, and ambiguous triggers.
- A description edit is justified by a misroute, not just stylistic preference.
- The benchmark corpus is versioned so future skill additions can be checked.

## Guardrails
Do not claim statistical significance from a tiny hand-picked sample; label evaluation size and limitations.
