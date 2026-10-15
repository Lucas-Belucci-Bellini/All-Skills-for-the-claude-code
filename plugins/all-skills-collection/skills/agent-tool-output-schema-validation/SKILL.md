---
name: agent-tool-output-schema-validation
description: Validate agent tool outputs against explicit schemas and semantic invariants before downstream agents or automation consume them.
---

# Agent Tool Output Schema Validation

## Goal

Prevent malformed, incomplete, hallucinated, or unsafe agent outputs from cascading into code changes or external side effects.

## Inputs to inspect

Tool contract, JSON/schema definitions, downstream consumers, examples of valid/invalid outputs, and failure policy.

## Workflow

1. Define required fields, types, enum ranges, size limits, and cross-field invariants for each output artifact; separate machine data from explanatory prose.
2. Validate raw outputs before parsing or acting on them, handling truncation, extra text, duplicate keys, unknown fields, and malformed encodings intentionally.
3. Add semantic validation for repository paths, URLs, IDs, commands, version constraints, or numeric limits where syntax alone is insufficient.
4. Choose fail-closed behavior for consequential actions and a bounded retry/repair strategy for recoverable formatting failures.
5. Test valid, empty, oversized, contradictory, maliciously formed, and partially streamed outputs through the full downstream chain.

## Validation checklist

- [ ] Schema failure prevents a downstream mutation or external action.
- [ ] Semantic constraints complement syntactic JSON validation.
- [ ] Retries are bounded and do not repeatedly execute side effects.
- [ ] Unknown fields or versions follow an explicit compatibility policy.
- [ ] Validation failures preserve diagnostics without leaking sensitive input.

## Required output

Deliver an output schema, semantic validation rules, error/retry policy, adversarial fixture suite, and consumer integration notes.

## Boundaries and failure handling

Do not trust type validity as proof of factual correctness; do not silently coerce ambiguous values into destructive tool arguments.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
