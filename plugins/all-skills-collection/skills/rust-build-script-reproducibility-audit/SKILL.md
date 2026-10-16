---
name: rust-build-script-reproducibility-audit
description: Audit Rust build.rs and code-generation inputs for undeclared environment dependence, network access, host-tool assumptions, and non-reproducible output.
---

# Rust Build Script Reproducibility Audit

## Goal

Make Cargo builds repeatable across clean environments by ensuring build scripts depend only on declared, pinned inputs or explicitly documented host capabilities.

## Inputs to inspect

build.rs files, generated source, rerun-if-changed directives, environment variables, external generators, network calls and build logs.

## Workflow

1. Inventory build scripts and code generators; list files, env vars, tool versions, target/host distinctions and external inputs each consumes.
2. Compare actual input reads with Cargo rerun declarations and verify changes to relevant files/env values trigger regeneration while unrelated changes do not.
3. Run a clean build in an isolated environment with restricted network and known toolchain to reveal undeclared host tools or download-time dependencies.
4. Build twice from equivalent inputs and compare generated files/artifacts, accounting for intentionally volatile fields and recording any remaining nondeterminism.
5. Document required host tools and supported cross-compilation behavior, then add tests or CI checks for missing declared inputs.

## Validation checklist

- [ ] Required inputs are declared and rerun behavior is correct.
- [ ] Build scripts do not download mutable dependencies silently during normal builds.
- [ ] Cross-compilation distinguishes host tools from target artifacts.
- [ ] Generated output differences are explained and not hidden by rewriting source files indiscriminately.

## Required output

A build-script/input map, clean-environment results, generated-output comparison and reproducibility remediation list.

## Boundaries and failure handling

Do not assume matching Cargo.lock alone makes build scripts hermetic or reproducible.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
