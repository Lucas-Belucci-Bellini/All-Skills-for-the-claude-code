---
name: api-response-size-budget-contract
description: "Set and validate response payload budgets for list, detail and aggregation endpoints so large records cannot exhaust clients, gateways or service memory."
---

# API Response Size Budget Contract

## Purpose

Keep response size predictable and bounded while preserving documented completeness and compatibility.

## Required inputs

Endpoint schemas, representative records, maximum list sizes, expansion parameters, serialization/compression behavior, gateway limits and client constraints.

## Workflow

1. Identify endpoints with unbounded lists, nested expansions, user-controlled fields or large text values.
2. Measure serialized bytes for typical, large and adversarial-but-valid fixtures; distinguish compressed wire size from in-memory processing cost.
3. Define page, item, field or total-response limits with explicit error behavior and migration requirements.
4. Verify limits when clients request expansions, filters, localization, optional metadata or error details.
5. Test application and gateway behavior near the threshold, including streaming responses and slow consumers.

## Validation checklist

- [ ] Budgets are stated in unambiguous units.
- [ ] Unbounded collections have paging or explicit size policies.
- [ ] Limits are enforced before excessive buffering where possible.
- [ ] Boundary errors are stable and documented.
- [ ] Budget changes have measured compatibility impact.

## Required output

An endpoint budget table, measured fixture sizes, enforcement points, boundary tests and migration notes.

## Boundaries and failure handling

Do not silently truncate while reporting full success. Compression alone does not protect against huge in-memory object graphs. Document the changed client consumption model if streaming is introduced.

## Trigger examples

- **Positive:** Nested API responses cause intermittent memory spikes for mobile clients.
- **Negative:** Reviewing field-level authorization where response size is irrelevant.
