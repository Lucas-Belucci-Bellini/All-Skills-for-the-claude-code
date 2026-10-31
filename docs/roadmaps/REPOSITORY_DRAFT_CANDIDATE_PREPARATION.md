# Draft Candidate Assembly Preparation

## Purpose

`tools/prepare-repository-draft-candidate-spec.mjs` converts an eligible human-authored draft specification into an intermediate input for the existing repository candidate assembly tool.

## Usage

```sh
node tools/prepare-repository-draft-candidate-spec.mjs path/to/draft-spec.json
node tools/prepare-repository-draft-candidate-spec.mjs path/to/draft-spec.json --output assembly-preparation.json
node tools/prepare-repository-draft-candidate-spec.mjs --self-test
```

The tool requires the evidence-aware handoff validator to pass. It maps pinned repository metadata, skill triggers/workflow/output contract, evidence claim IDs, license declaration, and duplicate-review declarations into the input schema used by the existing assembly tool. Unknown duplicate reviews remain `not-run`; the candidate decision is always forced to `hold`.

## Next step

A human should inspect the source at the pinned revision, verify that claim IDs match the evidence manifest, and run the existing `assemble-repository-skill-candidate.mjs` with the matching evidence manifest and structural inventory. That tool independently checks metadata alignment, evidence claim IDs, inventory paths and file hashes, and candidate schema.

## Safety boundaries

This tool creates only an intermediate assembly-input report. It does not create a candidate record, approve a skill, run the candidate gate, alter canonical manifests/bundles, or change counts. License evidence and duplicate declarations remain unverified human assertions until reviewed.
