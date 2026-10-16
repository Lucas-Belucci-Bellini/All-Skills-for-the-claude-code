---
name: cli-config-precedence-resolution
description: "Trace effective CLI configuration across flags, environment variables, files, profiles and defaults with conflict and redaction rules."
---

# Cli Config Precedence Resolution

## Purpose

Explain why a command used one value and prevent hidden machine state from changing behavior.

## Required inputs

Config schema, flag parser, environment variables, profile loading and secret fields.

## Workflow

1. Inventory all configuration sources and define precedence for each key.
2. Trace merge, coercion and validation behavior for missing, empty, false and null values.
3. Add safe diagnostics showing effective values and origins while redacting secrets.
4. Test conflicting sources, unknown keys, malformed values, profile changes and a clean environment.
5. Align documentation with observed precedence instead of inferred filenames or conventions.

## Validation checklist

- [ ] Precedence is explicit and deterministic.
- [ ] Missing, empty, false and null have defined semantics where relevant.
- [ ] Secret values are redacted.
- [ ] Malformed/unknown settings follow a documented policy.
- [ ] Tests identify effective value and source.

## Required output

A source-precedence matrix, value-origin diagnostic contract and conflict fixtures.

## Boundaries and failure handling

Do not print secret values. Verify framework behavior before documenting precedence; do not silently change established resolution order.

## Trigger examples

- **Positive:** An environment variable overrides the config file the developer just edited.
- **Negative:** Auditing world-specific game settings without CLI configuration sources.
