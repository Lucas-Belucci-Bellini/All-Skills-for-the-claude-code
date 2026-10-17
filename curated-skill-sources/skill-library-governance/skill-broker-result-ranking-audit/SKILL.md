---
name: skill-broker-result-ranking-audit
description: "Audits how a broker ranks candidate skills. Use when relevant skills are omitted or a broad skill outranks a narrow validated one."
---

# Skill Broker Result Ranking Audit

## Purpose

query fixtures, candidate metadata, ranking configuration, and human reference rankings

## Required inputs

Define ranking dimensions such as intent match, target compatibility, validation state, specificity, risk, and context cost.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Compare ranked outputs against labeled test cases and explain rank inversions with their input features.
3. A ranking audit with precision-at-k examples, false positives, false negatives, and tuning proposals.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not optimize solely for click/use frequency or favor a skill that is unvalidated for the target agent. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not optimize solely for click/use frequency or favor a skill that is unvalidated for the target agent.

## Boundaries and failure handling

Search results repeatedly select generic guidance over a validated specialist workflow. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** No candidate ranking or retrieval result exists.
- **Negative:** undefined
