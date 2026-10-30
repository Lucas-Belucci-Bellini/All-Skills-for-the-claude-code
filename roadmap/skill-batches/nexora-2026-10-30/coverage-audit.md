# NEXORA skills — coverage audit (2026-10-30)

## Status

- Audit base: `main` at the 2,500-skill catalog milestone.
- Catalog entries matching the NEXORA-specific namespace: **306**.
  - **296** entries named `nexora-*`.
  - **10** entries in `voxel-world-engineering` named `voxel-*`.
- All 306 entries are marked `new-authored` in the catalog.
- This is a catalog inventory only. It does **not** prove that every workflow has been executed against the current NEXORA checkout.

## Existing coverage by category

| Category | Skills |
| --- | ---: |
| nexora-ai-tooling | 10 |
| nexora-assets-validation | 10 |
| nexora-build-automation | 10 |
| nexora-concurrency-safety | 10 |
| nexora-content-pipeline | 10 |
| nexora-data-contracts | 10 |
| nexora-data-migration | 10 |
| nexora-editor-tooling | 10 |
| nexora-final-acceptance | 14 |
| nexora-networking | 10 |
| nexora-operations-hardening | 10 |
| nexora-performance-memory | 10 |
| nexora-platform-compatibility | 10 |
| nexora-release-operations | 10 |
| nexora-reliability | 10 |
| nexora-render-quality | 10 |
| nexora-runtime-observability | 10 |
| nexora-runtime-reliability | 21 |
| nexora-runtime-systems | 10 |
| nexora-rust-architecture | 10 |
| nexora-security-boundaries | 10 |
| nexora-simulation-ai | 30 |
| nexora-simulation-quality | 10 |
| nexora-testing-tooling | 10 |
| nexora-world-safety | 10 |
| nexora-worldgen-streaming | 10 |
| voxel-world-engineering | 10 |
| Rust & platform engineering (NEXORA crate-boundary audit) | 1 |
| **Total** | **306** |

## Verified repository facts from the NEXORA main branch

The NEXORA README describes a voxel sandbox where the world simulation continues independently of the player's presence. It documents a current end-to-end headless slice and a windowed client, while explicitly treating several longer-term systems as not yet established.

The workspace manifest currently declares Rust edition 2021 and `rust-version = "1.85"`. The crate graph includes foundation, runtime, asset/resource/image, command/query, persistence, world/entity/physics, streaming/mesh/camera, render/RHI/`rhi-wgpu`, window, simulation, client, headless and benchmark crates, plus Texture Forge. The manifest's comments specify dependency direction and the workspace forbids unsafe Rust code.

The graphics backend is not an unknown: the workspace explicitly contains `engine/rhi-wgpu` and the `wgpu` dependency. Future skills must still inspect the actual implementation and pinned crate versions before prescribing API calls.

## Initial gap-review priorities

These are **review targets**, not claims that the functionality is missing:

1. **Current-code alignment:** compare each skill's assumptions with the actual crate APIs and accepted ADRs.
2. **Voxel correctness:** validate chunk coordinates, border meshing, dirty-state propagation, streaming, generation determinism and save compatibility against current implementations.
3. **Rendering integration:** inspect RHI/wgpu resource lifetime, render-pass contracts, shader validation, upload paths and device-loss handling.
4. **Memory/performance:** connect each budget or profiling workflow to a reproducible benchmark and target hardware rather than invented numeric limits.
5. **Release validation:** map the skills to the README's Alpha acceptance path and distinguish headless tests, windowed smoke tests and real-hardware checks.

## Rules for the next batch

- Do not create another generic skill if one of the 306 already covers the task.
- Prefer a focused NEXORA-specific improvement to an existing skill when the procedure is stale.
- Add a new skill only when a concrete gap is demonstrated by code, an ADR, a test failure or an issue.
- Record tested commit, toolchain, commands and results; mark unavailable checks as not run.
- Keep canonical source and generated plugin copy byte-identical; update the catalog/manifest through the repository's normal synchronization workflow.
- Keep work on `feat/nexora-engine-skills-batch-01-2026-10-30`; do not modify `main` directly.

## Tracking

- Master roadmap: [issue #180](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/180)
- Rust architecture/runtime: [issue #181](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/181)
- Voxel world/chunks/meshing: [issue #182](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/182)
- Rendering/RHI/assets: [issue #183](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/183)
- Performance/memory/stability: [issue #184](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/184)
- Texture production remains tracked separately in [issue #50](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/50).
