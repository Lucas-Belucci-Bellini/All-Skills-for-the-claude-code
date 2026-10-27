---
name: agent-result-quorum-decision-policy
description: "Defines when multiple agent results form sufficient evidence for a decision and how to handle disagreement. Use when orchestration relies on redundancy or multi-agent consensus."
---

# Agent Result Quorum Decision Policy

## Purpose

Stop a majority vote from masquerading as evidence when outputs are correlated, stale, or about different questions.

## Required inputs

Decision proposition, result schema, agent provenance, independence assumptions, impact tier, and evidence requirements.

## Workflow

1. Specify one proposition and normalize each worker's answer to the same scope and evidence contract.
2. Set quorum thresholds separately for reversible low-impact and high-impact decisions.
3. Record shared models, context, sources, and reused summaries that may correlate votes.
4. Exclude malformed, stale, unsupported, and abstaining responses from affirmative quorum.
5. Route disagreement, missing evidence, and insufficient independent votes to escalation or an inconclusive state.
6. Test unanimous-but-unsupported answers, split votes, stale responses, and correlated workers.

## Validation checklist

- [ ] Quorum counts valid responses to the same proposition.
- [ ] Correlated sources and contexts are recorded.
- [ ] High-impact actions demand stronger evidence.
- [ ] Insufficient valid responses cannot be called quorum.

## Required output

A quorum matrix, normalized result contract, independence caveats, escalation rule, and test fixtures.

## Boundaries and failure handling

Agents are not automatically independent; quorum alone must not authorize safety-critical or destructive actions.

## Trigger examples

- **Positive:** Several agents evaluate claims against primary sources.
- **Negative:** A creative draft does not require consensus.
