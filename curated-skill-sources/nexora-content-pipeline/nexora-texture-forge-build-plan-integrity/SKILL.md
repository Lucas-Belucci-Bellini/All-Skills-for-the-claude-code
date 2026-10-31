---
name: nexora-texture-forge-build-plan-integrity
description: "Defines safe, reproducible NEXORA Texture Forge builds by preflighting material definitions, recipes, seeds, policies, and external albedo art sets before generated output is written."
---

# NEXORA Texture Forge Build Plan Integrity

## Purpose

Use when authoring, reviewing, debugging, or extending a NEXORA Texture Forge build plan, especially for large material sets or external albedo art sets.

This workflow owns complete build-plan preflight, exact art-set coverage, deterministic seeds, policy enforcement, content verification, and honest build-result handling. It does not replace generic asset dependency graphs, provenance/license policy, material schema migration, or runtime resource publication.

## Reuse before creating

- `nexora-asset-import-dependency-graph` for dependency edges and incremental rebuild selection.
- `nexora-content-provenance-manifest` for provenance and distribution/license records.
- `nexora-asset-import-golden-tests` for importer regression fixtures.
- `nexora-texture-format-fallback` and `nexora-texture-atlas-fragmentation` for format and atlas behavior.
- `nexora-content-registry-atomic-publication` for runtime registry publication, not Forge build atomicity.
- `nexora-pbr-material-render-bridge` for the separate material-map-to-renderer contract.

## Verified NEXORA snapshot

Inspected NEXORA `main` at commit `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `tools/texture-forge/src/plan.rs` blob `248e902c88b05eb289c3f2b07461300259d1bbaf`.
- `tools/texture-forge/src/albedo_set.rs` blob `7ebcad38fedb4fdbc9fc0dd3cf565d841dfe327a`.
- `tools/texture-forge/src/main.rs` blob `78cddace64d6d16b4a6a36cb53ef51283a9c5810`.
- `tools/texture-forge/src/forge.rs` blob `0d9481e592ab94447a43e793da6d4290662b272e`.
- `tools/texture-forge/src/recipe_book.rs` blob `678431158427a105b4c0f5029e45269dd4745558`.
- Also inspected `content/materials/README.md`, `content/recipes/README.md`, and `docs/plans/TEXTURE FORGE.md`.

Snapshot facts:

- `nexora-texture-forge build` consumes a checked-in plan pointing to existing definition files. It differs from `batch`, whose manifest declares materials inline.
- Plan schema is 1; its material list must be non-empty and is capped at 65,536 entries.
- The plan owns the build seed. Per-entry seeds may override it; `null` inherits the plan seed. Seeds use `0x`-prefixed hexadecimal text, up to 16 digits.
- A plan can pin resolution and allowed optional map roles. First generation is 16×16 with albedo only; albedo is required and is not listed as optional.
- Plan loading collects per-entry problems: invalid paths, unreadable/invalid definitions, duplicate identifiers, naming violations, and policy violations. Any problem prevents the plan from running.
- Recipes for entries without external albedos are resolved before generation. A missing named recipe prevents all plan outputs from being generated.
- An optional art set replaces recipe generation for the whole plan. It must cover every planned material and contain no extra material.
- Art-set files must remain beneath the art-set directory, match recorded SHA-256, be at most 1 MiB each, decode as PNG, match material resolution, and obey opaque-alpha requirements for Opaque materials.
- An art set supplies albedo only. A material requesting additional optional maps cannot silently use it.
- The Forge processes valid entries in plan order. Per-entry failures/refusals after execution starts are recorded while remaining entries are attempted. The CLI writes the resource index only when the aggregate report succeeds.
- `--force` is explicit replacement consent. Changed appearance is not silently treated as unchanged; successful replacement advances the material revision.
- A non-reproducible external backend cannot claim procedural originality or shippable status merely because its PNG hash is valid.

These are pinned-snapshot observations, not permanent guarantees. Recheck current source before changing schemas, path policy, hashes, or output lifecycle.

## Required inputs

- Pinned NEXORA commit and current plan, definition, recipe, and art-set schemas.
- Exact build command, output root, Forge version, generator/backend, and feature flags.
- Complete plan and every referenced definition, recipe, art-set record, and image.
- Expected resolution/map policy, seed ownership, provenance class, release status, and replacement policy.
- Existing generated outputs and resource index when validating a repeat build.

## Workflow

1. Distinguish a checked-in build plan from an inline batch manifest.
2. Pin all definitions, recipes, art-set records, seeds, generator versions, and output policies.
3. Preflight every plan entry and collect all path, identity, schema, and policy errors before generation.
4. Resolve all required recipes and verify exact external art-set coverage before the first write.
5. Execute the validated plan in order, recording every per-entry status and failure.
6. Publish the resource index only after the aggregate build report succeeds.
7. Rebuild from a clean output root and compare definitions, traces, maps, and index bytes.

### 1. Distinguish plan, batch manifest, and authored definitions

- Use a build plan for a reproducible set of already-authored definition files.
- Use a batch manifest only when intentionally declaring materials inline from defaults.
- Keep authored definitions and recipes in checked-in source directories; generated material output belongs under the configured generated-assets root.
- Do not confuse the plan's source list with the runtime resource index.

### 2. Pin every input that affects the result

- Keep the plan, definitions, recipes, and art-set metadata under version control.
- Put the default seed in the plan; use per-entry seeds only for deliberate exceptions.
- Do not pass a shell-only seed to `build`; the CLI rejects `--seed` because the plan owns reproducibility.
- Record Forge/generator version and backend in resulting provenance.
- Treat recipe edits as appearance changes and verify the recipe fingerprint participates in write comparison.

### 3. Validate the whole plan before generation

- Reject unknown fields and unsupported schema versions.
- Confirm the plan is non-empty and within the entry cap.
- Resolve definition paths relative to the plan directory; reject absolute paths, root/prefix components, and parent-directory traversal.
- Parse every definition, validate identifier/path naming, and detect duplicate material identifiers.
- Collect every entry problem so one bad file does not hide the others.
- Apply pinned resolution and optional-map policy to every definition.
- If any plan problem exists, stop before generation; never generate a valid-looking prefix of an invalid plan.

### 4. Resolve recipes before the first write

- For every entry without an external albedo, resolve its named recipe through the loaded recipe book.
- Verify recipe identifier/path agreement and category compatibility with the material.
- Preserve current recipe schema and range rules; do not invent values or silently fall back when a material explicitly names a recipe.
- If any recipe is unresolved, stop before any material output is written.

### 5. Validate external albedo art sets as complete replacements

- Treat an art set as a whole-set replacement, not a partial patch with silent recipe fallback.
- Require exactly one albedo per planned material and no extra identifiers.
- Verify each recorded SHA-256 against bytes read from disk.
- Reject files outside the art-set directory, oversized files, invalid PNGs, wrong dimensions, and opaque materials containing any non-opaque texel.
- Confirm the material requests no optional map an albedo-only set cannot supply.
- Preserve backend, source file, source hash, generator identity, and generator hash in the imported material trace.
- Do not claim reproducible or original content from metadata alone; verify that the named backend/generator can reproduce the output under the applicable policy.

### 6. Run and interpret the build honestly

- Run entries in plan order and preserve each plan identity/seed association in the report.
- Distinguish `written`, `unchanged`, `replaced`, `restored`, `refused`, and `failed`.
- An unchanged deterministic second pass should avoid rewriting identical outputs.
- Use `--force` only after reviewing changed appearance/provenance inputs and accepting the revision transition.
- A valid preflight is not a transaction over all output files: a per-entry failure after execution begins is reported while remaining entries are attempted.
- Require aggregate success before writing/publishing the resource index. Never expose an index that advertises a half-generated set.
- Preserve failure details; do not label a partially failed run successful because most entries were produced.

### 7. Verify reproducibility and release evidence

- Re-run the same plan in a clean output root and compare definitions, traces, map bytes, and index contents.
- Re-run an unchanged plan against existing outputs and confirm no unnecessary rewrites.
- For external albedos, verify source hashes and generator hashes independently of the output fingerprint.
- Test procedural and external-art-set paths separately.
- Report plan validation, generation, PNG validation, resource indexing, and client visibility as separate evidence stages.
- A successful Forge build does not prove a material is registered as a block surface or visible in a running client.

## Validation scenarios

| Scenario | Required invariant |
|---|---|
| Same plan built twice | First run writes; unchanged second run does not rewrite identical outputs. |
| Entry seed omitted/supplied | It inherits the plan seed or uses its own valid 64-bit hexadecimal seed. |
| Invalid seed | Plan is rejected; no output is written. |
| Duplicate material identifier | Duplicate and first claimant are identified; build is blocked. |
| Invalid definitions | All plan problems are reported before generation. |
| Path contains `..` or absolute prefix | Access is rejected as outside the plan directory. |
| Policy mismatch | Resolution and optional-map violations are both reported. |
| Missing named recipe | Entire build is blocked before the first material output. |
| Art set omits a planned material | Build is blocked; no silent procedural fallback. |
| Art set has an extra material | Build is blocked; unused art is not accepted. |
| Albedo hash or bytes differ | Import is rejected. |
| Opaque material has transparent pixels | Import is rejected; Cutout may retain alpha holes. |
| External backend is not reproducible | Provenance cannot claim original/shippable status. |
| Entry fails during execution | Failure is reported, later entries are attempted, and index is not published. |
| Forced appearance replacement | Revision transition is explicit and traceable. |

## Existing test anchors in the inspected source

Recheck names and behavior before relying on them. These tests were present in the pinned snapshot:

From `plan.rs`:
- `a_build_generates_every_entry_and_a_second_pass_changes_nothing`
- `the_plan_seed_is_used_unless_an_entry_names_its_own`
- `every_problem_is_reported_and_nothing_is_generated`
- `the_first_generation_policy_is_sixteen_square_and_albedo_alone`
- `a_malformed_plan_is_an_error_not_a_plan`
- `an_entry_with_an_unknown_field_is_a_problem_not_a_silent_skip`
- `a_refusal_during_the_run_is_reported_and_the_run_continues`
- `a_missing_recipe_stops_the_build_before_anything_is_written`

From `albedo_set.rs`:
- `a_verified_albedo_becomes_the_materials_and_says_where_it_came_from`
- `a_tampered_file_a_transparent_texel_and_a_missing_material_are_refused`
- `a_set_that_is_not_reproducible_cannot_claim_to_be_original`
- `a_malformed_set_is_an_error_not_a_set`

These names were source-inspected; this skill authoring task does not claim the NEXORA test suite was executed.

## Validation checklist

- [ ] Plan, definitions, recipes, and art-set inputs are pinned and reviewable.
- [ ] Schema, unknown fields, entry count, and non-empty requirements are checked.
- [ ] All paths remain within declared source directories.
- [ ] Duplicate identifiers and every per-entry problem are reported before generation.
- [ ] Seed ownership is explicit and reproducible from the checked-in plan.
- [ ] Policy is applied consistently to every definition.
- [ ] All named recipes resolve before any output is written.
- [ ] Art set exactly covers the plan with no duplicate/extra/missing material.
- [ ] SHA-256, file size, PNG decode, dimensions, and alpha semantics are validated.
- [ ] Imported provenance preserves source and generator evidence.
- [ ] Per-entry execution failures are not confused with preflight failures.
- [ ] Resource index is written only after aggregate build success.
- [ ] Repeat-build idempotence and forced revision behavior are tested.
- [ ] Runtime registration and visual presentation are validated separately from Forge output.

## Required output

Produce a Texture Forge build-integrity report containing the pinned commit; plan schema and entry count; definition/recipe inventory; seed and policy summary; duplicate/path/policy findings; art-set coverage and hash verification; generator/backend reproducibility classification; per-entry result tally; index publication result; exact commands and test results; and unresolved risks. State clearly whether the result is preflight-valid, generation-successful, index-published, runtime-registered, and visually verified.

## Boundaries and failure handling

- Do not describe the plan as an atomic filesystem transaction; it is full-input preflight followed by per-entry execution.
- Do not start generation when the plan has any collected problem or unresolved named recipe.
- Do not accept partial art-set coverage or silently fall back to recipes for missing entries.
- Do not infer reproducibility from a valid hash; hashes prove byte identity, not generator reproducibility.
- Do not treat successful Forge output as proof of runtime registration or in-game visibility.
- Do not use `--force` as a routine way to bypass appearance-change review.
- Do not claim the NEXORA test anchors ran unless fresh test output proves it.

## Trigger examples

- **Positive:** Create or review a checked-in Texture Forge build plan for a large authored material set.
- **Positive:** Replace procedural recipe output with a complete, hash-verified external albedo art set.
- **Positive:** Diagnose a duplicate ID, policy violation, missing recipe, or art-set mismatch.
- **Positive:** Verify deterministic repeat builds and safe publication of the runtime resource index.
- **Negative:** The task only changes generic asset dependency edges; use `nexora-asset-import-dependency-graph`.
- **Negative:** The task only audits licenses or upstream origin records; use `nexora-content-provenance-manifest`.
- **Negative:** The task only changes runtime texture loading, atlas layout, or material rendering; use the corresponding runtime/rendering workflow.
