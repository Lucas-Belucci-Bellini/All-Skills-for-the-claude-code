# Draft-to-Candidate Preflight

## Purpose

`tools/preflight-repository-skill-draft-for-candidate.mjs` provides a fail-closed handoff check between a repository-skill draft specification and a later, separately operated candidate workflow. It reuses the draft validator instead of duplicating its field rules.

## Usage

```sh
node tools/preflight-repository-skill-draft-for-candidate.mjs path/to/draft-spec.json
node tools/preflight-repository-skill-draft-for-candidate.mjs path/to/draft-spec.json --output preflight-report.json
node tools/preflight-repository-skill-draft-for-candidate.mjs --self-test
```

A blocked draft prints a report and exits nonzero. With `--output`, the report is created exclusively; an existing file is not overwritten.

## Report contract

The report is deterministic and declares `candidate_preflight: passed|blocked`, while always keeping `approval: not-approved`, `candidate_created: false`, `candidate_gate_passed: false`, `canonical_skill_created: false`, and `canonical_counts_modified: false`. A successful preflight means only that the draft validator accepted the specification's structure and required declarations.

## Explicit non-goals

This tool does not assemble or write a candidate, run the candidate gate, promote a skill, update a manifest or bundle, or change counts. It cannot prove that evidence claims are true, source ranges support claims, licensing is compatible, or a semantic duplicate review was sound. Human inspection and the existing candidate workflow remain separate requirements.
