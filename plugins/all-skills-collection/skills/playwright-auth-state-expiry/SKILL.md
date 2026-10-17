---
name: playwright-auth-state-expiry
description: "Validate playwright auth state expiry with task-specific acceptance criteria, boundary cases, and reproducible evidence."
---

# Playwright Auth State Expiry

## Purpose

Establish a verifiable engineering contract for playwright auth state expiry. Identify a concrete failure mode, reproduce it safely, and produce evidence that distinguishes expected behavior from hidden state, lost signals, or unsafe recovery.

## Required inputs

Playwright configuration and lockfile, affected test/page, fixture code, expected browser matrix, sanitized trace, and CI artifacts.

## Workflow

1. Locate the Playwright config, test project, fixture, page/component, and CI invocation for playwright auth state expiry. Record browser versions, fixture scope, and external service dependencies.
2. Define the acceptance contract for playwright auth state expiry: starting state, action/event, expected UI/API outcome, and at least one condition that must fail the test.
3. Build an isolated scenario with explicit setup/teardown, unique test data, and controlled time or network when those affect the case.
4. Use stable role, label, or test-id locators and await meaningful state changes; avoid arbitrary sleeps and assertions that depend on unrelated page state.
5. Run the scenario alone and with the relevant parallel, sharded, viewport, authentication, or browser-project configuration.
6. Inspect trace steps, console/page errors, requests, screenshots with sensitive areas masked, and retry history; classify the failure before changing the test.
7. Add the smallest regression test and capture the command, browser matrix, expected/observed state, and a quarantine expiry if stabilization is blocked.

## Validation checklist

- [ ] Browser version, fixture scope, data owner, and expected project are recorded.
- [ ] The scenario can run without relying on another test's ordering or storage state.
- [ ] Assertions wait for observable state and do not rely on fixed delays.
- [ ] The failure case retains a sanitized trace or equivalent minimal diagnostic.
- [ ] Relevant browser, viewport, locale, or authentication boundary is exercised.
- [ ] Retries preserve the original failure and cannot silently convert flakiness into a pass.
- [ ] The result distinguishes pass, fail, flaky, skipped, and blocked.

## Required output

Produce a browser-test contract with fixture ownership, minimal reproduction, deterministic assertions, sanitized artifact references, and a fix or quarantine recommendation. Include the target revision/configuration, acceptance criteria, pass/fail/blocked checks, exact command or artifact references, observed limitations, and the smallest justified next action.

## Boundaries and failure handling

Use synthetic accounts or authorized staging environments; mask sensitive screenshot regions and never commit real session state. Keep network mocking scoped so it cannot hide all real contract failures. If the browser, app readiness, or an external service is unavailable, report blocked with diagnostics; a retry-pass alone is not evidence that the test is stable.

## Trigger examples

- **Positive:** A browser journey needs a reproducible regression check for playwright auth state expiry.
- **Negative:** A request asks to silence all browser errors, bypass assertions, or save real session credentials in artifacts.
