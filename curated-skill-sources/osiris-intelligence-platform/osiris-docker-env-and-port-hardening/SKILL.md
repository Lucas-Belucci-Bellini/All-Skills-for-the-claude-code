---
name: osiris-docker-env-and-port-hardening
description: "Apply an evidence-led validation workflow to verify the Docker deployment exposes only intended ports, validates required environment variables, and starts with safe defaults."
---

# Osiris Docker Env And Port Hardening

## Purpose

Verify the Docker deployment exposes only intended ports, validates required environment variables, and starts with safe defaults. This skill turns that concern into an auditable contract so OSIRIS can distinguish source facts, derived interpretation, stale data, and failures.

## Required inputs

Inspect Dockerfile, docker-compose.yml, deploy scripts, and environment configuration. Also collect the relevant request/response schema, current tests, data-source terms, and the target route or UI behavior. Use fake credentials and sanitized fixtures for all test inputs.

## Workflow

1. Trace Dockerfile, docker-compose.yml, deploy scripts, and environment configuration from entry point to consumers; record the authoritative data owner, current behavior, source timestamps, and exact repository paths before proposing a change.
2. Translate the requirement into explicit invariants: Missing secrets, incorrect port mapping, non-loopback binding where unintended, and startup health failure. Separate expected behavior from assumptions that require a maintainer or provider confirmation.
3. Build deterministic fixtures for ordinary, boundary, malformed, stale, denied, and failure cases as applicable. Keep all scanner/network cases mocked or restricted to explicitly authorized test assets; do not require a live provider for unit tests.
4. Run the narrow relevant tests, then the appropriate regression suite. Deliver A deployment preflight checklist and container configuration tests. Record commands and observed output, mark untested behavior as unverified, and avoid including real keys or unnecessary personal data in the report.

## Validation checklist

- [ ] The route, feed, or UI invariant is mapped to a testable assertion.
- [ ] Normal, boundary, malformed, and upstream-failure paths are represented by stable fixtures.
- [ ] Source identity, observation time, fallback status, and uncertainty are retained wherever they affect interpretation.
- [ ] Secrets and unnecessary personal/location fields are absent from logs, exports, and committed fixtures.
- [ ] Tests use authorized targets and do not depend on uncontrolled upstream services.
- [ ] Conclusions are supported by repository paths and observed test output; assumptions remain labelled.

## Required output

Produce A deployment preflight checklist and container configuration tests. Include the paths inspected, fixtures added or changed, test commands and their actual results, unresolved source/term questions, and any regression risks.

## Boundaries and failure handling

OSIRIS features must remain limited to lawful, defensive, and authorized monitoring. Use only public/approved sources, obey source terms and rate limits, preserve attribution, and do not infer private identity from public telemetry. Stop if scope authorization is missing, a provider's terms are unclear, or an operation would expose personal data unnecessarily. Do not claim an alert, match, scan result, or forecast is verified beyond its evidence.

## Trigger examples

- **Positive:** A maintainer needs to verify the Docker deployment exposes only intended ports, validates required environment variables, and starts with safe defaults..
- **Negative:** Publishing secrets in an image layer or exposing an administrative endpoint unintentionally.
