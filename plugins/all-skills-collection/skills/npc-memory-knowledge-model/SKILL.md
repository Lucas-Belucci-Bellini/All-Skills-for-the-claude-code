---
name: npc-memory-knowledge-model
description: "Separates NPC perception, episodic memory, shared knowledge, and belief confidence. Use when NPCs need persistent relationships, rumors, learned facts, or consistent dialogue."
---

# Npc Memory Knowledge Model

## Use when
Agents remember everything equally, forget critical events, or claim knowledge they never observed or received.

## Workflow
1. Define knowledge types, provenance, timestamp, confidence, decay policy, and whether a fact is private, witnessed, taught, or inferred.
2. Separate raw events from compressed memories and general beliefs; track the source chain for rumors and inferred claims.
3. Set memory budgets and retrieval rules aligned with the next decision, not a global dump of all history.
4. Test contradictions, stale information, shared gossip, save/reload, and event deletion or correction.

## Required output
A memory schema, retrieval contract, provenance rules, decay policy, and evaluation scenarios.

## Validation
- The system can explain why a given NPC believes a fact.
- Facts from one agent do not leak to another without a valid sharing event.
- Compression preserves identity, relationships, and required causal context.

## Guardrails
Do not present simulated beliefs as objective world facts; keep uncertainty and provenance separate.
