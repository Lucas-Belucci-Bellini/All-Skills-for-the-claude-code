---
name: otel-collector-startup-config-validation
description: Verify that an OpenTelemetry Collector process loads its effective configuration and starts safely with real environment variables, config providers, endpoints, and runtime dependencies.
---

# OpenTelemetry Collector Startup Config Validation

## Purpose

Verify runtime initialization behavior after configuration parsing: environment expansion, secret/config-provider resolution, listener binding, component startup order, dependency failures, readiness, and restart behavior. This skill is distinct from static schema validation, which checks whether fields and component definitions are supported.

## Required inputs

The deployment manifest or service definition; pinned Collector distribution and version; sanitized environment-variable names and config-provider references; expected listeners and ports; secret-mount and file permissions; readiness/liveness rules; and startup logs from a disposable test environment.

## Workflow

1. Reconstruct the effective startup environment: arguments, config-file locations, environment variable names, mounted files, config providers, working directory, user/group, capabilities, and expected ports. Never request secret values when presence/shape is sufficient.
2. Start the exact Collector image or binary in an isolated environment using the candidate deployment settings. Capture the effective config source, startup logs, exit code, readiness transitions, and component-specific diagnostics.
3. Test missing and malformed environment variables, unavailable config providers, unreadable secret files, absent certificates, invalid bind addresses, and occupied ports. Verify failures are explicit and occur before the service reports ready.
4. Test successful startup with representative dependencies available. Confirm each required receiver/exporter/listener reaches its expected state and readiness does not become healthy prematurely.
5. Remove or delay one dependency at a time. Verify bounded retry/backoff, a useful error, and a predictable readiness or process-exit policy; distinguish optional components from mandatory ones.
6. Restart the process after a failed start and after a healthy start. Check for leaked listeners, stale state, duplicated pipelines, stuck shutdown, and inconsistent behavior between first boot and restart.
7. Compare startup behavior against the deployment contract. Document which failures should block rollout, which are recoverable, and the exact rollback or remediation action.

## Validation checklist

- [ ] Tests use the same image/version, arguments, mounts, and runtime identity as deployment.
- [ ] Missing environment/config-provider inputs fail safely and are not silently replaced by empty values.
- [ ] Listener conflicts, permissions, certificates, and dependency failures produce actionable diagnostics.
- [ ] Readiness reflects required components being ready rather than merely a live process.
- [ ] Restart and shutdown behavior is bounded and repeatable.
- [ ] Logs and reports redact secret values and sensitive endpoints.

## Required output

A startup test matrix with environment scenario, expected state, observed state, logs/exit code, readiness result, recovery behavior, and pass/fail/pending status, plus the deployment gate and rollback decision.

## Boundaries and failure handling

Do not treat a successful YAML parse as proof of startup readiness. Do not expose credentials to make a test easier. Do not change production listener or retry settings without approval. If a dependency cannot be safely simulated, mark that scenario pending and state the required test environment.

## Trigger examples

- **Positive:** A Collector container starts locally but may fail in Kubernetes because of missing env vars, mounts, permissions, occupied ports, or unavailable config providers.
- **Negative:** A request only needs a static check for an unknown field or unsupported component option.
