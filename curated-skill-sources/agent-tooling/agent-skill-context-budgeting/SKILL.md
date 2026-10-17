---
name: agent-skill-context-budgeting
description: "Controls how many skills and supporting references an agent receives for a task. Use when a library is large enough that retrieval can waste context or confuse instructions."
---

# Agent Skill Context Budgeting

## Purpose

Deliver enough skill context to perform a task without loading entire domains or all available skills into every agent session.

## Required inputs

Task statement, candidate skills with relevance and size metadata, model context limits, required dependencies, and a configured budget.

## Workflow

1. Estimate the context budget available after reserving space for the user request, project rules, tool results, and response.
2. Rank skills by task relevance, validation state, compatibility and unique contribution; account for content size and dependency requirements.
3. Select the smallest coherent set that covers required tasks and dependencies; prefer references loaded on demand over wholesale appendices.
4. Detect contradictory instructions or redundant coverage; resolve using project policy and skill priority metadata rather than arbitrary ordering.
5. Record selected and omitted candidates with brief reasons, then test whether a smaller set preserves task outcomes.

## Validation checklist

- [ ] The budget is explicit and configurable.
- [ ] Unvalidated or incompatible skills are not selected as authoritative guidance.
- [ ] Required dependencies remain included when a parent skill is selected.
- [ ] Omitted skills are not treated as inspected or executed.
- [ ] Evaluation tests compare task quality as well as token/context usage.

## Required output

A per-task skill selection report with budget, selected versions, dependency closure, excluded candidates, and reasons.

## Boundaries and failure handling

Do not truncate safety boundaries or required steps to fit a budget. If the minimal safe set exceeds the budget, request a staged workflow instead of removing guardrails.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** An agent with access to more than a thousand skills must work on one narrowly defined task.
- **Negative:** A user is asking for a one-sentence answer and no skill retrieval would materially improve it.
