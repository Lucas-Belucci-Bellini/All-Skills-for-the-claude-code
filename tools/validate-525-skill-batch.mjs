#!/usr/bin/env node
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const accessibility = new Set([
  "accessible-focus-return-contract",
  "accessible-live-region-announcement-testing",
  "accessible-form-error-association-audit",
  "bidirectional-text-layout-regression",
  "reduced-motion-interaction-equivalence",
  "accessible-data-table-navigation-audit",
  "keyboard-shortcut-conflict-inventory",
  "zoom-reflow-overflow-audit",
]);
const batch = [
  "accessible-focus-return-contract",
  "accessible-live-region-announcement-testing",
  "accessible-form-error-association-audit",
  "bidirectional-text-layout-regression",
  "reduced-motion-interaction-equivalence",
  "accessible-data-table-navigation-audit",
  "keyboard-shortcut-conflict-inventory",
  "zoom-reflow-overflow-audit",
  "slo-burn-rate-window-analysis",
  "service-timeout-budget-matrix",
  "circuit-breaker-recovery-probe",
  "retry-amplification-storm-audit",
  "graceful-degradation-fallback-verification",
  "multi-region-failover-readiness-test",
  "distributed-lease-fencing-token-audit",
  "queue-drain-shutdown-deadline-validation",
  "chaos-experiment-safety-gate",
  "api-bulk-operation-partial-failure-contract",
  "async-job-state-retention-contract",
  "data-export-consistent-snapshot-validation",
  "cross-service-deadline-propagation-audit",
  "api-response-size-budget-contract",
  "patch-field-presence-semantics-contract",
  "client-retry-after-window-contract",
  "database-online-index-migration-validation",
];

const read = async (relative) => fs.readFile(path.join(root, relative), "utf8");
const catalog = JSON.parse(await read("SKILL_LIBRARY_CATALOG.json"));
assert.equal(batch.length, 25, "batch definition must contain 25 names");
assert.equal(new Set(batch).size, 25, "batch contains duplicate names");
assert.equal(catalog.unique_skills, 525, "catalog total must be 525");
assert.equal(catalog.skills.length, 525, "catalog entry count must be 525");
assert.equal(new Set(catalog.skills.map((item) => item.name)).size, 525, "catalog names must be unique");
assert.equal(catalog.target, 2500, "long-term target must remain 2500");
assert.equal(catalog.remaining, 1975, "remaining count must be 1975");
assert.equal(catalog.skills.filter((item) => item.origin === "new-authored").length, 399, "authored count mismatch");
assert.equal(catalog.skills.filter((item) => item.origin === "existing").length, 126, "retained/imported count mismatch");

const byName = new Map(catalog.skills.map((item) => [item.name, item]));
for (const name of batch) {
  const folder = accessibility.has(name) ? "accessibility-inclusive-ux" : "release-testing-operations";
  const sourcePath = "curated-skill-sources/" + folder + "/" + name + "/SKILL.md";
  const bundlePath = "plugins/all-skills-collection/skills/" + name + "/SKILL.md";
  const record = byName.get(name);
  assert.ok(record, name + ": missing from catalog");
  assert.equal(record.origin, "new-authored", name + ": incorrect origin");
  assert.equal(record.source_path, sourcePath, name + ": incorrect canonical source path");
  assert.equal(record.category, folder === "accessibility-inclusive-ux" ? "Accessibility & inclusive UX" : "Release, tests & repository quality", name + ": incorrect category");

  const source = await read(sourcePath);
  const bundled = await read(bundlePath);
  assert.equal(source, bundled, name + ": source and plugin copy differ");
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
  assert.ok(frontmatter, name + ": missing valid frontmatter delimiters");
  const declaredName = /^name:\s*(.*?)\s*$/m.exec(frontmatter[1]);
  const description = /^description:\s*(.*?)\s*$/m.exec(frontmatter[1]);
  assert.ok(declaredName && declaredName[1].replace(/^["']|["']$/g, "") === name, name + ": frontmatter name mismatch");
  assert.ok(description && description[1].replace(/^["']|["']$/g, "").length >= 30, name + ": description missing or too short");
  for (const heading of [
    "# ",
    "## Purpose",
    "## Required inputs",
    "## Workflow",
    "## Validation checklist",
    "## Required output",
    "## Boundaries and failure handling",
    "## Trigger examples",
  ]) assert.ok(source.includes(heading), name + ": missing section " + heading);
  assert.ok((source.match(/^\d+\.\s/gm) || []).length >= 4, name + ": workflow has too few actionable steps");
  assert.ok((source.match(/^- \[ \] /gm) || []).length >= 4, name + ": validation checklist is too short");
  assert.match(source, /^- \*\*Positive:\*\*/m, name + ": missing positive trigger example");
  assert.match(source, /^- \*\*Negative:\*\*/m, name + ": missing negative trigger example");
}

const plugin = JSON.parse(await read("plugins/all-skills-collection/.claude-plugin/plugin.json"));
const marketplace = JSON.parse(await read(".claude-plugin/marketplace.json"));
const entry = marketplace.plugins.find((item) => item.name === "all-skills-collection");
assert.equal(plugin.version, "2.1.5", "plugin version mismatch");
assert.equal(entry.version, plugin.version, "marketplace/plugin version mismatch");
assert.match(plugin.description, /525 distinct skills/);
assert.match(entry.description, /525 distinct skills/);
console.log("PASS: " + batch.length + " new skills; catalog 525 unique; authored 399 + retained/imported 126; target 2500; source/bundle parity and required sections validated.");
