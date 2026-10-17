# Research notes — 1,750-skill cross-domain expansion

**Date:** 2026-10-17  
**Base branch:** `feat/skills-expansion-1500-projete-cross-agent-2026`  
**Working branch:** `feat/skills-expansion-1750-cross-domain-2026`  
**Related issue:** [#46](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/46)  

## Basis for the distribution

A review of the 1,500-skill draft catalog counted 230 skills under Minecraft & modpack engineering, while Engine architecture & runtime had 100, Rust & platform engineering 39, Accessibility & inclusive UX 8, and Documentation & technical knowledge systems 8. This batch diversifies the collection instead of adding more near-neighbor Minecraft or ProjectE entries.

| Domain | New skills | Primary quality focus |
|---|---:|---|
| Engine architecture & runtime | 50 | state/resource lifecycle, persistence, determinism, rendering and recovery |
| Rust & platform engineering | 50 | ownership/concurrency, CLI/process boundaries, protocol validation, cross-build and toolchain evidence |
| Release, tests & repository quality | 50 | provenance, artifact integrity, CI permissions, rollout/rollback and reproducible tests |
| Supabase & PostgreSQL platform engineering | 25 | authorization boundaries, tenant isolation, migration/restore and operations |
| Vercel AI SDK & agent reliability | 25 | tool-call safety, streaming, bounded loops, evaluation and retrieval access controls |
| Accessibility & inclusive UX | 25 | keyboard/screen-reader tasks, dynamic state, zoom, contrast and motion preferences |
| Documentation & technical knowledge systems | 25 | runnable runbooks, source-of-truth traceability, example validation and locale parity |
| **Total** | **250** | **Catalog grows from 1,500 to a 1,750-skill draft** |

## Acceptance model

Every entry is an actionable workflow, not a claim that implementation has been performed. Each defines required evidence, a bounded workflow, a validation checklist, a required artifact, failure boundaries, and positive/negative triggers. Source files are canonical; plugin paths are exact copies. The catalog retains 126 imported entries and marks 1,624 entries as original curated skills.

## Pending evidence

The GitHub file/tree changes do not prove that local sync or validation commands pass. After checkout, run:

```sh
node tools/sync-skill-bundles.mjs --write
node tools/sync-skill-bundles.mjs --check
node tools/validate-skill-batch.mjs tools/skill-batch-manifests/1750.json
git diff --check
```

Also review semantic overlap and source provenance/license obligations; inspect the actual Actions run; test representative skills in the target Rust toolchain, database staging environment, agent provider and accessibility setup. Do not claim CI, deployment, provider compatibility, production safety or conformance without observed evidence.
