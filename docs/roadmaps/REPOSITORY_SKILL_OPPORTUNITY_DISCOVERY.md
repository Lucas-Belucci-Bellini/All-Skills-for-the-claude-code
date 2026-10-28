# Repository skill opportunity discovery

This tool is the first triage stage between repository inventory and candidate assembly. It combines a structural-only inventory with a manually curated pinned evidence manifest and emits *opportunity signals*, not skills.

## Usage

```sh
node tools/inventory-repository.mjs ./checkout --output inventory.json
node tools/discover-repository-skill-opportunities.mjs inventory.json evidence-manifest.json --minimum-files 2 --output opportunities.json
node tools/plan-repository-skill-review-batches.mjs candidates.json --batch-size 10 --output review-plan.json
```

The evidence manifest must use schema v1 and contain the `evidence` array emitted by the current manifest builder. Supply the same checkout/revision to inventory and evidence collection. The discovery stage reports source/revision metadata from the evidence manifest; it does not authenticate that local files correspond to that remote commit.

## Output

Each opportunity includes a rule identifier, a path/category signal, counts and sample paths, matching evidence claim IDs, uncovered file paths, missing category signals, and a proposed next inspection action. Current rules look for API contracts, tests, build/release, security/governance, developer tooling, data migrations, observability/debugging, and documentation/contributor workflows.

## Safety and limits

- Matching is based only on file paths and inventory categories. It does not inspect source contents or infer that the repository truly supports the workflow.
- Missing evidence is explicitly reported. A path match alone is never promoted to an evidence claim.
- No skills, candidate JSON records, canonical manifest entries, or count changes are produced.
- No network access or repository code execution occurs.
- Human review of pinned evidence, source revision, licensing, scope, triggers, and deduplication remains required before manually preparing a candidate spec.
