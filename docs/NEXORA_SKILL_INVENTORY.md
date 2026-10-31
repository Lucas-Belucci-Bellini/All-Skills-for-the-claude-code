# NEXORA Skill Inventory

Updated: 2026-10-31  
Catalog snapshot: 2562 distinct skills  
NEXORA-related catalog entries: 358  
Scope: skills whose catalog name or category contains "NEXORA". This inventory lists skill assets in the All-Skills library; it does not mean the corresponding game feature is implemented in the NEXORA runtime.

## Summary

- NEXORA-related skills: **358**
- Catalog total: **2562**
- Long-term library target: **5000**
- Remaining to library target: **2438**
- Latest integrated skill: `nexora-climate-multiscale-field-coherence` (PR #262; merged after CI validation).

## Inventory by category

### Curated: nexora-ai-tooling (10)

- `nexora-ai-action-validation-gate`
- `nexora-ai-behavior-tree-bounded-tick`
- `nexora-ai-generated-content-validation`
- `nexora-ai-navigation-intent-contract`
- `nexora-ai-npc-memory-retention`
- `nexora-ai-observability-redaction`
- `nexora-ai-planner-failure-classification`
- `nexora-ai-planner-world-snapshot`
- `nexora-ai-planning-determinism-boundary`
- `nexora-ai-tool-budget-contract`

### Curated: nexora-assets-validation (10)

- `nexora-animation-clip-time-contract`
- `nexora-asset-import-golden-tests`
- `nexora-asset-reference-cycle-audit`
- `nexora-asset-streaming-corruption-recovery`
- `nexora-content-load-order-independence`
- `nexora-mesh-lod-transition-contract`
- `nexora-mesh-topology-validation`
- `nexora-shader-compile-failure-recovery`
- `nexora-skeleton-skin-weight-normalization`
- `nexora-texture-format-fallback`

### Curated: nexora-build-automation (10)

- `nexora-benchmark-baseline-refresh`
- `nexora-build-cache-trust-boundary`
- `nexora-build-failure-minimizer`
- `nexora-build-feature-provenance`
- `nexora-build-graph-incrementality`
- `nexora-ci-change-impact-selection`
- `nexora-cross-target-compile-matrix`
- `nexora-dependency-upgrade-impact`
- `nexora-generated-code-determinism`
- `nexora-release-channel-policy`

### Curated: nexora-concurrency-safety (10)

- `nexora-async-queue-fairness`
- `nexora-async-singleflight-deduplication`
- `nexora-atomic-generation-swap-contract`
- `nexora-concurrent-world-read-contract`
- `nexora-entity-command-buffer-order`
- `nexora-event-handler-reentrancy`
- `nexora-job-result-publication-transaction`
- `nexora-resource-reservation-atomicity`
- `nexora-shared-cache-concurrent-invalidation`
- `nexora-shutdown-concurrent-request-idempotency`

### Curated: nexora-content-pipeline (17)

- `nexora-asset-budget-admission`
- `nexora-asset-import-dependency-graph`
- `nexora-atlas-face-texel-orientation-contract`
- `nexora-atlas-face-variant-determinism`
- `nexora-atlas-mip-footprint-selection`
- `nexora-content-provenance-manifest`
- `nexora-content-registry-atomic-publication`
- `nexora-hot-reload-generation-swap`
- `nexora-material-schema-versioning`
- `nexora-mod-api-compatibility-gate`
- `nexora-mod-dependency-resolution`
- `nexora-procedural-texture-seed-repair-identity`
- `nexora-shader-reflection-contract`
- `nexora-texture-atlas-fragmentation`
- `nexora-texture-forge-build-plan-integrity`
- `nexora-texture-manifest-default-inheritance`
- `nexora-texture-recipe-periodic-tiling-contract`

### Curated: nexora-data-contracts (12)

- `nexora-chunk-change-feed-gap-recovery`
- `nexora-crafting-recipe-cycle-audit`
- `nexora-inventory-transaction-invariants`
- `nexora-item-stack-identity-contract`
- `nexora-mod-event-subscription-lifecycle`
- `nexora-mod-hot-reload-state-migration`
- `nexora-region-residency-preservation`
- `nexora-save-forward-compatibility`
- `nexora-save-migration-rollback`
- `nexora-world-edit-conflict-resolution`
- `nexora-world-region-compaction`
- `nexora-world-region-index-integrity`

### Curated: nexora-data-migration (10)

- `nexora-asset-guid-migration`
- `nexora-config-migration-idempotency`
- `nexora-content-diff-review`
- `nexora-content-registry-migration`
- `nexora-data-migration-dry-run`
- `nexora-entity-component-schema-migration`
- `nexora-migration-observability`
- `nexora-network-schema-evolution`
- `nexora-save-compatibility-fixture-policy`
- `nexora-schema-deprecation-window`

### Curated: nexora-digital-logic (1)

- `nexora-digital-logic-library-integration-audit`

### Curated: nexora-editor-tooling (10)

- `nexora-debug-overlay-budget`
- `nexora-editor-asset-preview-isolation`
- `nexora-editor-background-job-cancellation`
- `nexora-editor-command-validation`
- `nexora-editor-docking-layout-migration`
- `nexora-editor-save-dirty-state`
- `nexora-editor-selection-identity`
- `nexora-editor-undo-transaction`
- `nexora-live-inspector-snapshot-safety`
- `nexora-tooling-project-repro-manifest`

### Curated: nexora-final-acceptance (14)

- `nexora-2500-skill-milestone-acceptance`
- `nexora-alpha-tester-build-checklist`
- `nexora-clean-room-build-verification`
- `nexora-critical-path-smoke-gate`
- `nexora-dependency-license-release-gate`
- `nexora-engine-known-limitations-register`
- `nexora-engine-readiness-review`
- `nexora-feature-flag-retirement-report`
- `nexora-mod-compatibility-release-blocker`
- `nexora-observability-privacy-release-gate`
- `nexora-release-evidence-bundle`
- `nexora-resource-budget-release-blocker`
- `nexora-roadmap-completion-evidence`
- `nexora-world-data-loss-release-blocker`

### Curated: nexora-machine-automation (3)

- `nexora-energy-network-transaction-contract`
- `nexora-fluid-network-transport-contract`
- `nexora-machine-logic-graph-contract`

### Curated: nexora-networking (10)

- `nexora-network-backpressure-policy`
- `nexora-network-clock-drift-correction`
- `nexora-network-desync-triage`
- `nexora-network-entity-generation-guard`
- `nexora-network-input-rate-limiter`
- `nexora-network-interest-boundary-test`
- `nexora-network-protocol-version-gate`
- `nexora-network-reliable-event-order`
- `nexora-network-session-epoch-rotation`
- `nexora-replication-delta-baseline`

### Curated: nexora-operations-hardening (10)

- `nexora-engine-recovery-drill`
- `nexora-engine-safe-mode-contract`
- `nexora-feature-fallback-regression-suite`
- `nexora-incident-timeline-correlation`
- `nexora-runtime-invariant-monitor`
- `nexora-save-repair-plan-approval`
- `nexora-world-load-admission`
- `nexora-world-recovery-priority`
- `nexora-world-save-quiescence-barrier`
- `nexora-world-session-ownership`

### Curated: nexora-performance-memory (20)

- `nexora-allocation-hotpath-audit`
- `nexora-allocator-fragmentation-attribution`
- `nexora-cache-eviction-policy`
- `nexora-frame-allocation-budget`
- `nexora-frame-time-regression-triage`
- `nexora-gpu-frame-timing-evidence`
- `nexora-gpu-memory-pressure-policy`
- `nexora-job-queue-admission-budget`
- `nexora-job-system-long-run-health`
- `nexora-lock-contention-profile`
- `nexora-memory-budget-admission`
- `nexora-memory-budget-attribution`
- `nexora-memory-leak-lifecycle-test`
- `nexora-memory-ledger-pressure-reporting`
- `nexora-profiler-overhead-calibration`
- `nexora-task-priority-inversion-audit`
- `nexora-voxel-memory-workload-benchmark`
- `nexora-voxel-mesh-upload-backpressure`
- `nexora-voxel-palette-transition-invariants`
- `nexora-worker-pool-saturation`

### Curated: nexora-platform-compatibility (10)

- `nexora-platform-audio-capability-profile`
- `nexora-platform-clock-contract`
- `nexora-platform-file-locking-contract`
- `nexora-platform-filesystem-durability`
- `nexora-platform-gpu-capability-profile`
- `nexora-platform-path-canonicalization`
- `nexora-platform-path-length-fallback`
- `nexora-platform-resource-limit-detection`
- `nexora-platform-runtime-smoke-matrix`
- `nexora-platform-threading-capability`

### Curated: nexora-release-operations (10)

- `nexora-config-defaults-drift-audit`
- `nexora-engine-upgrade-smoke-suite`
- `nexora-feature-flag-removal-gate`
- `nexora-mod-compatibility-test-lab`
- `nexora-release-artifact-integrity-check`
- `nexora-release-candidate-gate`
- `nexora-release-notes-contract`
- `nexora-release-rollback-plan`
- `nexora-upgrade-preflight-report`
- `nexora-world-format-support-matrix`

### Curated: nexora-reliability (13)

- `nexora-client-retained-column-spill-lifecycle`
- `nexora-crash-recovery-startup-gate`
- `nexora-diagnostic-log-redaction`
- `nexora-durable-edit-journal-replay`
- `nexora-mod-permission-audit`
- `nexora-plugin-failure-containment`
- `nexora-release-artifact-reproducibility`
- `nexora-save-recovery-generation-select`
- `nexora-save-write-ordering`
- `nexora-streaming-failure-retention-accounting`
- `nexora-telemetry-cardinality-budget`
- `nexora-untrusted-asset-parser-hardening`
- `nexora-world-save-checksum-contract`

### Curated: nexora-render-quality (22)

- `nexora-animation-lod-transition`
- `nexora-animation-pose-cache-invalidation`
- `nexora-atlas-cpu-shader-reference-parity`
- `nexora-atmosphere-fog-composition-contract`
- `nexora-audio-device-loss-recovery`
- `nexora-audio-spatialization-contract`
- `nexora-color-space-pipeline-contract`
- `nexora-cutout-layer-integration`
- `nexora-environmental-vfx-event-bridge`
- `nexora-lighting-render-extraction-contract`
- `nexora-occlusion-query-latency-contract`
- `nexora-pbr-material-render-bridge`
- `nexora-render-pass-state-contract`
- `nexora-render-resolution-budget`
- `nexora-render-target-resize-transaction`
- `nexora-rhi-conformance-evidence`
- `nexora-shadow-caster-extraction-contract`
- `nexora-surface-acquisition-recovery`
- `nexora-surface-present-blit-fidelity`
- `nexora-temporal-history-invalidation`
- `nexora-texture-art-direction-coherence-audit`
- `nexora-texture-preview-seam-review`

### Curated: nexora-runtime-observability (10)

- `nexora-background-task-deadline-policy`
- `nexora-crash-dump-version-contract`
- `nexora-device-loss-state-machine`
- `nexora-engine-shutdown-order-audit`
- `nexora-restartable-background-task`
- `nexora-runtime-feature-degradation`
- `nexora-runtime-health-check-contract`
- `nexora-service-level-objectives-engine`
- `nexora-structured-diagnostic-event`
- `nexora-watchdog-deadlock-diagnostics`

### Curated: nexora-runtime-reliability (22)

- `nexora-asset-content-addressing`
- `nexora-asset-import-failure-isolation`
- `nexora-async-shutdown-barrier`
- `nexora-config-transactional-reload`
- `nexora-crash-report-redaction`
- `nexora-cross-platform-filesystem-contract`
- `nexora-deterministic-tick-input-log`
- `nexora-edit-remesh-snapshot-refresh`
- `nexora-engine-startup-phase-gates`
- `nexora-frame-pacing-budget`
- `nexora-gpu-resource-retirement`
- `nexora-gpu-upload-backpressure`
- `nexora-mod-capability-boundary`
- `nexora-mod-content-conflict-resolution`
- `nexora-render-graph-dependency-audit`
- `nexora-resource-handle-generation`
- `nexora-runtime-budget-regression`
- `nexora-rust-error-boundary-design`
- `nexora-save-corruption-quarantine`
- `nexora-shader-cache-key-contract`
- `nexora-simulation-render-snapshot-boundary`
- `nexora-texture-streaming-priority`

### Curated: nexora-runtime-systems (13)

- `nexora-animation-root-motion-authority`
- `nexora-animation-skeleton-version-contract`
- `nexora-audio-clock-synchronization`
- `nexora-audio-voice-budget`
- `nexora-camera-origin-rebasing`
- `nexora-collision-shape-cache-identity`
- `nexora-constraint-solver-stability`
- `nexora-first-person-pointer-motion-and-cursor-capture`
- `nexora-gameplay-tick-profiler`
- `nexora-physics-body-pair-sweep-ccd`
- `nexora-physics-broadphase-budget`
- `nexora-physics-continuous-collision`
- `nexora-physics-step-report-overload-accounting`

### Curated: nexora-rust-architecture (10)

- `nexora-crate-dependency-direction`
- `nexora-rust-async-cancellation-safety`
- `nexora-rust-error-context-chain`
- `nexora-rust-feature-flag-coherence`
- `nexora-rust-lock-poison-recovery`
- `nexora-rust-public-api-stability`
- `nexora-rust-resource-ownership-ledger`
- `nexora-rust-trait-object-boundary`
- `nexora-rust-unsafe-block-audit`
- `nexora-rust-workspace-release-gate`

### Curated: nexora-security-boundaries (11)

- `nexora-command-permission-matrix`
- `nexora-filesystem-sandbox-boundary`
- `nexora-mod-resource-quota`
- `nexora-network-egress-policy`
- `nexora-plugin-api-capability-audit`
- `nexora-remote-console-authentication`
- `nexora-secret-redaction-config-contract`
- `nexora-secure-update-manifest`
- `nexora-security-regression-corpus`
- `nexora-tracked-local-artifact-exposure-response`
- `nexora-world-save-authenticity-boundary`

### Curated: nexora-simulation-ai (32)

- `nexora-ai-agent-tick-budget`
- `nexora-ai-perception-query-budget`
- `nexora-authoritative-combat-resolution`
- `nexora-character-moving-platform-velocity-inheritance`
- `nexora-chunk-simulation-activation`
- `nexora-deterministic-event-ordering`
- `nexora-entity-component-ownership-audit`
- `nexora-entity-despawn-cascade`
- `nexora-fluid-simulation-stability`
- `nexora-gameplay-data-schema-validation`
- `nexora-gameplay-event-idempotency`
- `nexora-large-world-coordinate-contract`
- `nexora-navmesh-invalidation-contract`
- `nexora-network-message-size-contract`
- `nexora-network-reconnect-state-machine`
- `nexora-network-replication-interest`
- `nexora-npc-behavior-state-contract`
- `nexora-npc-save-state-schema`
- `nexora-pathfinding-open-set-safety`
- `nexora-physics-contact-lifecycle`
- `nexora-physics-fixed-step-stability`
- `nexora-replay-divergence-minimizer`
- `nexora-scripted-gameplay-budget`
- `nexora-server-authority-validation`
- `nexora-simulation-overload-degradation`
- `nexora-temporal-lod-offline-catchup`
- `nexora-weather-time-authority`
- `nexora-world-edit-command-transaction`
- `nexora-world-region-lock-order`
- `nexora-world-simulation-fixed-timestep`
- `nexora-world-state-hash-contract`
- `nexora-worldgen-modifier-order`

### Curated: nexora-simulation-quality (10)

- `nexora-ai-navigation-reference-tests`
- `nexora-ai-navigation-stuck-recovery`
- `nexora-combat-hitbox-consistency`
- `nexora-gameplay-balance-scenario-harness`
- `nexora-gameplay-regression-scenario-catalog`
- `nexora-gameplay-simulation-replay-contract`
- `nexora-gameplay-state-transition-audit`
- `nexora-item-progression-reachability`
- `nexora-world-event-scheduler-determinism`
- `nexora-world-interaction-reachability`

### Curated: nexora-testing-tooling (10)

- `nexora-api-compatibility-test-matrix`
- `nexora-ci-resource-budget`
- `nexora-crash-repro-minimal-project`
- `nexora-deterministic-regression-fixture`
- `nexora-fuzz-parser-entrypoints`
- `nexora-performance-benchmark-contract`
- `nexora-property-test-world-invariants`
- `nexora-static-analysis-gate`
- `nexora-test-failure-classification`
- `nexora-test-isolation-contract`

### Curated: nexora-ui-engineering (4)

- `nexora-hotbar-slot-selection-and-placement-identity`
- `nexora-native-ui-design-to-code`
- `nexora-native-ui-focus-navigation-contract`
- `nexora-native-ui-layout-scale-contract`

### Curated: nexora-world-safety (10)

- `nexora-save-lock-and-recovery`
- `nexora-world-backup-retention-policy`
- `nexora-world-chunk-boundary-transaction`
- `nexora-world-command-permission-recheck`
- `nexora-world-integrity-audit-report`
- `nexora-world-migration-cross-mod-validation`
- `nexora-world-region-access-boundary`
- `nexora-world-region-recovery-scan`
- `nexora-world-save-privacy-export`
- `nexora-world-snapshot-consistency`

### Curated: nexora-worldgen-streaming (22)

- `nexora-biome-climate-weight-blending`
- `nexora-chunk-lighting-propagation-budget`
- `nexora-chunk-mesh-version-gate`
- `nexora-chunk-priority-fairness`
- `nexora-chunk-streaming-hysteresis`
- `nexora-climate-lattice-sample-reuse`
- `nexora-climate-multiscale-field-coherence`
- `nexora-stream-handle-pin-lifecycle`
- `nexora-streaming-byte-budget-post-activation-shedding`
- `nexora-streaming-failed-operation-budget-accounting`
- `nexora-streaming-interest-candidate-amplification`
- `nexora-streaming-interest-source-admission`
- `nexora-streaming-io-backpressure`
- `nexora-streaming-long-session-residency-soak`
- `nexora-streaming-report-outcome-classification`
- `nexora-world-reproduction-key-completeness`
- `nexora-worldgen-column-work-budget`
- `nexora-worldgen-crash-reproduction`
- `nexora-worldgen-density-boundary`
- `nexora-worldgen-feature-reservation`
- `nexora-worldgen-seed-compatibility`
- `nexora-worldgen-stage-contract`

### Curated: voxel-world-engineering (1)

- `nexora-greedy-meshing-surface-preservation`

### Rust & platform engineering (1)

- `nexora-crate-boundary-audit`

## Coverage review: next areas to investigate

These are **review candidates**, not confirmed missing features. Search the catalog and current NEXORA source/plans again before authoring new skills.

1. **Audio and accessibility depth:** the catalog has audio clock, device loss, spatialization, voice budget, and accessible UI skills; investigate end-to-end audio content pipelines, mixing, localization/subtitles, input remapping, and accessibility test automation.
2. **Multiplayer operations:** networking coverage exists for replication, reconnect, protocol, backpressure, interest, clock drift, and authority; investigate dedicated-server lifecycle, matchmaking/lobbies, moderation/anti-cheat threat modeling, latency compensation, and operational playbooks.
3. **Voxel simulation breadth:** existing skills cover meshing, lighting, streaming, world generation, fluids, physics and chunk boundaries; investigate block update scheduling, redstone-like logic at scale, liquid conservation, foliage/vegetation growth, erosion, caves, and cross-system simulation invariants.
4. **World content and progression:** existing coverage includes inventory, crafting cycles, item reachability, content registries, mods, and NPC/ecology planning; investigate quest/dialogue authoring, localization, economy exploits, progression pacing, procedural structures, and content validation pipelines.
5. **Player-facing production readiness:** investigate controller/gamepad parity, input rebinding, onboarding/tutorial flows, settings persistence, crash-safe user configuration, save UX, accessibility and telemetry consent.
6. **Build/release distribution:** existing skills cover artifact integrity, reproducibility, release channels and rollback; investigate Windows portable bundle validation, installer/upgrade/uninstall, signing, patch/delta delivery, offline launch, and low-spec hardware acceptance.
7. **Performance proof on target hardware:** connect memory, frame pacing, GPU, streaming and benchmark skills into repeatable acceptance profiles for the project's target PC and lower-spec machines. Do not substitute estimates for measured baselines.

## Rules for interpreting this inventory

- A skill is an instruction/workflow asset, not an implemented game subsystem.
- A skill can describe how to audit or implement a feature that is currently only planned.
- New skills must be narrow, evidence-backed, non-duplicative, and validated against both the source library and generated plugin bundle.
- Keep all NEXORA-specific skills in the All-Skills repository; do not place skills inside the NEXORA game repository.
