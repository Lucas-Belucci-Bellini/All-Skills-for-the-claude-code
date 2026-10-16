---
name: frontend-loading-empty-error-contracts
description: Define consistent loading, empty, partial, error, and retry states for data-driven UI routes and components.
---

# Frontend Loading Empty Error Contracts

## Goal

Prevent blank screens and ambiguous interfaces when requests pend, return no data, partially succeed, or fail.

## Inputs to inspect

Key user journeys, fetch hooks, response states, offline behavior, and shared UI components.

## Workflow

1. For each screen, model initial, loading, empty, populated, partial, recoverable error, and terminal error states.
2. Distinguish a genuinely empty result from a failed request or a request that has not run; decide whether prior valid data stays visible during refresh.
3. Define safe retry/recovery actions and preserve user input and navigation state across recoverable failures.
4. Handle partial failures in multi-panel screens without claiming full success when critical data is unavailable.
5. Test delayed responses, timeout, invalid payload, empty response, retry success, and stale results after navigation.

## Validation checklist

- [ ] Each data dependency has defined empty and failure states.
- [ ] Refresh avoids unnecessary full-screen flicker when prior content remains valid.
- [ ] Retry controls respect operation idempotency.
- [ ] Partial data is clearly identified when it affects decisions.
- [ ] Accessibility announcements and focus behavior work during async transitions.

## Required output

Produce a screen/state table, reusable UI contract, regression tests, and a list of ambiguous states corrected.

## Boundaries and failure handling

Do not display an empty state when the request failed; do not hide errors behind infinite spinners.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
