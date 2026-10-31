---
name: agent-cross-agent-claim-adjudication
description: "Resolves conflicting factual claims from agents using source quality, scope, and reproducible evidence. Use when parallel workers disagree about a requirement, test result, or external fact."
---

# Agent Cross-Agent Claim Adjudication

## Purpose

Resolve disagreement through evidence, not majority vote, verbosity, or response order.

## Required inputs

Normalized claims, task/artifact references, source or test receipts, time scope, and adjudication policy.

## Workflow

1. Normalize each statement into a proposition with explicit scope, time, version, and supporting evidence.
2. Check whether agents answered the same proposition or used different assumptions.
3. Rank evidence by directness and authority, preferring reproducible tests and primary records.
4. Identify shared sources or copied intermediate summaries that make claims correlated.
5. Resolve, preserve dissent, or mark unresolved when available evidence does not discriminate.
6. Propagate the adjudication and invalidate downstream outputs that relied on superseded claims.

## Validation checklist

- [ ] Each claim links to an agent, task, artifact, and evidence.
- [ ] Different scope or time is not mistaken for contradiction.
- [ ] Evidence quality outweighs vote count and response length.
- [ ] Unresolved claims remain explicit.

## Required output

A claim ledger, evidence ranking, resolution status, dissent record, and downstream invalidation list.

## Boundaries and failure handling

If no authoritative or reproducible evidence exists, do not fabricate a decisive answer.

## Trigger examples

- **Positive:** Two agents report different outcomes for the same CI run.
- **Negative:** A team is choosing subjective creative styles rather than factual claims.
