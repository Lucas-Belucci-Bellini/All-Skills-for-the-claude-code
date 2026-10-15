---
description: Rebuild and validate the unified skill bundle after new source skills have been added to the repository.
argument-hint: "[--check | --write] [--repo PATH]"
---

# Update Skill Library

Operate only inside the user's checked-out All-Skills-for-the-claude-code repository.

1. Inspect git status, current branch, and the upstream/default branch before changing anything.
2. For a content refresh, run `node tools/sync-skill-bundles.mjs --write`. For validation only, run `node tools/sync-skill-bundles.mjs --check`.
3. Inspect the diff. Verify skill count, unique names, manifests, provenance notes, and retained references/assets/scripts.
4. Run relevant repository checks and `git diff --check`.
5. Report checks that passed, failed, or could not be run. Do not commit, push, merge, publish, or change visibility without explicit authorization.
