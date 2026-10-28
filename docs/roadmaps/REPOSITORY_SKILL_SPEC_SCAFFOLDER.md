# Repository Skill Draft Specification Scaffolder

## Purpose

`tools/scaffold-repository-skill-spec.mjs` creates a **draft-only specification shell** for one manually selected opportunity discovered by `discover-repository-skill-opportunities.mjs`. It does not turn file paths into claimed capabilities and deliberately leaves skill content as TODOs for a human author.

## Usage

```sh
node tools/scaffold-repository-skill-spec.mjs discovery.json evidence-manifest.json api-contracts --claim-ids route-definition,api-doc --output api-contracts-draft.json
```

- The discovery report and evidence manifest must agree on repository URL, full commit SHA, and inspection timestamp.
- The opportunity ID must exist in the report.
- At least one explicit evidence claim ID must be supplied; each must be listed for that opportunity and exist in the pinned manifest with a valid line range.
- Output uses exclusive creation (`wx`) when `--output` is provided, preventing accidental overwrite.

## Safety and quality gates

The artifact is marked `draft-needs-human-authoring-and-review`, approval is `not-approved`, and content fields remain TODOs. License, exact-duplicate, and semantic-duplicate review remain unverified. The scaffolder does not run source code, access the network, invent evidence, create canonical skills, update catalog counts, or declare a candidate ready for review.

Before converting a draft into a candidate, a human must inspect each source range at the pinned revision, write narrow and testable workflow content, verify license/provenance, and perform exact and semantic deduplication. A file path or evidence pointer is not proof that a proposed workflow is correct.
