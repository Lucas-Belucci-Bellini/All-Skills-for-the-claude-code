# Claude Code plugin validation and installation smoke test

Status: **NOT RUN in a real Claude Code CLI environment**. This checklist documents the acceptance test; it is not evidence that installation has passed.

## 1. Validate the marketplace and plugin manifests

Run from the repository root with a current Claude Code CLI:

```bash
claude plugin validate . --strict
claude plugin validate ./plugins/all-skills-collection --strict
```

Expected result: both commands exit with code 0 and report no errors. Record the CLI version and full sanitized output. If the installed CLI version does not support `--strict`, upgrade before treating the result as final.

## 2. Test local marketplace discovery

Use a disposable Claude Code profile or a test machine so the check does not change the user's everyday plugin setup.

1. Add this checkout as a local marketplace using the absolute path to the repository root:

   ```text
   /plugin marketplace add /absolute/path/to/All-Skills-for-the-claude-code
   ```

2. Confirm the marketplace `all-skills-for-the-claude-code` appears in the marketplace list and the plugin `all-skills-collection` is discoverable.
3. Install the plugin in the disposable profile:

   ```text
   /plugin install all-skills-collection@all-skills-for-the-claude-code
   ```

4. Verify the plugin appears in the installed-plugin list and that the CLI reports it enabled without path, manifest, frontmatter, or skipped-skill errors.
5. Start a fresh Claude Code session and confirm the plugin's skill collection is visible to the runtime. Record any warnings about omitted files or skill discovery.

## 3. Cleanup and evidence

1. Uninstall the test plugin and remove the local marketplace from the disposable profile.
2. Record OS, Claude Code version, exact commands, exit codes, and the relevant sanitized output.
3. Mark this checklist complete only after the validation and install/discovery steps have actually run. Do not infer successful installation from the repository's custom CI alone.

## Scope limits

This smoke test validates packaging and discovery, not the legal permission to redistribute imported material. The separate imported-skill provenance audit remains a merge/publication gate.
