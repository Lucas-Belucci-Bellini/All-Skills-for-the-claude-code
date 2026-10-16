---
name: container-image-reproducibility-audit
description: "Use when independently rebuilding a container image should yield an explainable equivalent artifact; not for generic cross-platform application build testing."
---

# Container Image Reproducibility Audit

## Purpose

Find uncontrolled inputs that cause container-image rebuilds to diverge.

## Required inputs

Dockerfile/build definition, pinned base-image digests, lockfiles, build arguments, build platform, image manifests/layers, and build logs.

## Workflow

1. Enumerate all build inputs, including base digests, package repositories, timestamps, architecture, network downloads, generated files, and environment variables.
2. Build twice in clean isolated workspaces using the same declared inputs and compare image config, layer digests, file metadata, and platform manifests.
3. Classify differences into expected nondeterminism, missing pin, network drift, timestamp/locale leak, architecture divergence, or build-script behavior.
4. Fix or document the smallest source of drift and repeat the rebuild; preserve the diff and commands as evidence.

## Verification checklist

- [ ] Base images and dependency sources are pinned according to project policy.
- [ ] Network-fetched dependencies are checksummed or otherwise verified.
- [ ] The comparison distinguishes semantically equivalent content from byte-identical output.
- [ ] Multi-architecture manifests are compared per supported platform.

## Required output

A container reproducibility report with inputs, rebuild commands, divergence classification, diffs, and remediation.

## Boundaries and failure handling

Do not treat a successful local rebuild as proof of a trusted supply chain. Avoid including registry credentials in logs.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Identical release tags produce different OCI image layer digests in CI.
- **Negative:** Testing whether two independent Rust binaries behave identically at runtime.
