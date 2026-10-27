# First Maintenance Audit — 2026-10-27

## Purpose

Record the first verified maintenance pass for the unified skill library and define a small, reviewable sequence of follow-up work. This document is an audit plan, not evidence that validation commands or Claude Code installation have passed.

## Repository state inspected

- Default branch: `main`.
- Repository guidance: `AGENTS.md` requires skills under `.agents/skills/<skill-name>/`, a `SKILL.md` entrypoint, synchronized `README.md` and `README.ja.md`, and a feature branch plus pull request.
- The root README describes a 1,500-skill draft and explicitly says runtime integration, source provenance, and license review are not complete.
- `SKILL_GROWTH_ROADMAP.md` sets a 2,500-skill planning ceiling and says quality and distinct canonical identities take precedence over hitting a count.
- `tools/sync-skill-bundles.mjs` is the generation path for the plugin bundle and catalogs. Generated plugin copies should not be hand-edited.
- The collection plugin README says the repository should remain private until provenance and redistribution terms have been reviewed. Repository metadata currently reports public visibility; this audit does not change visibility.

## Findings and priorities

### P0 — Establish trustworthy release gates

1. Run `bash tools/check-readme-skills.sh` in a clean checkout and record the actual result.
2. Run `node tools/sync-skill-bundles.mjs --check` and inspect any drift before considering `--write`.
3. Validate catalog JSON parsing, catalog counts, manifest references, and source-to-generated-bundle parity.
4. Record checks that cannot be run in this environment as **not verified**, never as passing.

### P1 — Provenance, licensing, and safety

1. Inventory each imported skill source, upstream repository, license, attribution, and redistribution permission.
2. Flag unknown or incompatible license terms for human review; do not infer permission from public availability.
3. Review scripts and supporting files for secrets, destructive commands, unsafe network access, and untrusted input handling.
4. Keep runtime credentials and private user data out of skills, logs, fixtures, and generated bundles.

### P1 — Skill quality and routing

1. Audit new skills for valid frontmatter, unique canonical names, specific triggers, required inputs, outputs, verification, and recovery steps.
2. Test both positive routing examples and nearby negative examples to reduce accidental activation.
3. Compare exact content fingerprints and semantic scope; aliases, generated copies, and near-duplicates do not count as new skills.
4. Prefer correcting or retiring weak/overlapping skills over expanding the headline count.

### P2 — Agent and multi-agent workflows

1. Document the supported agent roles, handoff inputs/outputs, shared context boundaries, and failure behavior.
2. Ensure agents cannot claim a test, repository mutation, or external action succeeded without tool evidence.
3. Add bounded retries, explicit stop conditions, and human approval before destructive or irreversible actions.
4. Keep provider-specific runtime integrations separate from portable skill instructions; label unimplemented integrations clearly.

### P2 — Developer experience

1. Add a concise contributor workflow for authoring one skill, validating it, regenerating bundles, and opening a PR.
2. Ensure CI checks the cheapest relevant invariants first and gives actionable failure messages.
3. Add a release checklist covering provenance, catalog parity, generated diff review, and clean-install/discovery checks.

## Proposed execution sequence

- [ ] Inspect existing CI workflows and test scripts before changing them.
- [ ] Run the current repository validation scripts and capture observed results.
- [ ] Fix only confirmed failures in a focused follow-up commit.
- [ ] Audit one representative sample from authored, imported, and agent-workflow skill groups.
- [ ] Prepare a provenance/licensing inventory and identify unresolved items.
- [ ] Open a draft PR with exact checks performed, failures, and unverified items.

## Acceptance criteria

- Every reported check includes its actual command and observed outcome.
- Generated files are changed only through the documented sync process.
- No direct commits to `main`, no merge without review, and no repository visibility changes as part of this audit.
- No skill-count claim is increased unless canonical identities and generated parity are verified.
- Remaining risks and unverified integration work are visible to maintainers.

## Scope and limitations

This first pass inspected repository metadata and the root guidance, roadmap, catalog, plugin README, and sync script. It did not execute a clean checkout, run shell/Node tests, install the plugin in Claude Code, validate every skill, or complete third-party license review. Those activities remain pending until actually performed.
