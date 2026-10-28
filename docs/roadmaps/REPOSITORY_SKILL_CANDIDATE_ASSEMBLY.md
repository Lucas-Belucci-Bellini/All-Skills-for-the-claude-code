# Repository-to-skill candidate assembly

This tool joins three manually produced inputs: a candidate specification, a pinned repository evidence manifest, and a structural-only repository inventory. It emits a candidate JSON record compatible with `validate-repository-skill-candidate.mjs`.

## Inputs

1. **Candidate spec** — JSON with `schema_version: 1`, candidate/source metadata, the `skill` object, `deduplication`, a `decision`, `review_notes`, and `evidence_refs` containing at least two IDs from the evidence manifest.
2. **Evidence manifest** — output of `build-repository-evidence-manifest.mjs`.
3. **Inventory** — output of `inventory-repository.mjs` for the same local checkout.

The candidate source URL, immutable revision, and inspection date must match the manifest. Each evidence path must exist in the inventory and its file SHA-256 must match. The tool converts claim IDs into exact path/line references and uses the manifest's claim text and evidence kind without inventing new claims.

## Example

```sh
node tools/inventory-repository.mjs ./checkout --output /tmp/inventory.json
node tools/build-repository-evidence-manifest.mjs ./checkout ./evidence-input.json --output /tmp/evidence.json
node tools/assemble-repository-skill-candidate.mjs ./candidate-spec.json /tmp/evidence.json /tmp/inventory.json /tmp/candidate.json
node tools/validate-repository-skill-candidate.mjs /tmp/candidate.json
```

Use the exact CLI argument order supported by each script version; inspect `--help`/usage output before adapting an existing automation.

## Guardrails

- Assembly is not skill generation or publication. It does not write to the canonical catalog, manifests, or skill counts.
- It forcibly downgrades any requested `ready-for-human-review` decision to `hold`; only `draft`, `hold`, or `reject` survive assembly.
- It requires at least two distinct manifest claim IDs and checks source revision and inventory hashes.
- Evidence pointers stay marked `needs-human-inspection`; hashes detect local byte differences but do not authenticate the remote commit or prove claims.
- The existing candidate validator runs against the assembled temporary JSON before output is written.
- No network access and no repository code execution are performed by the assembly tool itself. It invokes only this repository's candidate validator as a subprocess.
- License compatibility, exact/semantic deduplication, and human acceptance remain manual gates.
