#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const SKIP_DIRS = new Set([
  ".git", "node_modules", "vendor", "target", "dist", "build", "coverage",
  ".next", ".nuxt", ".turbo", ".cache", ".venv", "venv", "__pycache__",
  "bin", "obj", "out"
]);
const text = (v) => typeof v === "string" && v.length > 0;
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

export function classifyFile(relativePath) {
  const p = relativePath.replaceAll("\\", "/");
  const base = path.posix.basename(p).toLowerCase();
  const ext = path.posix.extname(p).toLowerCase();
  if (/^(license|licence)(\\.|$)/i.test(base) || /^copying(\\.|$)/i.test(base) || /^notice(\\.|$)/i.test(base)) return "license-or-notice";
  if (/^readme(\\.|$)/i.test(base)) return "readme";
  if (/^contributing(\\.|$)/i.test(base) || /^code_of_conduct(\\.|$)/i.test(base) || /^security(\\.|$)/i.test(base)) return "governance-doc";
  if (p.startsWith(".github/workflows/") && /\\.(yml|yaml)$/i.test(base)) return "ci-workflow";
  if (/(^|\\/)(test|tests|__tests__|spec|specs)(\\/|$)/i.test(p) || /\\.(test|spec)\\.[^.]+$/i.test(base)) return "test";
  if (/(^|\\/)(docs?|documentation)(\\/|$)/i.test(p) || /\\.(md|mdx|rst|adoc)$/i.test(ext)) return "documentation";
  if (/^(package\\.json|pnpm-workspace\\.yaml|cargo\\.toml|pyproject\\.toml|go\\.mod|pom\\.xml|build\\.gradle(\\.kts)?|composer\\.json|gemfile)$/i.test(base)) return "package-manifest";
  if (/^(tsconfig[^/]*\\.json|vite\\.config\\.[^.]+|webpack\\.config\\.[^.]+|eslint\\.config\\.[^.]+|\.eslintrc[^/]*|rust-toolchain(\\.toml)?|makefile|justfile)$/i.test(base)) return "tooling-config";
  if (/\\.(rs|ts|tsx|js|jsx|mjs|cjs|py|java|kt|kts|go|rb|php|cs|cpp|c|h|hpp|swift|scala|sh|ps1)$/i.test(ext)) return "source-code";
  return "other";
}

export async function inventoryRepository(rootPath, excludedOutput = null) {
  const root = await fs.realpath(rootPath);
  const outputReal = excludedOutput ? path.resolve(excludedOutput) : null;
  const files = [];
  const visit = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const entry of entries) {
      if (entry.name === "." || entry.name === "..") continue;
      const absolute = path.join(dir, entry.name);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (outputReal && path.resolve(absolute) === outputReal) continue;
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith(".") || entry.name === ".github") {
          await visit(absolute);
        }
        continue;
      }
      if (!entry.isFile()) continue;
      const stat = await fs.stat(absolute);
      const bytes = await fs.readFile(absolute);
      files.push({
        path: relative,
        category: classifyFile(relative),
        extension: path.posix.extname(relative).toLowerCase() || null,
        size_bytes: stat.size,
        sha256: sha256(bytes)
      });
    }
  };
  await visit(root);
  files.sort((a, b) => a.path.localeCompare(b.path, "en"));
  const categories = {};
  for (const file of files) categories[file.category] = (categories[file.category] ?? 0) + 1;
  return {
    schema_version: 1,
    inventory_type: "structural-only",
    root_name: path.basename(root),
    generated_at: new Date().toISOString(),
    policy: {
      network_access: false,
      repository_code_executed: false,
      file_contents_emitted: false,
      hashes: "SHA-256 of file bytes; not a signature or trust verdict",
      skipped_directory_names: [...SKIP_DIRS].sort()
    },
    summary: { file_count: files.length, total_bytes: files.reduce((n, f) => n + f.size_bytes, 0), categories },
    files
  };
}

async function selfTest() {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "repo-inventory-test-"));
  try {
    await fs.mkdir(path.join(tmp, "src"), { recursive: true });
    await fs.mkdir(path.join(tmp, "tests"), { recursive: true });
    await fs.mkdir(path.join(tmp, "node_modules", "fake"), { recursive: true });
    await fs.mkdir(path.join(tmp, ".github", "workflows"), { recursive: true });
    await fs.writeFile(path.join(tmp, "README.md"), "hello\n");
    await fs.writeFile(path.join(tmp, "LICENSE"), "example license\n");
    await fs.writeFile(path.join(tmp, "src", "main.rs"), "fn main() {}\n");
    await fs.writeFile(path.join(tmp, "tests", "main.test.js"), "assert(true)\n");
    await fs.writeFile(path.join(tmp, ".github", "workflows", "ci.yml"), "name: ci\n");
    await fs.writeFile(path.join(tmp, "node_modules", "fake", "hidden.js"), "must be skipped");
    const result = await inventoryRepository(tmp);
    assert.equal(result.inventory_type, "structural-only");
    assert.equal(result.summary.file_count, 5);
    assert.equal(result.summary.categories["readme"], 1);
    assert.equal(result.summary.categories["license-or-notice"], 1);
    assert.equal(result.summary.categories["source-code"], 1);
    assert.equal(result.summary.categories["test"], 1);
    assert.equal(result.summary.categories["ci-workflow"], 1);
    assert.ok(result.files.every((f) => /^[a-f0-9]{64}$/.test(f.sha256)));
    assert.ok(!result.files.some((f) => f.path.includes("node_modules")));
    assert.ok(!JSON.stringify(result).includes("fn main()"));
    assert.equal(classifyFile("package.json"), "package-manifest");
    console.log("Repository inventory self-test passed (classification, SHA-256, skipped dependencies, no file contents in output).");
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

async function main(args) {
  if (args.includes("--self-test")) return selfTest();
  const positional = args.filter((a) => !a.startsWith("--"));
  const root = positional[0];
  const outputFlag = args.indexOf("--output");
  const output = outputFlag >= 0 ? args[outputFlag + 1] : null;
  if (!text(root) || (outputFlag >= 0 && !text(output))) {
    console.error("Usage: node tools/inventory-repository.mjs <local-repository-path> [--output inventory.json] | --self-test");
    process.exitCode = 2;
    return;
  }
  try {
    const result = await inventoryRepository(root, output);
    const json = JSON.stringify(result, null, 2) + "\\n";
    if (output) await fs.writeFile(path.resolve(output), json, "utf8");
    else process.stdout.write(json);
    console.error(`Inventory complete: ${result.summary.file_count} files, ${result.summary.total_bytes} bytes; structural metadata only.`);
  } catch (error) {
    console.error(`Repository inventory failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main(process.argv.slice(2));
}
