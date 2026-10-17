# Research notes — 2,000-skill simulation, world and data expansion

**Date:** 2026-10-17  
**Base branch:** `feat/skills-expansion-1750-cross-domain-2026`  
**Working branch:** `feat/skills-expansion-2000-simulation-worlds-2026`  
**Related issue:** [#47](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/47)

The 1,750-skill draft has 40 Simulation/NPC/world-history skills, 30 Game content/save systems, 16 Networked games/determinism, and only 10 each in Geospatial UX, live public-data reliability and public-data provenance/privacy/ethics. OpenTelemetry Collector observability has 50. This batch increases depth in simulation and persistence while expanding small data-oriented categories.

| Domain | New skills | Focus |
|---|---:|---|
| Simulation, NPCs & world history | 50 | bounded agent decisions, memory/provenance, civilization history and economy invariants |
| Game content & save systems | 50 | schema migration, recovery, asset/content identity, packaging and integrity |
| Networked games & determinism | 50 | authoritative validation, replay, resync, protocol limits and fault simulation |
| Geospatial visualization & map UX | 25 | coordinate correctness, geometry, identity, query/render parity and accessible alternatives |
| Live public-data ingestion & reliability | 25 | watermarks, pagination, quotas, schema drift, idempotency and freshness |
| Public-data provenance, privacy & ethics | 25 | licensing, minimization, retention, uncertainty, attribution and takedown |
| OpenTelemetry Collector observability | 25 | configuration reload, loss/cost accounting, exporter failure and routing security |
| **Total** | **250** | **Draft inventory rises from 1,750 to 2,000** |

## Acceptance principle

Each skill specifies evidence, reproducible edge cases, bounded recovery, and the difference between a local/configuration check and runtime proof. Save and network workflows prioritize preserving user data and rejecting untrusted input. Public-data workflows do not assume that public visibility grants unlimited reuse.

## Required follow-up validation

Run in a clean checkout:

```sh
node tools/sync-skill-bundles.mjs --write
node tools/sync-skill-bundles.mjs --check
node tools/validate-skill-batch.mjs tools/skill-batch-manifests/2000.json
git diff --check
```

Then inspect Actions, review semantic duplicates and source/license obligations, and test representative skills against the target game/save versions, netcode harness, geospatial renderer, live provider or Collector. GitHub file consistency does not prove those environments have been exercised.
