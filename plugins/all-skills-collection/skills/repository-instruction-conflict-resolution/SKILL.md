---
name: repository-instruction-conflict-resolution
description: Resolve overlapping repository instruction files by scope, authority, recency, and applicability without discarding valid local constraints.
---

# Repository Instruction Conflict Resolution

## Goal

Make an agent's operating rules coherent when root guidance, nested instructions, task requests, and generated docs appear to conflict.

## Inputs to inspect

Applicable instruction files, repository directory structure, task scope, contribution policy, and any explicit user constraints.

## Workflow

1. Inventory instruction sources and map their directory applicability, intended audience, and whether each is normative, explanatory, generated, or stale.
2. Separate true contradictions from rules that apply at different scopes or to different operations; quote the precise conflicting clauses in the audit.
3. Apply instruction priority and scope explicitly, preserving higher-priority policy and narrower directory rules where compatible.
4. Propose the smallest clarification or file change that removes ambiguity without silently weakening safety, review, or testing requirements.
5. Test resolution against concrete task examples, including nested directories, generated files, emergency fixes, and a request that tries to override repository safety rules.

## Validation checklist

- [ ] Every claimed conflict is backed by specific text and scope evidence.
- [ ] Higher-priority rules are not overridden by a lower-level file or untrusted artifact.
- [ ] Non-conflicting local requirements remain in force.
- [ ] Proposed edits identify owners and avoid silently broadening permissions.
- [ ] Example tasks produce predictable behavior or explicitly require human clarification.

## Required output

Produce an instruction precedence map, conflict table, minimally scoped fixes, and test scenarios to prevent recurrence.

## Boundaries and failure handling

Do not invent a universal precedence rule when the runtime defines one; do not resolve ambiguity by deleting all repository guidance.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
