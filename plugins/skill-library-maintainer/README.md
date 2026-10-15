# Skill Library Maintainer

This plugin guides safe refreshes of the unified skills collection after new skill batches arrive.

1. Inspect the default branch, git status, and any open pull request.
2. Keep each skill's references, scripts, assets, templates, examples, and applicable license notices.
3. Run `node tools/sync-skill-bundles.mjs --write`, then `node tools/sync-skill-bundles.mjs --check` from the repository root.
4. Review changes and test the generated payload before opening/updating a PR.
5. Never merge or publish automatically.

The script is included here as a reference and is also tracked at the repository root. Pass `--repo PATH` when the checkout is not the current working directory.
