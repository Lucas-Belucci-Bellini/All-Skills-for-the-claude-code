---
name: runtime-diagnostic-bundle-reproducibility
description: Create minimal, reproducible diagnostic bundles for runtime failures by pinning build identity, config, environment, logs, and event windows.
---

# Runtime Diagnostic Bundle Reproducibility

## Goal

Let a failure be understood and reproduced without relying on vague reports, incomplete logs, or an oversized dump of sensitive machine data.

## Inputs to inspect

Crash/error reports, build metadata, effective configuration, runtime logs/traces, seed/input state and privacy constraints.

## Workflow

1. Define a bounded bundle manifest for build commit, toolchain, platform, runtime version, redacted configuration, reproduction steps and available trace/counter artifacts.
2. Identify the smallest failure window and required context, including relevant tick/frame IDs, seed, event IDs and prerequisite state snapshots where safe.
3. Generate the bundle twice from the same captured failure and compare canonical manifests to ensure the capture process is deterministic apart from explicitly volatile fields.
4. Validate required artifacts, size limits, redaction and integrity hashes; ensure missing data is recorded instead of represented as if captured.
5. Add a command or documented procedure to verify the bundle and reproduce the scenario, including a clear distinction between deterministic replay and best-effort manual reproduction.

## Validation checklist

- [ ] Bundle includes exact build/runtime identity and clearly labels fields that could not be captured.
- [ ] Secrets, tokens, personal identifiers and unrelated user data are redacted before export.
- [ ] Size limits prevent runaway traces or dumps; truncation is explicit and leaves a useful failure window.
- [ ] Hashes and manifest checks detect missing or altered artifacts.

## Required output

A diagnostic bundle schema, example sanitized manifest, reproducibility check and documented failure-reproduction procedure.

## Boundaries and failure handling

Do not bundle full memory dumps or configuration blindly; classify sensitive content and request explicit handling for artifacts that may contain secrets.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
