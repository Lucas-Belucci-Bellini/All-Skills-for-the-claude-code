# Repository Candidate Preassembly Audit

## Purpose

The preassembly audit checks consistency between a preparation report, its pinned evidence manifest, and the structural inventory before the existing candidate assembly command is run.

## Usage

```sh
node tools/audit-repository-candidate-preassembly.mjs preparation-report.json evidence-manifest.json inventory.json
node tools/audit-repository-candidate-preassembly.mjs --self-test
```

The audit verifies repository URL, immutable revision, inspection timestamp, referenced claim IDs, evidence kinds, evidence-to-inventory paths, and file hashes. It also rejects duplicate/missing claim references, altered decisions, or preparation reports that claim approval or canonical mutations.

## Result semantics

- `consistent-for-existing-assembly-tool`: consistency checks passed; continue with the existing assembly tool and its candidate validator.
- `blocked`: fix the listed metadata/evidence/inventory mismatch before proceeding.

## Boundaries

This tool does not create a candidate, run the candidate gate, approve licensing, prove the truth of evidence claims, determine semantic originality, or modify canonical manifests/counts. A successful audit is not approval; human review remains mandatory.
