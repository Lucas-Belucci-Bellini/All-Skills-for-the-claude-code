# Evidence-Aware Draft Candidate Handoff

## Purpose

`tools/validate-repository-draft-candidate-handoff.mjs` checks the extra structural requirements needed before a draft specification is considered eligible for the separate candidate assembly workflow.

## Usage

```sh
node tools/validate-repository-draft-candidate-handoff.mjs path/to/draft-spec.json
node tools/validate-repository-draft-candidate-handoff.mjs path/to/draft-spec.json --output handoff-report.json
node tools/validate-repository-draft-candidate-handoff.mjs --self-test
```

The handoff requires the underlying draft preflight to pass, at least two evidence pointers, an explicit evidence kind for each pointer, and a non-empty human-reviewed license evidence reference. A blocked report exits nonzero. Output files are created exclusively and are not overwritten.

## Safety boundary

The report may say only `eligible-for-separate-human-controlled-assembly`; it never means approved or candidate-created. The tool does not create candidate JSON, invoke the candidate gate, modify canonical manifests, change generated bundles, or update skill counts. Evidence classification and license notes are declarations, not proof; humans must inspect the source at the pinned revision.
