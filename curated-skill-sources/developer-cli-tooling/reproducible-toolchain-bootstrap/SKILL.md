---
name: reproducible-toolchain-bootstrap
description: "Create a repeatable toolchain bootstrap with pinned versions, platform checks, integrity verification and safe upgrade boundaries."
---

# Reproducible Toolchain Bootstrap

## Purpose

Ensure contributors can prepare compatible environments without undocumented machine state.

## Required inputs

Tool manifest, supported OS/architectures, version policy, package sources, cache and permissions.

## Workflow

1. Inventory required tools and distinguish exact pins from compatible ranges and optional integrations.
2. Select authoritative version sources and define how existing installations are detected.
3. Specify checksums/signatures, architecture, cache behavior and offline failure modes.
4. Run bootstrap on clean and partially provisioned environments; confirm repeated runs converge.
5. Test upgrade, downgrade, interrupted download and integrity failure behavior.

## Validation checklist

- [ ] Required versions are machine-checkable.
- [ ] Artifacts are verified before execution.
- [ ] Existing installations are not overwritten unexpectedly.
- [ ] Repeated bootstrap has no unexplained version drift.
- [ ] Offline/source failure is honest and actionable.

## Required output

Version manifest, bootstrap contract, platform matrix and repeatability report.

## Boundaries and failure handling

Never execute unverified bootstrap scripts or disable certificate checks. State when unpinned upstream inputs prevent deterministic output.

## Trigger examples

- **Positive:** Every contributor and CI runner needs the same compiler and formatter versions.
- **Negative:** Adding a one-off utility unrelated to the project toolchain.
