#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const writing = args.includes("--write");
const checking = args.includes("--check");
const repoIndex = args.indexOf("--repo");
const root = path.resolve(repoIndex >= 0 ? args[repoIndex + 1] : process.cwd());
const pluginRoot = path.join(root, "plugins", "all-skills-collection");
const skillsRoot = path.join(pluginRoot, "skills");
const manifestPath = path.join(pluginRoot, ".claude-plugin", "plugin.json");
const catalogPath = path.join(root, ".claude-plugin", "marketplace.json");
const readmePath = path.join(pluginRoot, "README.md");
const skipDirs = new Set([".git", "node_modules", ".next", "coverage", "dist", "vendor"]);
const generated = ["plugins/all-skills-collection/", "plugins/skill-library-maintainer/"];
const slash = (v) => v.split(path.sep).join("/");
const rel = (a, b) => slash(path.relative(a, b));
const hash = (v) => createHash("sha256").update(v).digest("hex");
function loadGitModes() {
  try {
    const raw = execFileSync("git", ["ls-files", "--stage", "-z"], {
      cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024,
    });
    const result = new Map();
    for (const record of raw.split("\0")) {
      const match = /^(\d{6}) [a-f0-9]+ \d\t(.+)$/.exec(record);
      if (match) result.set(match[2], parseInt(match[1], 8));
    }
    return result;
  } catch { return new Map(); }
}
const trackedModes = loadGitModes();
const slug = (v) => v.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

if ((!writing && !checking) || (writing && checking) || (repoIndex >= 0 && !args[repoIndex + 1])) {
  console.error("Usage: node tools/sync-skill-bundles.mjs --write|--check [--repo PATH]");
  process.exit(2);
}
async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
async function listFiles(base, includeGenerated = false) {
  const result = [];
  async function visit(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const ent of entries) {
      if (ent.isSymbolicLink() || (ent.isDirectory() && skipDirs.has(ent.name))) continue;
      const absolute = path.join(dir, ent.name);
      const relative = rel(base, absolute);
      if (!includeGenerated && generated.some((p) => relative === p.slice(0, -1) || relative.startsWith(p))) continue;
      if (ent.isDirectory()) await visit(absolute);
      else if (ent.isFile()) result.push(relative);
    }
  }
  await visit(base);
  return result;
}
async function expectedPayload() {
  const sourceFiles = await listFiles(root);
  const entrypoints = sourceFiles.filter((f) => f.endsWith("/SKILL.md"));
  const candidates = [];
  for (const entrypoint of entrypoints) {
    const dir = path.posix.dirname(entrypoint);
    const childFiles = sourceFiles.filter((f) => f.startsWith(dir + "/"));
    const files = [];
    for (const file of childFiles) {
      const abs = path.join(root, ...file.split("/"));
      const st = await fs.stat(abs);
      files.push({ relative: file.slice(dir.length + 1), bytes: await fs.readFile(abs), mode: trackedModes.get(file) ?? (st.mode & 0o777) });
    }
    const key = files.map((f) => f.relative + "\0" + hash(f.bytes) + "\0" + String(f.mode & 0o111)).join("\n");
    const priority = (dir.includes("external_plugins/") ? 10 : 0) + (dir.split("/").some((p) => /\s\(\d+\)$/.test(p)) ? 20 : 0);
    candidates.push({ dir, base: path.posix.basename(dir), files, fingerprint: hash(key), priority });
  }
  candidates.sort((a, b) => a.priority - b.priority || a.dir.localeCompare(b.dir));
  const seen = new Map();
  const unique = [];
  for (const item of candidates) {
    if (seen.has(item.fingerprint)) {
      console.log("DEDUP " + item.dir + " -> " + seen.get(item.fingerprint).dir);
      continue;
    }
    seen.set(item.fingerprint, item);
    unique.push(item);
  }
  const groups = new Map();
  for (const item of unique) {
    const name = slug(item.base) || "unnamed-skill";
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(item);
  }
  const names = new Set();
  const output = new Map();
  for (const item of unique) {
    const baseName = slug(item.base) || "unnamed-skill";
    let name = baseName;
    if (groups.get(baseName).length > 1) {
      const parts = item.dir.split("/").slice(0, -1).filter((p) => p !== "skills");
      name = (slug(parts.at(-1) || "imported") || "imported") + "-" + baseName;
      if (names.has(name)) name = (slug(parts.join("-")) || "imported") + "-" + baseName;
    }
    if (names.has(name)) throw new Error("Unresolved skill-name collision for " + item.dir + " -> " + name);
    names.add(name);
    for (const file of item.files) {
      let bytes = file.bytes;
      if (file.relative === "SKILL.md" && name !== baseName) {
        const text = bytes.toString("utf8");
        const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
        if (fm) {
          const content = /^name\s*:/m.test(fm[1]) ? fm[1].replace(/^name\s*:\s*.*$/m, "name: " + name) : "name: " + name + "\n" + fm[1];
          bytes = Buffer.from(text.replace(/^---\r?\n[\s\S]*?\r?\n---/, "---\n" + content + "\n---"), "utf8");
        } else bytes = Buffer.from("---\nname: " + name + "\n---\n\n" + text, "utf8");
      }
      const target = "skills/" + name + "/" + file.relative;
      if (output.has(target)) throw new Error("Duplicate output path " + target);
      output.set(target, { bytes, mode: file.mode });
    }
  }
  if (!output.size) throw new Error("No SKILL.md sources found; refusing to generate an empty plugin.");
  return output;
}
async function actualPayload() {
  const map = new Map();
  for (const file of await listFiles(skillsRoot, true)) {
    const abs = path.join(skillsRoot, ...file.split("/"));
    const st = await fs.stat(abs);
    map.set("skills/" + file, { bytes: await fs.readFile(abs), mode: trackedModes.get("plugins/all-skills-collection/skills/" + file) ?? (st.mode & 0o777) });
  }
  return map;
}
function diff(expected, actual) {
  const out = [];
  for (const [file, value] of expected) {
    const old = actual.get(file);
    if (!old) out.push("MISSING " + file);
    else if (!old.bytes.equals(value.bytes) || (process.platform !== "win32" && (old.mode & 0o111) !== (value.mode & 0o111))) out.push("DIFF " + file);
  }
  for (const file of actual.keys()) if (!expected.has(file)) out.push("EXTRA " + file);
  return out;
}
function bump(version) {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(version || "");
  if (!m) throw new Error("Invalid semantic version: " + version);
  return m[1] + "." + m[2] + "." + (Number(m[3]) + 1);
}
async function writeAtomic(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = file + ".tmp-" + process.pid;
  await fs.writeFile(temp, data);
  await fs.rename(temp, file);
}
async function replaceSkills(payload) {
  const parent = path.dirname(skillsRoot);
  const stage = path.join(parent, ".skill-stage-" + process.pid);
  const backup = path.join(parent, ".skill-backup-" + process.pid);
  await fs.rm(stage, { recursive: true, force: true });
  await fs.rm(backup, { recursive: true, force: true });
  await fs.mkdir(stage, { recursive: true });
  try {
    for (const [file, value] of payload) {
      const local = file.slice("skills/".length);
      const target = path.join(stage, ...local.split("/"));
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, value.bytes);
      await fs.chmod(target, value.mode);
    }
    if (await exists(skillsRoot)) await fs.rename(skillsRoot, backup);
    try {
      await fs.rename(stage, skillsRoot);
      await fs.rm(backup, { recursive: true, force: true });
    } catch (error) {
      if (!(await exists(skillsRoot)) && await exists(backup)) await fs.rename(backup, skillsRoot);
      throw error;
    }
  } finally { await fs.rm(stage, { recursive: true, force: true }); }
}
async function main() {
  if (!(await exists(path.join(root, "README.md")))) throw new Error("Repository root not found: " + root);
  if (!(await exists(manifestPath)) || !(await exists(catalogPath))) throw new Error("Missing bundle manifest or .claude-plugin/marketplace.json.");
  const expected = await expectedPayload();
  const actual = await actualPayload();
  const changes = diff(expected, actual);
  const skillCount = new Set([...expected.keys()].map((p) => p.split("/")[1])).size;
  if (checking) {
    const plugin = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
    const entry = (catalog.plugins || []).find((p) => p.name === "all-skills-collection");
    const readme = await fs.readFile(readmePath, "utf8");
    const rootReadme = await fs.readFile(path.join(root, "README.md"), "utf8");
    const expectedCountText = skillCount + " distinct skills";
    if (!entry) changes.push("MISSING marketplace entry all-skills-collection");
    else if (entry.version !== plugin.version) changes.push("VERSION mismatch between catalog and plugin manifest");
    if (!readme.includes("**" + expectedCountText + "**")) changes.push("Plugin README skill count should be " + skillCount);
    if (!String(plugin.description || "").includes(expectedCountText)) changes.push("Plugin manifest description count should be " + skillCount);
    if (entry && !String(entry.description || "").includes(expectedCountText)) changes.push("Marketplace description count should be " + skillCount);
    if (!rootReadme.includes("currently packages " + expectedCountText)) changes.push("Root README skill count should be " + skillCount);
    if (changes.length) {
      console.log(changes.slice(0, 100).join("\n"));
      console.error("FAILED: " + changes.length + " discrepancy(s).");
      process.exitCode = 1;
    } else console.log("OK: " + skillCount + " distinct skills; " + expected.size + " skill files; manifests/count align.");
    return;
  }
  const plugin = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
  const entry = (catalog.plugins || []).find((p) => p.name === "all-skills-collection");
  if (!entry) throw new Error("Marketplace entry all-skills-collection was not found.");
  const nextVersion = changes.length ? bump(plugin.version) : plugin.version;
  await replaceSkills(expected);
  plugin.version = nextVersion;
  entry.version = nextVersion;
  plugin.description = String(plugin.description || "").replace(/\d+ distinct skills/, skillCount + " distinct skills");
  entry.description = String(entry.description || "").replace(/\d+ distinct skills/, skillCount + " distinct skills");
  await writeAtomic(manifestPath, JSON.stringify(plugin, null, 2) + "\n");
  await writeAtomic(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
  const doc = (await fs.readFile(readmePath, "utf8")).replace(/\*\*\d+ distinct skills\*\*/, "**" + skillCount + " distinct skills**");
  await writeAtomic(readmePath, doc);
  const rootReadme = (await fs.readFile(path.join(root, "README.md"), "utf8"))
    .replace(/currently packages \d+ distinct skills/g, "currently packages " + skillCount + " distinct skills");
  await writeAtomic(path.join(root, "README.md"), rootReadme);
  console.log("Wrote " + skillCount + " distinct skills (" + expected.size + " files), plugin version " + nextVersion + ".");
}
main().catch((error) => { console.error("sync-skill-bundles: " + (error.stack || String(error))); process.exitCode = 1; });
