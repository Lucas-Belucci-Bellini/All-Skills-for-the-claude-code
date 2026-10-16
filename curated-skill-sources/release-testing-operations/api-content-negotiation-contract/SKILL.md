---
name: api-content-negotiation-contract
description: "Use when APIs support multiple media types or representations and must honor Accept-family headers; not for single-representation response schema review."
---

# Api Content Negotiation Contract

## Purpose

Keep server representation selection deterministic when clients express content preferences.

## Required inputs

Supported media types/versions, Accept headers, defaults, error responses, Vary rules, and endpoint fixtures.

## Workflow

1. List supported representations and define behavior for missing, wildcard, weighted, malformed, and unsupported preferences.
2. Create fixtures for competing media ranges, q-values, languages, and encodings supported by the endpoint.
3. Verify selected representation, Vary metadata, and documented error behavior when no type is acceptable.
4. Check generated clients and intermediary caches do not reuse a response across incompatible variants.

## Verification checklist

- [ ] Unsupported types produce documented behavior, not an accidental default.
- [ ] Preference weights and wildcards have tests.
- [ ] Vary metadata covers request fields affecting representation.
- [ ] Error responses remain usable when success representation is unsupported.

## Required output

A negotiation matrix, fixture results, cache variation review, and compatibility recommendations.

## Boundaries and failure handling

Do not advertise representations an endpoint does not implement; review consumer impact before changing defaults.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** One client requests vendor JSON while another requests ordinary JSON.
- **Negative:** Testing If-Match preconditions on one fixed representation.
