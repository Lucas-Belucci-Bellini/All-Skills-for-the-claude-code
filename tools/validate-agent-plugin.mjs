#!/usr/bin/env node
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = async (file) => fs.readFile(path.join(root, file), "utf8");
const plugin = JSON.parse(await read("plugins/agent-orchestration-workbench/.claude-plugin/plugin.json"));
const marketplace = JSON.parse(await read(".claude-plugin/marketplace.json"));
const entry = marketplace.plugins.find((item) => item.name === plugin.name);
assert.ok(entry, "agent plugin is not registered in .claude-plugin/marketplace.json");
assert.equal(entry.source, "./plugins/agent-orchestration-workbench", "marketplace source mismatch");
assert.equal(entry.version, plugin.version, "marketplace and plugin versions differ");
assert.ok(plugin.description?.length >= 40, "plugin description is too short");
assert.match(plugin.version, /^\d+\.\d+\.\d+$/, "plugin version must use semver");

const agentDir = path.join(root, "plugins/agent-orchestration-workbench/agents");
const agentFiles = (await fs.readdir(agentDir)).filter((file) => file.endsWith(".md")).sort();
assert.equal(agentFiles.length, 6, "expected exactly six specialized agent definitions");
const names = new Set();
const allowedModels = new Set(["sonnet", "opus", "haiku", "inherit"]);
const readOnlyNames = new Set(["orchestration-architect","orchestration-runtime-reviewer","agent-security-auditor","orchestration-incident-triager","agent-evaluation-designer"]);
for (const file of agentFiles) {
  const source = await fs.readFile(path.join(agentDir, file), "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  assert.ok(match, file + ": missing or invalid frontmatter block");
  const front = match[1], body = match[2];
  const field = (key) => front.split(/\r?\n/).find((line) => line.startsWith(key + ":"))?.slice(key.length + 1).trim();
  const name = field("name"), description = field("description"), model = field("model"), effort = field("effort");
  const maxTurns = Number(field("maxTurns")), toolsRaw = field("tools");
  assert.ok(name && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), file + ": invalid name");
  assert.equal(file, name + ".md", file + ": filename/name mismatch");
  assert.ok(!names.has(name), file + ": duplicate agent name"); names.add(name);
  assert.ok(description && description.length >= 60, file + ": missing actionable description");
  assert.ok(allowedModels.has(model), file + ": unsupported model alias");
  assert.ok(["low","medium","high"].includes(effort), file + ": unsupported effort");
  assert.ok(Number.isInteger(maxTurns) && maxTurns >= 5 && maxTurns <= 40, file + ": invalid maxTurns");
  assert.ok(toolsRaw, file + ": tools list is required");
  const tools = JSON.parse(toolsRaw);
  assert.ok(Array.isArray(tools) && tools.length && tools.every((tool) => typeof tool === "string"), file + ": tools must be a JSON-style YAML array");
  assert.ok(tools.every((tool) => ["Read","Grep","Glob","Edit","Write","Bash"].includes(tool)), file + ": tool outside reviewed allow-list");
  if (readOnlyNames.has(name)) assert.ok(!tools.some((tool) => ["Edit","Write","Bash"].includes(tool)), file + ": read-only agent has write/execute tools");
  for (const heading of ["## Working protocol","## Required output","## Safety boundaries"]) assert.ok(body.includes(heading), file + ": missing " + heading);
  assert.match(body, /Never claim|Do not claim|Never call/i, file + ": missing evidence/claim boundary");
  assert.ok(body.length > 900, file + ": prompt body unexpectedly short");
}
for (const expected of ["orchestration-architect","orchestration-test-engineer","orchestration-runtime-reviewer","agent-security-auditor","orchestration-incident-triager","agent-evaluation-designer"]) assert.ok(names.has(expected), "expected agent missing: " + expected);
const readme = await read("plugins/agent-orchestration-workbench/README.md");
for (const name of names) assert.ok(readme.includes(name), "README does not document " + name);

const commandDir = path.join(root, "plugins/agent-orchestration-workbench/commands");
const commandFiles = (await fs.readdir(commandDir)).filter((file) => file.endsWith(".md")).sort();
assert.deepEqual(commandFiles, ["incident-review.md", "orchestration-plan.md", "release-gate.md", "verification.md"], "unexpected command inventory");
const commandAgents = new Set([
  "agent-orchestration-workbench:orchestration-architect",
  "agent-orchestration-workbench:orchestration-test-engineer",
  "agent-orchestration-workbench:orchestration-runtime-reviewer",
  "agent-orchestration-workbench:agent-security-auditor",
  "agent-orchestration-workbench:orchestration-incident-triager",
  "agent-orchestration-workbench:agent-evaluation-designer",
]);
for (const file of commandFiles) {
  const source = await fs.readFile(path.join(commandDir, file), "utf8");
  const match = /^---\\r?\\n([\\s\\S]*?)\\r?\\n---\\r?\\n([\\s\\S]*)$/.exec(source);
  assert.ok(match, file + ": missing or invalid frontmatter");
  const front = match[1], body = match[2];
  const field = (key) => front.split(/\\r?\\n/).find((line) => line.startsWith(key + ":"))?.slice(key.length + 1).trim();
  const description = field("description"), hint = field("argument-hint");
  assert.ok(description && description.length >= 50, file + ": description missing or too short");
  assert.ok(hint && hint.startsWith("["), file + ": argument-hint missing");
  assert.ok(body.includes("$ARGUMENTS"), file + ": command arguments are not consumed");
  for (const heading of ["## Workflow", "## Required output", "## Safety boundaries"]) assert.ok(body.includes(heading), file + ": missing " + heading);
  assert.match(body, /Do not merge|Never.*merge/i, file + ": missing merge boundary");
  const referenced = [...body.matchAll(/\x60(agent-orchestration-workbench:[a-z0-9-]+)\x60/g)].map((m) => m[1]);
  assert.ok(referenced.length > 0, file + ": does not invoke a specialized agent");
  for (const name of referenced) assert.ok(commandAgents.has(name), file + ": unknown agent " + name);
}
const pluginReadme = await read("plugins/agent-orchestration-workbench/README.md");
for (const file of commandFiles) assert.ok(pluginReadme.includes(file.replace(/\\.md$/, "")), "README does not document command " + file);
console.log("PASS: plugin metadata, marketplace registration, " + names.size + " agents, and " + commandFiles.length + " workflow commands validated.");

