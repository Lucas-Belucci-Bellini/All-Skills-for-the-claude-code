---
name: agent-delegation-depth-cycle-guard
description: "Bounds nested agent delegation and detects cyclic task dependencies before they consume unbounded compute. Use when workers can delegate recursively."
---

# Agent Delegation Depth and Cycle Guard

## Purpose

Make delegation graphs explicit, bounded, and diagnosable before running nested work.

## Required inputs

Task identity rules, delegation trace, max depth, child limits, dependency edges, and run budget.

## Workflow

1. Assign logical task identities based on declared scope and inputs, distinct from prompt wording.
2. Build the directed dependency graph and detect back-edges before scheduling dependent work.
3. Set maximum delegation depth and child count by policy tier, including a clear root-depth convention.
4. Propagate parent ID, depth, ancestor IDs, and delegation reason to every child.
5. Reject ancestor cycles or exceeded limits with a structured reason rather than retrying the same recursion.
6. Test self-delegation, long chains, diamond graphs, duplicate children, and acyclic graphs.

## Validation checklist

- [ ] Cycle checks use normalized task identities.
- [ ] Depth and fan-out limits run before dispatch.
- [ ] Each child records parent and ancestor lineage.
- [ ] A rejected cycle identifies the loop-closing path.

## Required output

A validated delegation graph, bounds configuration, rejected-cycle report, and regression fixtures.

## Boundaries and failure handling

If semantic task identities are unreliable, use conservative depth/fan-out caps and mark cycle detection incomplete.

## Trigger examples

- **Positive:** Agents can create nested child tasks and need recursion controls.
- **Negative:** A user is checking package dependency cycles rather than active task delegation.
