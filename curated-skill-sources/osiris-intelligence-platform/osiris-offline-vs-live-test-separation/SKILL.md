---
name: osiris-offline-vs-live-test-separation
description: "Apply an evidence-led validation workflow to keep deterministic unit tests independent of volatile public APIs while marking opt-in live integration checks explicitly."
---

# Osiris Offline Vs Live Test Separation

## Purpose

Keep deterministic unit tests independent of volatile public APIs while marking opt-in live integration checks explicitly. This skill turns that concern into an auditable contract so OSIRIS can distinguish source facts, derived interpretation, stale data, and failures.

## Required inputs

Inspect Vitest configuration, route tests, and RUN_LIVE_TESTS gate. Also collect the relevant request/response schema, current tests, data-source terms, and the target route or UI behavior. Use fake credentials and sanitized fixtures for all test inputs.

## Workflow

1. Trace Vitest configuration, route tests, and RUN_LIVE_TESTS gate from entry point to consumers; record the authoritative data owner, current behavior, source timestamps, and exact repository paths before proposing a change.
2. Translate the requirement into explicit invariants: Offline run with network disabled, live suite opt-in, provider outage fixtures, and environment key absence. Separate expected behavior from assumptions that require a maintainer or provider confirmation.
3. Build deterministic fixtures for ordinary, boundary, malformed, stale, denied, and failure cases as applicable. Keep all scanner/network cases mocked or restricted to explicitly authorized test assets; do not require a live provider for unit tests.
4. Run the narrow relevant tests, then the appropriate regression suite. Deliver A test classification matrix and reproducible CI command list. Record commands and observed output, mark untested behavior as unverified, and avoid including real keys or unnecessary personal data in the report.

## Validation checklist

- [ ] The route, feed, or UI invariant is mapped to a testable assertion.
- [ ] Normal, boundary, malformed, and upstream-failure paths are represented by stable fixtures.
- [ ] Source identity, observation time, fallback status, and uncertainty are retained wherever they affect interpretation.
- [ ] Secrets and unnecessary personal/location fields are absent from logs, exports, and committed fixtures.
- [ ] Tests use authorized targets and do not depend on uncontrolled upstream services.
- [ ] Conclusions are supported by repository paths and observed test output; assumptions remain labelled.

## Required output

Produce A test classification matrix and reproducible CI command list. Include the paths inspected, fixtures added or changed, test commands and their actual results, unresolved source/term questions, and any regression risks.

## Boundaries and failure handling

OSIRIS features must remain limited to lawful, defensive, and authorized monitoring. Use only public/approved sources, obey source terms and rate limits, preserve attribution, and do not infer private identity from public telemetry. Stop if scope authorization is missing, a provider's terms are unclear, or an operation would expose personal data unnecessarily. Do not claim an alert, match, scan result, or forecast is verified beyond its evidence.

## Trigger examples

- **Positive:** A maintainer needs to keep deterministic unit tests independent of volatile public APIs while marking opt-in live integration checks explicitly..
- **Negative:** Claiming offline tests prove current upstream availability or running unbounded live checks in CI.
