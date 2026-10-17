---
name: buildx-parallel-build-resource-budget
description: "Validate buildx parallel build resource budget with explicit acceptance criteria, failure handling, and reviewable evidence."
---

# Buildx Parallel Build Resource Budget

## Purpose

Make buildx parallel build resource budget a reviewable engineering contract. Define expected state, dangerous boundary conditions and a reproducible verification path instead of relying on tribal knowledge or a single successful happy-path run.

## Required inputs

Dockerfile and .dockerignore, Buildx/BuildKit version, build command and platforms, lockfiles, base-image digests, cache configuration, registry target and sanitized build logs.

## Workflow

1. Find the Dockerfile stages, build invocation, context, dependency locks and cache/import/export settings responsible for buildx parallel build resource budget; record builder and platform versions.
2. Define the acceptance contract for buildx parallel build resource budget: output platforms, artifact digest/labels, acceptable size or time budget, secret boundary and required provenance.
3. Create an isolated build fixture and compare cold-cache versus warm-cache runs; include native or independently verifiable platform results where emulation may differ.
4. Run Buildx with explicit target platforms and output type. Inspect build arguments, secret/SSH mounts, entitlements, ignored files and artifacts crossing multi-stage boundaries.
5. Compare OCI index/manifest digests, package inventory, SBOM/provenance subjects, layer sizes and reproducibility evidence; distinguish timestamp noise from unexplained drift.
6. Inject a controlled cache miss, missing credential or registry failure and confirm the build fails safely without leaking secrets or publishing a partial release.
7. Deliver the command, builder/version matrix, digest evidence, cache trust assumptions and a minimal remediation or rollback plan before changing release workflows.

## Validation checklist

- [ ] Builder version, target platforms and output type are explicit.
- [ ] Secrets use supported secret/SSH mounts and never enter image layers or logs.
- [ ] Cache keys and remote-cache access match the build-source trust boundary.
- [ ] Target platform manifests and runtime dependencies are verified.
- [ ] Artifact digest, SBOM/provenance subject and release metadata refer to the same output.
- [ ] Size/time regression and cold/warm-cache behavior have evidence.
- [ ] A validation-only run does not publish a release artifact.

## Required output

Produce a container-build report with reproducible command, platform matrix, digest/SBOM/provenance evidence, cache/secret-boundary assessment and remediation steps. Include target revision/environment, acceptance criteria, command or artifact references, pass/fail/blocked results, unresolved assumptions and the owner for the next action.

## Boundaries and failure handling

Use synthetic credentials and disposable tags/registries for tests. Never bake credentials into ARG/ENV, copy host secrets into build context, or publish a release artifact without authorization. If a platform, registry or provenance service is unreachable, mark the check blocked; do not infer reproducibility from a local single-platform build.

## Trigger examples

- **Positive:** A Dockerfile or Buildx change requires evidence for buildx parallel build resource budget across the intended targets.
- **Negative:** A request asks to expose a build secret, trust an unverified remote cache, or push a release image during validation.
