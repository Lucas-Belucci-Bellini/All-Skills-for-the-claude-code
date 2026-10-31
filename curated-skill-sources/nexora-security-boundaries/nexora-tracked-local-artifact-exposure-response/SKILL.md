---
name: nexora-tracked-local-artifact-exposure-response
description: "Audits and remediates machine-local or sensitive artifacts already tracked in NEXORA Git history using metadata-first triage, explicit ownership approval, preventive gates, and coordinated history handling."
---

# NEXORA Tracked Local Artifact Exposure Response

## Purpose

Use when a NEXORA repository audit finds machine-local state, assistant/tool databases, caches, runtime artifacts, credentials, personal data, or other files that appear to have been committed.

This workflow treats tracked local artifacts as a repository security and provenance incident until classified. It is intentionally metadata-first: do not open, copy, print, upload, or publish potentially sensitive file contents merely to determine whether they are present.

This skill is distinct from secret scanning, log redaction, filesystem sandboxing, and ordinary ignore-file maintenance. It owns the safe process for already-tracked artifacts and their Git history.

## Reuse before creating

- `nexora-secret-redaction-config-contract` for preventing secret values from entering configuration and diagnostics.
- `nexora-security-regression-corpus` for security regression test design.
- `nexora-filesystem-sandbox-boundary` for runtime path containment and filesystem trust boundaries.
- `nexora-diagnostic-log-redaction` for safe diagnostic output.
- `secrets-scan-remediation` and `release-secret-scan-baseline-expiration` for actual secret scanning and exception governance.

Do not substitute a generic secret scanner for provenance review of tracked local databases, caches, worktrees, or machine state.

## Verified NEXORA snapshot

Inspected NEXORA `main` at commit `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `.gitignore` already contains narrow rules for `/.claude/data/`, `/.claude/worktrees/`, `/.anchor/`, and `/%SystemDrive%/`.
- The comments explicitly warn that ignore rules do not untrack copies already committed; a tracked copy requires a separate index/history decision.
- `docs/plans/NEXORA SECURITY THREAT MODEL.md` treats persistence inputs, clients, mods, scripts, and network peers as trust boundaries and requires validation, authorization, quotas, logging, and recovery.
- NEXORA issue [#64](https://github.com/Lucas-Belucci-Bellini/NEXORA/issues/64) records a 2026-10-30 audit finding machine-local Windows cache paths and SQLite healthcare-document state under tracked paths. Its audit notes say file contents were not opened; provenance and sensitivity remain unclassified; no removal or history rewrite was performed.
- Issue #64 also records that existing ignore rules do not remove tracked content and that any removal/history rewrite requires backup, owner confirmation, and coordination.

This snapshot records the state and issue discussion observed during authoring. Recheck the repository and issue before acting; never treat this skill's snapshot as a current incident verdict.

## Required inputs

- Pinned repository commit and a read-only inventory of tracked paths.
- Exact suspicious path list and Git object/commit metadata, not file contents.
- Repository owner and authorized security/incident contact.
- Data classification and provenance decision from the owner or authorized reviewer.
- Backup destination, retention period, access restrictions, and verification evidence.
- Collaborator/fork/clone impact assessment before any history rewrite.
- Required CI policy and an allowlist process for legitimate fixtures or generated assets.

## Workflow

1. Confirm the repository, branch, commit SHA, and exact tracked paths with read-only Git metadata.
2. Classify the artifact family and provenance without opening or reproducing potentially sensitive content.
3. Escalate suspected personal data, credentials, third-party data, or regulated information through the approved incident process.
4. Obtain an owner-approved backup and removal/history plan before any destructive operation.
5. Remove only confirmed out-of-scope tracked artifacts, add narrow prevention rules, and validate the resulting tree.
6. Coordinate any history rewrite with forks, clones, collaborators, release tags, and credential rotation as applicable.
7. Add a regression gate for future tracked artifacts and record evidence without exposing their contents.

### 1. Establish presence using metadata only

- Use `git ls-files`, tree listings, path-scoped commit history, blob IDs, file sizes, and commit subjects to confirm presence and provenance.
- Record the exact branch and commit being audited; a local worktree can differ from the remote default branch.
- Search the complete tracked tree, not only the working directory or untracked-file status.
- Avoid commands that print file contents, database rows, cache payloads, environment variables, or binary strings.
- Do not download suspicious files to a new machine merely to inspect them.
- Record unknown provenance as unknown. A commit subject is a clue, not proof of file ownership or sensitivity.

### 2. Classify without exposing data

For each path, record:

- artifact family: local database, WAL/SHM sidecar, cache, runtime output, credentials, personal document, generated asset, test fixture, or unknown;
- suspected owner/process and the evidence supporting that attribution;
- whether the path is expected project content;
- whether it may contain personal, confidential, regulated, or third-party data;
- commit range and any known distribution surface;
- classification confidence and unresolved questions.

Do not infer that a database is harmless because its filename looks generic. Do not infer that a cache is safe because it is reproducible. Do not inspect contents unless an authorized incident handler explicitly approves a controlled, minimum-access examination.

### 3. Handle suspected exposure as an incident

- Stop further distribution of affected artifacts where the owner can safely do so; do not improvise public visibility changes or delete repository history.
- Notify the owner/security contact with path names, commit IDs, and risk classification only.
- If credentials may be present, assess revocation/rotation through the credential owner; never paste candidate secrets into an issue, PR, chat, or CI log.
- If personal or regulated data may be present, follow the applicable privacy/legal process and preserve evidence under restricted access.
- Distinguish repository exposure from proven data access: a tracked path alone does not establish who downloaded or read it.
- Keep issue updates content-free: describe classes, hashes/commit IDs only when appropriate, and decisions—not file contents.

### 4. Back up and approve destructive changes

- Obtain explicit owner approval for the exact path list and proposed action.
- Create a restricted backup before removing tracked files; verify the backup without printing or attaching its contents.
- Record who can access the backup, where it is stored, how long it is retained, and how it will be securely deleted.
- Prefer a normal forward commit removing confirmed files from the current branch when that meets the exposure response.
- A history rewrite is a separate, higher-impact decision. Require a written plan, a coordination window, collaborator instructions, fork/clone impact review, tag/release implications, and a recovery point.
- Do not run `git filter-repo`, force-push, mass-delete, or rewrite protected branches based only on an audit finding.
- Do not remove ambiguous paths or legitimate project fixtures just because their names resemble local state.

### 5. Prevent recurrence with narrow rules and a regression gate

- Add ignore rules for exact machine-local path families; avoid broad patterns such as ignoring every `data/`, `cache/`, `*.db`, or `*.sqlite` file if legitimate project fixtures may use them.
- Remember that `.gitignore` affects untracked files only. It is not proof that a tracked path was removed.
- Add a tracked-tree validator that rejects known local-state roots, absolute machine paths, assistant worktrees, runtime caches, and unapproved database sidecars.
- Make the validator inspect paths and metadata first; it should not print or upload contents.
- Allow legitimate fixtures only through a reviewed, narrow, documented exception with owner, reason, expiry, and content-safety evidence.
- Test the validator with synthetic path fixtures, including Windows separators, case variants, encoded path segments, nested paths, and symlink/normalization edge cases.
- Keep the gate fail-closed for known prohibited roots, but do not activate it while known violations make every CI run red unless the owner has approved the remediation sequence.

### 6. Verify the final repository state

- Confirm suspicious paths are absent from the tracked tree on the intended branch.
- Confirm narrow ignore rules remain present and legitimate source/configuration paths are still tracked.
- Run the path validator against the full tracked tree and its synthetic regression fixtures.
- Review the diff and commit metadata; do not attach removed files to PRs or issues.
- If history was rewritten, verify the intended refs/tags and communicate exact clone recovery steps to collaborators.
- Record separately: removed from current tree, removed from reachable history, backup verified, prevention gate active, and distribution exposure assessed. These are not interchangeable claims.

## Validation checklist

- [ ] Audit is pinned to an exact commit and branch.
- [ ] Tracked-path inventory was performed without opening suspicious content.
- [ ] Provenance and classification are recorded with confidence and unknowns.
- [ ] Suspected sensitive data was escalated through an authorized incident path.
- [ ] No contents, database rows, secrets, or binary payloads were pasted into public logs.
- [ ] Owner approved the exact removal list and backup plan.
- [ ] Backup access, retention, and verification are documented.
- [ ] Current-tree removal is separated from any history rewrite decision.
- [ ] History rewrite has a coordination and recovery plan if required.
- [ ] Ignore rules are narrow and do not hide legitimate project assets.
- [ ] A tracked-tree regression gate checks paths without reading file payloads.
- [ ] Synthetic Windows/Unix path and normalization fixtures pass.
- [ ] Final report distinguishes tree cleanup, history cleanup, and exposure assessment.

## Required output

Produce a metadata-only artifact exposure report containing the pinned commit; tracked path inventory; artifact class; provenance evidence; sensitivity classification and confidence; commit history range; owner decision; backup verification; approved current-tree changes; separate history-rewrite decision; ignore/validator coverage; synthetic test results; distribution/exposure assessment; and unresolved risks. Never include the suspected file contents, database rows, credentials, or sensitive payloads.

## Boundaries and failure handling

- Do not open, copy, print, upload, or quote suspicious file contents without explicit authorization through the incident process.
- Do not treat a matching `.gitignore` rule as proof that a tracked file has been removed.
- Do not delete or rewrite history without owner approval, verified backup, and coordination.
- Do not rotate credentials speculatively; confirm whether credentials may be present and involve their owner.
- Do not claim exposure, exfiltration, or sensitivity solely from a path name.
- Do not make broad ignore rules that can hide legitimate code, assets, or test fixtures.
- Do not let a path validator silently skip malformed, normalized, or case-variant paths.
- Do not claim the NEXORA issue is resolved until the owner-approved remediation and verification evidence are complete.

## Trigger examples

- **Positive:** Audit a repository where local assistant state, SQLite sidecars, or OS cache files are already tracked.
- **Positive:** Determine which commits introduced suspicious machine-local artifacts without opening their contents.
- **Positive:** Design a safe removal, backup, and coordinated history-rewrite plan.
- **Positive:** Add a path-only CI gate to prevent future local-state artifacts from entering the tracked tree.
- **Negative:** The task only scans source/configuration for exposed secret values; use `secrets-scan-remediation`.
- **Negative:** The task only redacts runtime diagnostic fields; use `nexora-diagnostic-log-redaction`.
- **Negative:** The task only enforces runtime path containment for mod/file access; use `nexora-filesystem-sandbox-boundary`.
