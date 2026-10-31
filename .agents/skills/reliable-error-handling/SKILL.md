---
name: reliable-error-handling
description: "Designs consistent error categories, propagation, recovery, and user-safe messages. Use when creating APIs, libraries, background jobs, or workflows where failures must remain diagnosable and predictable."
---

# Reliable Error Handling

## Goal
Represent failures clearly, preserve useful diagnostic context, and recover only when recovery is safe.

## Workflow
1. Enumerate expected failure modes: invalid input, missing resources, permission denial, conflicts, timeouts, dependency outages, and internal defects.
2. Define stable error categories and map them to appropriate boundaries such as HTTP status codes, domain results, or job outcomes.
3. Preserve the original cause and structured context internally while returning safe, non-sensitive messages to external callers.
4. Fail fast for violated invariants; validate untrusted input at boundaries and avoid continuing with corrupted state.
5. Retry only transient failures and use bounded attempts, exponential backoff with jitter, deadlines, and idempotency protection.
6. Define cancellation and timeout semantics for each operation; ensure cleanup and transaction handling are correct.
7. Keep errors visible in logs, metrics, and traces without duplicating noisy reports at every layer.
8. Ensure partial failures in batch or distributed operations have explicit all-or-nothing or partial-success semantics.
9. Test error mapping, retries, timeouts, malformed dependencies, and recovery paths.
10. Document which errors callers may handle and which indicate programming or infrastructure faults.

## Deliverable
- Error taxonomy and boundary mappings.
- Retry/recovery policy.
- Tests for expected and exceptional failure paths.

## Acceptance criteria
- Callers can distinguish actionable failure categories.
- Internal diagnostics preserve cause without leaking secrets.
- Retries are bounded and safe for the operation.
- Partial success and cancellation behavior are explicit.

## Guardrails
- Do not swallow exceptions or return success-shaped defaults after failure.
- Do not expose stack traces, credentials, or private internals to untrusted callers.
- Do not retry permanent failures indefinitely.

