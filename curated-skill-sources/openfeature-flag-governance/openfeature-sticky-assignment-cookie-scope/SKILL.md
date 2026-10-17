---
name: openfeature-sticky-assignment-cookie-scope
description: "Validate openfeature sticky assignment cookie scope with explicit acceptance criteria, failure handling, and reviewable evidence."
---

# OpenFeature Sticky Assignment Cookie Scope

## Purpose

Make openfeature sticky assignment cookie scope a reviewable engineering contract. Define expected state, dangerous boundary conditions and a reproducible verification path instead of relying on tribal knowledge or a single successful happy-path run.

## Required inputs

Flag definitions and metadata, OpenFeature SDK/provider configuration, evaluation context schema, targeting rules, exposure/assignment telemetry, release owner and privacy requirements.

## Workflow

1. Trace the flag key, SDK client, provider, evaluation context and callers connected to openfeature sticky assignment cookie scope; record owner, lifecycle state and target environments.
2. Define expected evaluation semantics for openfeature sticky assignment cookie scope, including typed default value, context precedence, provider readiness, error reason and permitted user/tenant boundary.
3. Build deterministic tests for a normal evaluation, a missing/invalid flag or provider outage, and a boundary case involving stale context, cohort assignment or privacy-sensitive attributes.
4. Evaluate rollout and rollback behavior against synthetic cohorts; calculate expected exposure and guardrail denominators, including whether assignment must remain sticky across sessions.
5. Inspect evaluation/exposure events for ordering, duplicates, cardinality, sensitive attributes and audit integrity; verify outcomes are not attributed before exposure.
6. Run provider-version and client/server parity checks, then test kill-switch and offline/default behavior without changing live production targeting.
7. Produce the flag contract, rollout decision matrix, monitoring/rollback thresholds, owner and expiry/retirement action; distinguish measured results from assumed semantics.

## Validation checklist

- [ ] Flag owner, purpose, environment and expiry/retirement date are recorded.
- [ ] Typed default behavior is safe when flag/provider evaluation fails.
- [ ] Context merge order is deterministic and cannot cross user/tenant boundaries.
- [ ] Cohort, exposure, event ordering and guardrail assumptions are explicit.
- [ ] Sensitive context is minimized and telemetry avoids uncontrolled cardinality.
- [ ] Rollback/kill-switch behavior is verified in non-production or an approved environment.
- [ ] Provider-specific semantics and statistical assumptions are not presented as universal guarantees.

## Required output

Produce a feature-flag lifecycle report with evaluation contract, cohort/guardrail matrix, privacy review, rollout/rollback evidence and flag retirement owner/date. Include target revision/environment, acceptance criteria, command or artifact references, pass/fail/blocked results, unresolved assumptions and the owner for the next action.

## Boundaries and failure handling

Use synthetic identities and staging flag stores for experiments. Do not change live targeting, collect unnecessary personal data, or present an underpowered or repeatedly peeked experiment as causal proof. If provider state or exposure telemetry is stale, label evaluation uncertain and do not advance a rollout on incomplete evidence.

## Trigger examples

- **Positive:** A feature rollout, SDK/provider change, or experiment requires a clear contract for openfeature sticky assignment cookie scope.
- **Negative:** A request asks to bypass flag ownership, silently keep expired flags, or widen a production cohort without monitored rollback.
