---
name: otel-collector-config-schema-validation
description: Validate OpenTelemetry Collector configuration against the exact distribution's component schema, supported fields, types, and version-specific deprecations before rollout.
---

# OpenTelemetry Collector Config Schema Validation

## Purpose

Catch structurally invalid or unsupported Collector configuration before it reaches deployment. Focus on YAML/TOML decoding, component schemas, required fields, type constraints, component references, and version drift—not whether the Collector can successfully start in a particular environment.

## Required inputs

The exact Collector distribution and version; the full configuration with secrets redacted; enabled receivers, processors, connectors, exporters, and extensions; config-provider and environment-substitution rules; and the command or CI environment used to validate the file.

## Workflow

1. Pin the target binary or container image by version and digest. Record whether it is core, contrib, or a vendor distribution because component availability and schemas can differ.
2. Inventory every configured component and cross-reference it with the pinned distribution. Flag unknown component types, renamed components, unsupported fields, and deprecated options.
3. Run the distribution's supported configuration-validation command or startup validation mode against the exact candidate file. Record the command, exit code, and complete sanitized diagnostics; do not substitute a different Collector version.
4. Build negative fixtures for an unknown key, wrong field type, missing required field, invalid component reference, and unsupported component. Confirm each fixture is rejected for the expected reason.
5. Build positive fixtures for the smallest valid configuration of each component family in use. Check nested maps, lists, duration syntax, feature gates, and config-provider expansion where supported.
6. Compare the result with the prior known-good config and identify schema changes caused by version upgrades. Keep schema validation separate from network connectivity, credentials, permissions, and downstream availability checks.
7. Produce a field-level findings table with component, location, expected type/constraint, observed value, validation evidence, severity, and recommended correction.

## Validation checklist

- [ ] The binary/image and component set are pinned to the target release.
- [ ] Unknown fields, invalid types, missing required fields, and broken references fail with actionable diagnostics.
- [ ] Valid configuration fixtures pass using the same distribution as deployment.
- [ ] Deprecations, feature gates, and config-provider behavior are checked explicitly.
- [ ] No secret values are copied into logs, fixtures, or the report.
- [ ] Schema errors are not confused with runtime startup or downstream connectivity errors.

## Required output

A version-pinned schema-validation report containing the tested config revision, exact command, exit status, accepted/rejected fixtures, field-level findings, and pass/fail/pending status for any check that could not be executed.

## Boundaries and failure handling

Do not infer schema validity from a successful deployment of an older config. Do not silently remove unsupported fields or downgrade component versions to make validation pass. If the target binary is unavailable, mark the result pending and provide the exact reproducible command rather than claiming success.

## Trigger examples

- **Positive:** A Collector upgrade or config change needs proof that every configured component and field is supported by the target release.
- **Negative:** A request asks whether a live endpoint is reachable or whether telemetry is being exported successfully without validating configuration structure.
