---
name: engine-runtime-config-drift-audit
description: Compare intended runtime configuration with effective values across local, CI, dedicated-server, and packaged builds.
---

# Engine Runtime Config Drift Audit

## Goal

Find configuration drift that changes performance, simulation, security or compatibility between environments.

## Inputs to inspect

Config defaults, layered config files, environment overrides, CLI flags, runtime dumps and packaging/deployment manifests.

## Workflow

1. Trace configuration precedence from built-in defaults through files, environment variables, CLI arguments and runtime overrides.
2. Generate a normalized effective-config snapshot for each supported environment and compare it to declared profiles, excluding intentional secrets and volatile values.
3. Classify differences by risk: correctness, performance, compatibility, security and observability; identify shadowed or unrecognized settings.
4. Test missing/invalid values, unknown keys, deprecated options and environment-specific overrides to confirm diagnostics and fallback behavior.
5. Add a diff report to release qualification and validate that packaged/server builds emit a safe, redacted effective-config summary.

## Validation checklist

- [ ] Precedence order is documented and covered by tests.
- [ ] Unknown or invalid settings produce explicit warnings/errors instead of silently selecting dangerous defaults.
- [ ] Secret values are redacted from snapshots and reports.
- [ ] Intentional environment differences have owners and rationale.

## Required output

A config precedence map, normalized environment diff, risk-ranked findings and automated drift check.

## Boundaries and failure handling

Do not copy production secrets into config snapshots or force environments identical when their platform constraints differ.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
