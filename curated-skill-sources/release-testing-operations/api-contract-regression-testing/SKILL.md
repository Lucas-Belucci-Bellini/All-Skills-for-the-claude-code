---
name: api-contract-regression-testing
description: "Tests API compatibility across request, response, error, and version contracts. Use when refactoring REST, RPC, CLI, plugin, or MCP interfaces."
---

# Api Contract Regression Testing

## Use when
Internal changes pass unit tests but silently break consumers because response shape, errors, ordering, or optional fields changed.

## Workflow
1. Extract the contract from schemas, published docs, golden fixtures, and representative consumers; label which parts are stable.
2. Build tests for success responses, validation errors, missing permissions, pagination, null/omitted fields, and unknown future fields.
3. Compare current outputs with approved baseline contracts and classify changes as additive, behavioral, or breaking.
4. Test at least one consumer against the new interface, including older supported client versions where compatibility is promised.

## Required output
A contract test matrix, baseline fixtures, breaking-change report, and consumer compatibility result.

## Validation
- Errors and edge cases are included, not only successful calls.
- Fixtures are reviewed and versioned rather than auto-updated blindly.
- Breaking changes require an explicit migration decision.

## Guardrails
Do not treat every byte difference as a break or automatically accept every changed snapshot; evaluate semantic compatibility.
