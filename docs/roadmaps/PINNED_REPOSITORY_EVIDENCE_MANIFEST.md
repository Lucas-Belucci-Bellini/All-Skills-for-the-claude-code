# Pinned repository evidence manifest

## Purpose

`tools/build-repository-evidence-manifest.mjs` validates a manually curated evidence map against a local checkout and emits stable pointers for candidate-skill review. It is the bridge between a structural inventory and a claim about what a repository actually implements.

## Input format

Create a JSON file with `schema_version: 1`, a `repository` object, and one or more `claims`.

```json
{
  "schema_version": 1,
  "repository": {
    "url": "https://github.com/owner/project",
    "revision": "0123456789abcdef0123456789abcdef01234567",
    "inspected_at": "2026-10-28"
  },
  "claims": [
    {
      "id": "export-command-output",
      "claim": "The documented export command emits a JSON report.",
      "path": "src/export.ts",
      "start_line": 12,
      "end_line": 28,
      "kind": "source"
    }
  ]
}
```

Replace the example URL, revision, claim, path, and line range with values verified from the actual repository. The commit must be a full 40-character SHA; moving refs such as `main` are rejected.

Allowed evidence kinds are `source`, `test`, `documentation`, `example`, and `issue`. Each claim should be narrow enough to verify. Keep line ranges to 80 lines or fewer.

## Usage

```bash
node tools/build-repository-evidence-manifest.mjs /path/to/checkout claims.json
node tools/build-repository-evidence-manifest.mjs /path/to/checkout claims.json --output evidence-manifest.json
node tools/build-repository-evidence-manifest.mjs --self-test
```

The output records repository identity supplied by the reviewer, source path, line range, claim, evidence kind, file SHA-256, excerpt SHA-256, and `needs-human-inspection` status. It does not include source excerpts. Hashes make it possible to detect later changes to the selected bytes, but do not authenticate the remote revision or prove that the claim is true.

## Safety and limits

- No network access and no execution of repository code.
- Only regular files inside the local checkout are accepted; path traversal and symlink escapes are rejected.
- Evidence files are limited to 2 MB; excerpts are limited to 80 lines.
- The tool cannot independently confirm that the local checkout matches the stated commit SHA.
- The manifest records reviewer-supplied claims; it does not infer capabilities from filenames or hashes.
- Every pointer remains marked `needs-human-inspection`. A valid manifest is not a license decision, a duplicate check, a security review, or approval to publish a skill.
- The output exposes paths, claims, and hashes. Review it before sharing outside the project.

## Candidate workflow

1. Generate a structural inventory of the pinned checkout.
2. Inspect the actual code, tests, and documentation behind each proposed claim.
3. Curate narrow evidence claims with exact line ranges.
4. Build and review the evidence manifest.
5. Use only verified evidence pointers in the candidate record.
6. Run the candidate validator and complete license and semantic duplicate review.
7. Keep the candidate in draft/hold until a human reviewer approves it.

Never count evidence records as skills. A source file may support a claim, but it does not automatically establish that a reusable skill is useful or distinct.
