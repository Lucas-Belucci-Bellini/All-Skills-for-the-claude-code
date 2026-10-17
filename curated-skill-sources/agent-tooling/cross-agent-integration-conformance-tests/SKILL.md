---
name: cross-agent-integration-conformance-tests
description: "Tests whether separate provider adapters honor the same canonical skill registry contract. Use when adding or upgrading a Claude Code, Codex, ChatGPT, or other agent connector."
---

# Cross-Agent Integration Conformance Tests

## Purpose

Detect behavioral drift between adapters without assuming every platform implements the same capabilities.

## Required inputs

Canonical broker contract, adapter implementations, supported provider versions, test credentials with minimum scope, and shared fixture skills.

## Workflow

1. Create a platform-neutral test suite for search, exact-version fetch, metadata preservation, not-found, incompatible-version, access denial, rate limit, and network failure.
2. Map each test to the adapter's real supported operation; mark genuinely unsupported capabilities as explicit skips with evidence rather than silently passing them.
3. Run read-only tests first with fixture data and credentials that cannot modify production content.
4. Verify content digest, stable skill ID, compatibility status, provenance and error status across the adapter boundary.
5. Compare provider results and record divergent semantics that affect task success, context use, security, or update behavior.

## Validation checklist

- [ ] Every supported adapter runs the same applicable contract cases.
- [ ] Unsupported capabilities are visible and do not count as passes.
- [ ] Fixture content contains no production secrets or private user data.
- [ ] Digests and stable IDs survive transport unchanged.
- [ ] Regression results are retained per adapter version.

## Required output

A conformance matrix, runnable fixture suite, per-adapter report, and prioritized discrepancies.

## Boundaries and failure handling

Do not claim cross-platform compatibility from unit tests of a shared helper alone. Never use real credentials or perform publication/deploy actions during conformance tests.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A new Codex or ChatGPT adapter is added to the common skill broker.
- **Negative:** Only one local skill file changes and it has no integration or provider-facing behavior.
