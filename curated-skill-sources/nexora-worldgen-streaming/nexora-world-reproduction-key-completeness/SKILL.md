---
name: nexora-world-reproduction-key-completeness
description: "Audits NEXORA world reproduction keys for complete versioned inputs, canonical mod manifests, stable fingerprints and save/load reproducibility."
---

# NEXORA World Reproduction Key Completeness

## Purpose

Use this workflow when NEXORA must identify, compare, save, load, migrate or diagnose a world by the complete set of inputs that determine its logical contents. It focuses on the boundary between `WorldDescriptor`, `ReproductionKey`, content/mod configuration, persisted world metadata and the stable fingerprint.

This is narrower than changing a terrain algorithm or choosing a new generator version. Use `nexora-worldgen-seed-compatibility` for generator-upgrade behavior, `nexora-worldgen-stage-contract` for stage input/output design, and this workflow when the question is whether two builds/configurations truly describe the same reproducible world.

## Verified source boundary

The audited NEXORA snapshot is `92cc410999c05b0afcb8210c3d8bd4cdbec33d9e`. Re-check the active commit before relying on these observations:

- `engine/foundation/src/rng.rs` defines `ReproductionKey` with world seed, generator version, engine version, content version and a vector of `(mod_id, version)` pairs.
- `ReproductionKey::fingerprint()` sorts a clone of the mod pairs before hashing. It writes the seed, generator version, engine major/minor/patch, content version, mod count, then each mod ID and version.
- The fingerprint uses the project's stable `Fnv1a64` helper. `Fnv1a64::write_str` prefixes each string with its byte length, avoiding ambiguity such as concatenating `"ab"+"c"` versus `"a"+"bc"`.
- The hashing module explicitly describes FNV-1a as an identity fingerprint, not an integrity or tamper-resistance mechanism. Do not promote it into a security primitive.
- `engine/world/src/world.rs` exposes a `WorldDescriptor` containing ID, name, seed, generator version, chunk shape and vertical bounds. Its current `reproduction_key()` fills engine version from `ENGINE_VERSION`, fixes content version at `ContentVersion(1)`, and supplies an empty mod list.
- The current descriptor-to-key method does not pass the descriptor's shape/bounds or a world-configuration/dimension object into the key. The seed/reproducibility plan lists world configuration, content version, mod manifest and mod versions among reproduction inputs. Treat the difference as an explicit completeness question to resolve, not as proof that every omitted field already changes terrain.
- The RNG tests include a check that reordering two mod pairs does not change the fingerprint. The audited tests do not, by that test alone, prove persisted-key round trips, duplicate-mod rejection, every-field sensitivity or cross-build save compatibility.

These are source observations, not a claim that the complete reproduction manifest is already persisted or that every current world has a complete key.

## Required inputs

- Exact NEXORA commit, Rust toolchain and relevant world/save format versions.
- Current `WorldDescriptor`, `ReproductionKey`, RNG/hash implementation and all call sites.
- The authoritative list of inputs that can change generated or logical world state: seed, generator, engine, content, dimension/configuration, chunk shape/bounds, mod IDs/versions and any other generation-affecting settings.
- Save header/container schema and serialization/deserialization paths for reproduction metadata.
- Mod manifest source, ID/version validation rules and load-order semantics.
- Existing golden fingerprints, world fixtures, migration policy and compatibility matrix.

## Workflow

1. **Pin the implementation.** Record the exact NEXORA commit. Trace the descriptor constructor, `reproduction_key()`, fingerprint implementation, save writer/reader, world creation and mod/content registration. Search all call sites; do not assume the helper is persisted just because it exists.
2. **Build the input inventory.** List every value that can affect generated terrain, dimension state, content identity or deterministic world simulation. Classify each as immutable world identity, generator input, content/mod input, runtime-only metadata or deliberately excluded field. Give each exclusion a reason.
3. **Compare descriptor and key.** Map each descriptor/configuration field to the reproduction contract. Explicitly review name/ID, seed, generator version, chunk shape, vertical bounds, dimension, world configuration, content version and mod manifest. Include a field only when it is semantically part of reproduction; do not blindly hash display-only metadata.
4. **Define canonical mod identity.** Specify stable mod IDs, version representation, duplicate-ID policy, optional dependency behavior and whether load order is semantically meaningful. If load order is irrelevant, sort canonical pairs before fingerprinting; if it matters, encode the ordered dependency/load graph instead of silently sorting it away.
5. **Validate input before hashing.** Reject empty/invalid IDs, duplicate mod identities, ambiguous version strings and unsupported required content. Do not silently discard unknown mods or map missing content to unrelated registry entries.
6. **Preserve unambiguous encoding.** Use fixed-width, explicitly ordered numeric fields and length-prefixed strings or a canonical versioned serialization. Include a schema/version tag if the encoding itself may evolve. Never concatenate arbitrary strings without boundaries.
7. **Define field sensitivity.** Create paired fixtures where exactly one reproduction input changes. The canonical representation must change for every included field and remain unchanged for excluded presentation-only fields. Treat a 64-bit digest as a compact comparison key, not mathematical proof of equality.
8. **Pin deterministic behavior.** Keep golden vectors for the canonical bytes/fingerprint. Verify the same key produces the same result across supported platforms and builds; avoid `DefaultHasher`, randomized map iteration and locale-dependent formatting.
9. **Test mod-order semantics.** Permute the same unique mod set and confirm equal fingerprints when order is declared irrelevant. Change one mod ID or version and confirm the canonical key changes. Test duplicates, missing dependencies, invalid IDs and conflicting versions explicitly.
10. **Test save round trips.** Serialize the reproduction metadata, close the world, load it in a fresh process, and compare every field plus the canonical fingerprint. Verify older save versions follow an explicit migration or refusal policy rather than receiving today's defaults silently.
11. **Test compatibility decisions.** Compare same seed/different generator, same generator/different content, same mods/different versions, and same logical world under reordered mods. Decide whether each case is compatible, migratable or rejected, and make the decision visible in diagnostics.
12. **Keep authority boundaries clear.** In multiplayer, the server's validated reproduction manifest is authoritative. Clients compare their local manifest and receive a clear mismatch/refusal reason; they must not independently substitute content or regenerate divergent state.
13. **Review persistence and security limits.** Keep integrity checks separate from identity fingerprints. If tamper detection is required, use the save format's integrity/authentication mechanism rather than treating FNV as cryptographic protection.
14. **Document the contract.** Publish the canonical field order, normalization rules, serialization version, compatibility matrix, golden fixtures, migration behavior and known omissions. State exactly which checks were run and which remain proposals.

## Validation checklist

- [ ] Every generation-affecting input is inventoried and either represented or explicitly excluded with rationale.
- [ ] Descriptor, configuration and reproduction-key fields are reconciled.
- [ ] Generator, engine, content, dimension/configuration and mod version semantics are explicit.
- [ ] Mod IDs are canonical and duplicate/invalid identities are rejected.
- [ ] Mod ordering is either canonicalized or intentionally preserved according to dependency semantics.
- [ ] String encoding is length-prefixed or otherwise unambiguous.
- [ ] Every included field has a one-variable-at-a-time fingerprint sensitivity test.
- [ ] Presentation-only fields do not accidentally change world identity.
- [ ] Golden fingerprint vectors are stable across supported platforms.
- [ ] Save round trips preserve the complete reproduction metadata.
- [ ] Older metadata is migrated or refused explicitly; defaults do not silently rewrite history.
- [ ] Multiplayer mismatch diagnostics identify the differing contract field.
- [ ] FNV identity fingerprints are not represented as cryptographic integrity checks.
- [ ] Tests, migration simulations and cross-platform checks are reported with exact commands and outcomes.

## Required output

Return:

- Exact NEXORA commit and source paths inspected.
- A table of reproduction inputs, their owners, persistence locations and inclusion/exclusion decisions.
- The canonical mod manifest rules and duplicate/load-order policy.
- The canonical encoding field order and serialization version.
- Golden fingerprint vectors and field-sensitivity results.
- Save/load round-trip and legacy compatibility results.
- Multiplayer mismatch behavior and diagnostic examples.
- Exact tests/commands executed, skipped checks and unresolved risks.
- A decision: complete, complete with documented exclusions, migration required, or inconclusive.

## Boundaries and failure handling

- Do not change generator algorithms or generator versions as a substitute for fixing an incomplete reproduction key.
- Do not assume that a stable seed alone identifies a world.
- Do not silently default missing content/mod/configuration metadata when loading an old world.
- Do not sort mod entries if load order or dependency resolution changes semantics.
- Do not use a non-cryptographic fingerprint as proof of save authenticity.
- Do not claim a save round trip, cross-platform result or multiplayer compatibility test unless it was executed.
- This workflow specifies an audit and validation method. It does not change NEXORA runtime code or claim that the currently observed key already includes every planned input.

## Trigger examples

- **Positive:** Two worlds share a seed but differ in content packs, mods or world configuration and need a reproducible identity comparison.
- **Positive:** A save/load path needs to preserve a canonical world reproduction manifest across engine upgrades.
- **Positive:** Mod load order changes but the logical mod set should identify the same world.
- **Positive:** Reviewers need to determine whether descriptor fields omitted by `World::reproduction_key()` can affect generated or logical world state.
- **Negative:** The task only changes terrain noise or generator algorithms; use the dedicated generator compatibility workflow.
- **Negative:** The task only optimizes repeated climate lattice sampling without changing world identity.
- **Negative:** The task needs cryptographic save authentication rather than deterministic world identity.
