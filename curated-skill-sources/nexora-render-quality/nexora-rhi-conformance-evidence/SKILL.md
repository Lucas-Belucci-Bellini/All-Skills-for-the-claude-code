---
name: nexora-rhi-conformance-evidence
description: "Validates NEXORA's null and native RHI backends against the shared contract, reconciles CI and real-hardware evidence, and prevents stale or overstated graphics compatibility claims."
---

# NEXORA RHI Conformance Evidence

## Purpose

Use this workflow when changing the NEXORA Render Hardware Interface (RHI), adding or modifying a backend, updating shader/resource behavior, reviewing GPU compatibility, or deciding whether a graphics backend is safe to put under the renderer.

The objective is not merely to make a backend compile. Prove that it preserves the shared RHI contract, that its native operations produce correct observable results, and that the evidence is tied to the exact commit and device/backend that ran it.

## Reuse before creating

Pair this workflow with existing skills; do not duplicate their responsibilities:

- `rendering-abstraction-design` for deciding what belongs in the backend-neutral interface.
- `engine-render-feature-matrix` and `nexora-platform-gpu-capability-profile` for queried capabilities and supported-device fallbacks.
- `nexora-device-loss-state-machine` / `engine-gpu-device-loss-recovery` for device loss and recreation.
- `nexora-gpu-resource-retirement`, `engine-render-resource-lifetime`, and `engine-resource-lifetime-ledger` for resource ownership and deferred destruction.
- `nexora-gpu-upload-backpressure` and `gpu-upload-staging-ring` for upload capacity, staging allocation, and backpressure.
- `nexora-shader-compile-failure-recovery`, `nexora-shader-reflection-contract`, and `engine-shader-reflection-layout-contract` for shader diagnostics and binding layouts.
- `gpu-readback-stall-audit` for asynchronous readback and synchronization stalls.
- `nexora-surface-acquisition-recovery` for window-surface failures and presentation recovery.

This workflow owns the NEXORA-specific conformance/evidence chain: shared contract → null backend → native backend → CI software drivers → local physical hardware → commit-scoped report.

## Verified NEXORA architecture snapshot

Re-check the active checkout before applying these observations; they describe the inspected 2026-10-30 snapshot.

- `engine/rhi` is the backend-neutral contract and shared kit. `Rhi` exposes resources, command lists, submission, polling, ordered fences, presentation, device loss/recreation, and memory accounting.
- `engine/rhi/src/conformance.rs` defines the shared `CASES` list. In the inspected snapshot it contains **11 cases**: capabilities, descriptor-rules, stale-handles, write-rules, fence-order, deferred-destruction, draw-rules, binding-rules, clear-rules, present, and at-rest.
- `engine/rhi/src/null.rs` is the no-GPU backend; it must preserve the contract without initializing a GPU.
- `engine/rhi-wgpu` is the first native backend, package `nexora-rhi-wgpu`, using `wgpu = 30.0.1` and WGSL. The backend uses the shared kit and runs the same conformance suite.
- `engine/rhi-wgpu/src/main.rs` builds `nexora-rhi-probe`. It prints the adapter/driver, conformance case count, upload/readback proof, draw proof, bound-texture/depth/uniform proof, and culling proof.
- `scripts/local-validation.py` defines the `rhi_native` check. It runs the release probe on the current machine and records the result in `docs/validation/local/NEXORA-LOCAL-VALIDATION.{json,md}`; `check` determines whether the report still applies to HEAD.
- The local validation bridge intentionally records no hostname, username, serial number, MAC address, or absolute path. Preserve that privacy property.
- ADR-0025 and ADR-0026 describe the rationale and validation history. Some historical ADR-0026 examples still say `9/9`; do not copy those stale counts. Read the active `CASES` constant and probe output, then update documentation when the source-of-truth changed.
- CI has exercised software/virtual drivers: Linux Vulkan/lavapipe, Windows Direct3D 12/WARP, and macOS Metal/Apple Paravirtual device. These prove CI compatibility on those software/virtual adapters, not physical-GPU support for every vendor/device.

## Required inputs

- Exact NEXORA commit and working-tree state.
- RHI trait, descriptor/command rules, shared kit, null backend, native backend, conformance cases, probe, Cargo manifests, and relevant ADRs.
- CI run URLs and per-platform adapter/driver output.
- Local validation report, if available, including its commit and check statuses.
- Target backend/API, OS, adapter class, driver version, shader language, and expected capability profile.
- Reproducible failing command, test, probe output, validation-layer message, or pixel/readback mismatch.

## Workflow

1. **Pin the source of truth.** Record the commit, Rust toolchain, package versions, and target triple. Inspect active code rather than assuming an ADR, README, old CI log, or prior skill description is current.
2. **Map the contract.** Trace the `Rhi` trait, descriptors, command variants, shared `kit`, memory accounting, handle generation/epoch, fence semantics, and conformance runner. Write each invariant in a backend-neutral form.
3. **Audit conformance coverage.** Read the active `CASES` constant and every case implementation. Confirm each contract rule is exercised and that failures identify the violated case/rule. Do not hardcode historical case counts.
4. **Keep the null backend honest.** Run its tests and headless smoke path without a GPU. Verify that no GPU instance/device is initialized, memory accounting drains at rest, and unsupported presentation is reported honestly.
5. **Run the native backend tests.** Start with `cargo test -p nexora-rhi` and `cargo test -p nexora-rhi-wgpu`. Inspect the test harness and environment requirements before running display-dependent tests. Preserve complete failure output for the first failing case.
6. **Run the release probe.** Build the actual release target and execute `nexora-rhi-probe` through the repository's prescribed validation flow. Require successful adapter initialization, every current conformance case, upload/readback identity, draw output, binding/depth/uniform proof, culling proof, and final `result OK`. A compile-only result is not a native-backend pass.
7. **Verify command ordering.** For writes encoded in a `CommandList`, verify that operations execute in recorded order. Do not replace encoded staging copies with queue writes that execute before the whole submission. Add a regression case whenever ordering semantics change.
8. **Verify resource and fence invariants.** Check all-or-nothing submission, stale handles, generation/epoch invalidation, ordered fences, deferred destruction, memory return after last use, and no resource reclamation while submitted work still references it. Delegate deep lifetime work to the dedicated skills.
9. **Validate shader and binding behavior.** Confirm the backend validates the selected shader language, rejects invalid stages/layouts, maps vertex attributes and binding slots exactly, and reports actionable diagnostics. Do not infer shader correctness from pipeline creation alone; retain the probe's observable draw/readback proof.
10. **Run the CI backend matrix.** Inspect actual workflow jobs and adapter output for Linux Vulkan/lavapipe, Windows D3D12/WARP, and macOS Metal/virtual device as currently configured. A skipped, cancelled, action-required, or missing platform job is not a pass. Distinguish software/virtual coverage from physical hardware.
11. **Run local physical-device validation.** On the target machine, use `python scripts/local-validation.py run` (or the repository's documented quick mode when explicitly appropriate), then inspect `docs/validation/local/NEXORA-LOCAL-VALIDATION.json` and its Markdown companion. Confirm `rhi_native` actually ran and is PASS; `NEXORA_GPU=none` yields SKIPPED, never PASS. Do not fabricate or commit a report from a machine that did not run the probe.
12. **Check report freshness.** Run `python scripts/local-validation.py check` after the report is present. If relevant engine/tool/content/Cargo paths changed, the report is stale and must be regenerated on the target machine. A report for commit A does not prove commit B.
13. **Reconcile docs.** Compare case counts, package versions, adapter matrix, command names, and output strings across code, ADRs, README, validation reports, and skill docs. Correct historical examples that are now misleading; never edit the source constant just to match stale documentation.
14. **Audit privacy and provenance.** Ensure local reports continue to scrub identifying machine data and absolute paths. Do not attach raw logs that expose usernames, machine names, serials, MAC addresses, tokens, or unrelated local paths.
15. **Classify failures by layer.** Separate descriptor/contract violation, backend implementation bug, unsupported capability, shader compile/reflection failure, driver/device failure, surface/window failure, and stale evidence. Route each to the narrow owning workflow; do not mask a contract violation as a device reset.
16. **Test negative and fault cases.** Include invalid descriptors, unsupported formats, unaligned/out-of-range writes, mixed valid/invalid command lists, stale/double-destroy handles, never-issued fences, deferred destruction, invalid binding layouts, no-surface presentation, shader rejection, device loss/recreate, and memory budget exhaustion as supported by the active contract.
17. **Report results by evidence class.** Separate unit tests, headless/null tests, CI software drivers, local physical GPU, display/surface smoke tests, manual observations, and unexecuted cases. Record commit, OS, API, adapter class, driver, command, status, duration, and artifact location.
18. **Gate backend adoption.** Do not put a backend under production renderer paths until it passes the shared contract and observable native probe. Do not claim full hardware support from one software driver or one GPU. State unsupported profiles and remaining limitations explicitly.

## Validation matrix

| Evidence layer | Minimum proof | Does not prove |
|---|---|---|
| Shared contract | All active conformance cases pass | Native GPU correctness |
| Null backend | Headless startup, no GPU, memory drains | Pixels or presentation |
| Native unit/integration tests | Backend tests and error/ordering/lifetime cases pass | Physical vendor coverage |
| Native release probe | Upload/readback, draw, bindings/depth/uniform, culling, final OK | Window surface unless the probe opens one |
| CI platform matrix | Configured API jobs pass on reported adapters | Physical hardware support |
| Local physical GPU | Commit-scoped `rhi_native: PASS` | Other devices/vendors or future commits |
| Window/surface probe | Actual surface presentation and readback where supported | General renderer/gameplay readiness |

## Required output

Produce an RHI conformance evidence report containing: pinned commit/toolchain; contract map; active conformance case list/count; null-backend result; native test and release-probe output; CI platform/adapter matrix; local physical-GPU report and freshness; shader/binding proof; upload/readback/draw evidence; failure classification; privacy review; documentation drift; exact PASS/FAIL/SKIPPED/UNVERIFIED status; and unresolved hardware/platform risks.

## Boundaries and failure handling

- Do not confuse a successful Rust build with a successful backend.
- Do not treat software/virtual CI adapters as physical GPU evidence.
- Do not mark a missing GPU check as PASS; preserve the repository's explicit `SKIPPED` semantics.
- Do not hardcode the historical 9-case count; use the active suite.
- Do not change the shared contract to accommodate one backend without updating the null backend and all conformance tests.
- Do not use `Queue::write_*` for ordered command-list writes if it changes the documented execution order.
- Do not recreate a device for a surface-only error; use the surface recovery workflow.
- Do not claim a local report is current unless its commit and relevant-path freshness check pass.
- Do not expose identifying local machine data in committed evidence.
- Never claim tests, benchmarks, physical-device checks, or platform compatibility that were not actually observed.

## Trigger examples

- **Positive:** Add a second RHI backend and prove it matches NEXORA's shared contract.
- **Positive:** Investigate a CI or local failure in `nexora-rhi-probe`, conformance, shader validation, upload/readback, or draw proof.
- **Positive:** Determine whether NEXORA's GPU support claim is backed by software CI, physical hardware, or only compilation.
- **Positive:** Update RHI documentation after the active conformance suite changes.
- **Negative:** The issue is only about staging-ring allocation/backpressure; use the upload staging and backpressure skills.
- **Negative:** The issue is only about shader binding reflection or cache keys; use the dedicated shader skills.
- **Negative:** The issue is only about window surface acquisition/presentation; use `nexora-surface-acquisition-recovery`.
