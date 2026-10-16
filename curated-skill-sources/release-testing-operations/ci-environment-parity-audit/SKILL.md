---
name: ci-environment-parity-audit
description: Compare local, CI, container, and release-build environments to find toolchain, dependency, locale, timezone, filesystem, and platform drift.
---

# CI Environment Parity Audit

## Goal

Prevent tests and builds from passing only in one environment because of hidden configuration or host assumptions.

## Inputs to inspect

CI workflows, developer setup instructions, container images, toolchain pins, environment variables, dependency caches and release scripts.

## Workflow

1. Inventory the environment variables, tool versions, OS images, shell behavior, locale/timezone, filesystem case sensitivity and network assumptions used by critical jobs.
2. Generate a normalized environment manifest for local/CI/release paths, redacting secrets and omitting volatile machine details that do not affect behavior.
3. Run a small contract suite in each environment to compare dependency resolution, tests, artifact metadata and path/encoding assumptions.
4. Classify differences as intentional, harmless, correctness-affecting or security-relevant; reproduce suspected issues by changing one dimension at a time.
5. Pin or validate the inputs that affect results and publish a drift report as part of release readiness.

## Validation checklist

- [ ] Build/test claims identify the environment and exact toolchain.
- [ ] Secrets are never embedded in parity artifacts.
- [ ] Filesystem and shell differences are tested when supported developer platforms differ.
- [ ] Intentional environment differences are documented with owner and rationale.

## Required output

A normalized environment matrix, risk-ranked drift findings and automated smoke checks for critical build/test paths.

## Boundaries and failure handling

Do not force local and production environments to be identical when their roles differ; eliminate only unintentional, behavior-affecting drift.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
