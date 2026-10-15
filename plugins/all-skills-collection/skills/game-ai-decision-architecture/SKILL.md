---
name: game-ai-decision-architecture
description: "Chooses and structures decision systems for game agents. Use when comparing finite-state machines, behavior trees, utility scoring, planners, and LLM-assisted dialogue."
---

# Game Ai Decision Architecture

## Use when
NPC behavior mixes reactive rules, planning, and text generation into one opaque decision function.

## Workflow
1. Classify decisions by latency, repeatability, explainability, consequence, and required context.
2. Use deterministic rules for critical mechanics, explicit utility or planning for goal selection, and bounded language generation for suitable dialogue.
3. Define perception inputs, memory retrieval, candidate actions, feasibility checks, arbitration, and the action contract.
4. Log decision inputs, rejected candidates, scores, selected action, and failure recovery in a replayable trace.

## Required output
A decision-layer diagram, algorithm choice matrix, action contract, observability plan, and test scenarios.

## Validation
- A selected action is feasible and has explicit fallback behavior.
- Critical gameplay outcomes do not depend on an unbounded generative response.
- Different decision layers can be tested without running the whole NPC stack.

## Guardrails
Do not use a language model as the authoritative source of physics, inventory, permissions, or simulation state.
