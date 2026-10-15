---
name: typescript-api-error-contract-design
description: Design stable TypeScript API error responses with explicit codes, validation details, retryability, and safe public messages.
---

# Typescript Api Error Contract Design

## Goal

Give frontend and integrations predictable machine-readable error contracts without leaking implementation details.

## Inputs to inspect

API routes, request schemas, service error types, client handling, logging policy, and any existing OpenAPI/schema definitions.

## Workflow

1. List expected failures by layer: malformed input, authentication, authorization, conflict, missing resource, rate limit, dependency outage, timeout, and unexpected server fault.
2. Define a versioned response schema with stable error codes, safe messages, correlation/request IDs, field-level validation details, and retry hints only where evidence supports them.
3. Map internal exceptions and domain errors to public statuses in one boundary layer. Preserve diagnostic causes in server logs without serializing stack traces or secrets to clients.
4. Update OpenAPI or equivalent API documentation and generate typed client models where the project supports it. Keep success and error envelopes consistent.
5. Test each status path, malformed bodies, unknown codes in clients, request IDs, redaction, and compatibility with already-deployed frontend versions.

## Validation checklist

- [ ] Clients branch on stable codes instead of parsing prose messages.
- [ ] Internal exception details, SQL fragments, tokens, and stack traces never appear in public error payloads.
- [ ] Retryability distinguishes safe-to-retry operations from non-idempotent operations.
- [ ] Field validation errors map to known input paths and handle nested arrays consistently.
- [ ] Contract tests guard both schema shape and API behavior.

## Required output

Produce an error-code table, response schema, internal-to-public mapping, client handling example, documentation changes, and contract tests.

## Boundaries and failure handling

Do not expose raw exception messages to clients; do not use one generic status for every failure when callers need different recovery behavior.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
