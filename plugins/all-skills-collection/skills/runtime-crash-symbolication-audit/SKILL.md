---
name: runtime-crash-symbolication-audit
description: Verify crash reports can be mapped to the correct symbols and source revision for native, Rust, and packaged runtime builds.
---

# Runtime Crash Symbolication Audit

## Goal

Prevent misleading crash diagnoses caused by missing, stripped, mismatched, or incorrectly archived symbol artifacts.

## Inputs to inspect

Crash stack traces, symbol files, build IDs, compiler/linker settings, packaging pipeline and release artifact manifests.

## Workflow

1. Trace how each build produces and archives symbol artifacts, debug identifiers, binary hashes and source revision metadata.
2. Compare crash build IDs with archived binaries and symbols; detect symbol collisions, source-map drift and symbols overwritten by later builds.
3. Exercise a known crash in a packaged test build and verify the report resolves to the expected module/function/source range when tools support it.
4. Check platform-specific stripping and packaging steps preserve matching debug artifacts without accidentally shipping private symbols in public packages.
5. Add release checks that require symbol archival and verify one sample stack trace before a release is marked diagnosable.

## Validation checklist

- [ ] Symbols are keyed to the exact binary/build identity, not only a version label.
- [ ] Stripped distribution artifacts have matching private/archived symbols where policy permits.
- [ ] Symbol retention and access controls follow the project's privacy/security requirements.
- [ ] Unknown or mismatched symbols are reported as such rather than producing falsely confident source locations.

## Required output

A symbol-artifact map, known-crash symbolication result, mismatch findings and release gate for diagnostic readiness.

## Boundaries and failure handling

Do not claim a crash is symbolicated when addresses resolve against a different binary or source revision.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
