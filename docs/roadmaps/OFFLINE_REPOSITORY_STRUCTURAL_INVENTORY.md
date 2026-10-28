# Offline repository structural inventory

## Purpose

`tools/inventory-repository.mjs` creates a deterministic structural snapshot of a local repository so the repository-to-skill workflow can start from inspectable evidence instead of guessing capabilities.

## Usage

```bash
node tools/inventory-repository.mjs /path/to/local/checkout
node tools/inventory-repository.mjs /path/to/local/checkout --output inventory.json
node tools/inventory-repository.mjs --self-test
```

The tool uses Node.js built-ins only. It does not access the network, execute repository code, install dependencies, or emit file contents. The JSON records relative path, broad structural category, extension, byte size, and SHA-256 digest for each included regular file.

## Categories

The inventory marks likely readme files, license/notices, governance docs, CI workflows, tests, documentation, package manifests, tooling configuration, source-code files, and other files. These labels are heuristics for triage, not a claim that a repository's tests work or that its source is safe.

## Exclusions and privacy

Common generated/dependency directories are skipped, including `.git`, `node_modules`, `vendor`, `target`, `dist`, `build`, caches, and virtual environments. Symlinks and non-regular files are not traversed. Hidden configuration directories such as `.github` and `.claude` are included unless their names are on the skip list.

The output includes paths, file sizes, and content hashes. Those can still reveal repository structure; review the JSON before sharing it outside the project. Hashes support change comparison but do not prove authorship, integrity against a trusted signature, license compatibility, or code quality. The timestamp and file traversal reflect the local checkout at the time of the run.

## How it feeds skill creation

1. Pin and record the repository revision separately.
2. Generate and inspect the structural inventory.
3. Select relevant files for manual or automated evidence extraction.
4. Record each claim against a concrete source reference and pinned revision.
5. Run the candidate gate in `tools/validate-repository-skill-candidate.mjs`.
6. Perform license/provenance and semantic duplicate review before approving any skill.

The inventory alone must never be used to mark a skill candidate as release-ready. Do not count inventory entries as skills or treat detected source files as proof of a capability.
