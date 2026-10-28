#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const kinds = new Set(["source", "test", "documentation", "example", "issue"]);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export async function buildEvidenceManifest(rootPath, input, generatedAt = new Date().toISOString()) {
  const errors = [];
  const need = (condition, message) => { if (!condition) errors.push(message); };
  need(isObject(input), "input must be a JSON object");
  if (!isObject(input)) throw new Error(errors.join("\n"));
  need(input.schema_version === 1, "schema_version must be 1");
  need(isObject(input.repository), "repository must be an object");
  const repo = isObject(input.repository) ? input.repository : {};
  need(nonEmpty(repo.url) && /^https:\/\//i.test(repo.url), "repository.url must be HTTPS");
  need(nonEmpty(repo.revision) && /^[a-f0-9]{40}$/i.test(repo.revision), "repository.revision must be a full 40-character Git commit SHA");
  need(nonEmpty(repo.inspected_at) && !Number.isNaN(Date.parse(repo.inspected_at)), "repository.inspected_at must be a parseable date");
  need(Array.isArray(input.claims) && input.claims.length > 0, "claims must contain at least one evidence claim");
  if (errors.length) throw new Error(errors.join("\n"));

  const root = await fs.realpath(rootPath);
  const results = [];
  const seenIds = new Set();
  for (let index = 0; index < input.claims.length; index++) {
    const claim = input.claims[index];
    const prefix = "claims[" + index + "]";
    if (!isObject(claim)) {
      errors.push(prefix + " must be an object");
      continue;
    }
    need(nonEmpty(claim.id) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(claim.id), prefix + ".id must be a kebab-case slug");
    if (seenIds.has(claim.id)) errors.push(prefix + ".id duplicates " + claim.id);
    seenIds.add(claim.id);
    need(nonEmpty(claim.claim), prefix + ".claim must describe one verifiable claim");
    need(nonEmpty(claim.path), prefix + ".path is required");
    need(Number.isInteger(claim.start_line) && claim.start_line >= 1, prefix + ".start_line must be a positive integer");
    need(Number.isInteger(claim.end_line) && claim.end_line >= claim.start_line, prefix + ".end_line must be >= start_line");
    need(Number.isInteger(claim.start_line) && Number.isInteger(claim.end_line) && claim.end_line - claim.start_line <= 79, prefix + " may cover at most 80 lines");
    need(kinds.has(claim.kind), prefix + ".kind must be one of " + [...kinds].join(", "));
    if (!nonEmpty(claim.path) || !Number.isInteger(claim.start_line) || !Number.isInteger(claim.end_line) || claim.start_line < 1 || claim.end_line < claim.start_line || claim.end_line - claim.start_line > 79) continue;

    const normalized = claim.path.replaceAll("\\", "/");
    need(!normalized.startsWith("/") && !/^[a-z]:\//i.test(normalized), prefix + ".path must be repository-relative");
    const segments = normalized.split("/");
    need(!segments.includes("..") && !segments.includes("."), prefix + ".path cannot contain dot traversal segments");
    if (normalized.startsWith("/") || /^[a-z]:\//i.test(normalized) || segments.includes("..") || segments.includes(".")) continue;

    const absolute = path.resolve(root, ...segments);
    if (absolute !== root && !absolute.startsWith(root + path.sep)) {
      errors.push(prefix + ".path escapes repository root");
      continue;
    }
    let stat;
    try {
      stat = await fs.lstat(absolute);
    } catch {
      errors.push(prefix + ".path does not exist in the local checkout");
      continue;
    }
    need(stat.isFile() && !stat.isSymbolicLink(), prefix + ".path must point to a regular non-symlink file");
    if (!stat.isFile() || stat.isSymbolicLink()) continue;
    const realFile = await fs.realpath(absolute);
    if (realFile !== root && !realFile.startsWith(root + path.sep)) {
      errors.push(prefix + ".path resolves outside the repository root through a symlink");
      continue;
    }
    need(stat.size <= 2_000_000, prefix + ".path exceeds the 2 MB evidence-file limit");
    if (stat.size > 2_000_000) continue;

    const bytes = await fs.readFile(absolute);
    const content = bytes.toString("utf8");
    const lines = content.split(/\r?\n/);
    need(claim.end_line <= lines.length, prefix + ".end_line exceeds file line count (" + lines.length + ")");
    if (claim.end_line > lines.length) continue;
    const excerpt = lines.slice(claim.start_line - 1, claim.end_line).join("\n");
    results.push({
      id: claim.id,
      claim: claim.claim,
      source_ref: normalized,
      kind: claim.kind,
      start_line: claim.start_line,
      end_line: claim.end_line,
      line_count: claim.end_line - claim.start_line + 1,
      file_sha256: hash(bytes),
      excerpt_sha256: hash(excerpt),
      review_status: "needs-human-inspection"
    });
  }
  if (errors.length) throw new Error(errors.join("\n"));
  return {
    schema_version: 1,
    manifest_type: "repository-evidence-pointers",
    repository: {
      url: repo.url,
      revision: repo.revision.toLowerCase(),
      inspected_at: new Date(repo.inspected_at).toISOString()
    },
    generated_at: generatedAt,
    policy: {
      network_access: false,
      repository_code_executed: false,
      source_excerpts_emitted: false,
      hashes: "SHA-256 identifies the checked local bytes; it does not authenticate the repository revision or prove the claim",
      human_review_required: true
    },
    summary: {
      claim_count: results.length,
      review_required: results.length,
      unique_source_files: new Set(results.map((item) => item.source_ref)).size
    },
    evidence: results
  };
}

async function selfTest() {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "repo-evidence-test-"));
  try {
    await fs.mkdir(path.join(tmp, "src"));
    await fs.writeFile(path.join(tmp, "src", "sample.js"), "export function sum(a, b) {\n  return a + b;\n}\n");
    const input = {
      schema_version: 1,
      repository: {
        url: "https://github.com/example/sample",
        revision: "0123456789abcdef0123456789abcdef01234567",
        inspected_at: "2026-10-28"
      },
      claims: [{
        id: "sum-function-contract",
        claim: "The function returns the sum of its two arguments.",
        path: "src/sample.js",
        start_line: 1,
        end_line: 3,
        kind: "source"
      }]
    };
    const manifest = await buildEvidenceManifest(tmp, input, "2026-10-28T00:00:00.000Z");
    assert.equal(manifest.summary.claim_count, 1);
    assert.equal(manifest.evidence[0].line_count, 3);
    assert.match(manifest.evidence[0].file_sha256, /^[a-f0-9]{64}$/);
    assert.match(manifest.evidence[0].excerpt_sha256, /^[a-f0-9]{64}$/);
    assert.equal(manifest.evidence[0].review_status, "needs-human-inspection");
    assert.ok(!JSON.stringify(manifest).includes("return a + b"));

    await assert.rejects(
      () => buildEvidenceManifest(tmp, { ...input, repository: { ...input.repository, revision: "main" } }),
      /full 40-character Git commit SHA/
    );
    await assert.rejects(
      () => buildEvidenceManifest(tmp, { ...input, claims: [{ ...input.claims[0], path: "../outside.js" }] }),
      /cannot contain dot traversal segments/
    );
    await assert.rejects(
      () => buildEvidenceManifest(tmp, { ...input, claims: [{ ...input.claims[0], end_line: 99 }] }),
      /exceeds file line count/
    );
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "repo-evidence-outside-"));
    try {
      await fs.mkdir(path.join(outside, "linked"));
      await fs.writeFile(path.join(outside, "linked", "secret.js"), "outside root");
      await fs.symlink(path.join(outside, "linked"), path.join(tmp, "external-link"));
      await assert.rejects(
        () => buildEvidenceManifest(tmp, { ...input, claims: [{ ...input.claims[0], path: "external-link/secret.js" }] }),
        /resolves outside the repository root/
      );
    } finally {
      await fs.rm(outside, { recursive: true, force: true });
    }
    console.log("Repository evidence manifest self-test passed (pinned SHA, path containment, symlink escape, line ranges, hashes, no excerpts).");
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

async function main(args) {
  if (args.includes("--self-test")) return selfTest();
  const positional = args.filter((arg) => !arg.startsWith("--"));
  const root = positional[0];
  const inputPath = positional[1];
  const outputFlag = args.indexOf("--output");
  const outputPath = outputFlag >= 0 ? args[outputFlag + 1] : null;
  if (!nonEmpty(root) || !nonEmpty(inputPath) || (outputFlag >= 0 && !nonEmpty(outputPath))) {
    console.error("Usage: node tools/build-repository-evidence-manifest.mjs <local-repository-path> <claims.json> [--output evidence-manifest.json] | --self-test");
    process.exitCode = 2;
    return;
  }
  try {
    const input = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
    const manifest = await buildEvidenceManifest(root, input);
    const json = JSON.stringify(manifest, null, 2) + "\n";
    if (outputPath) await fs.writeFile(path.resolve(outputPath), json, "utf8");
    else process.stdout.write(json);
    console.error("Evidence manifest prepared: " + manifest.summary.claim_count + " pointers; all require human inspection.");
  } catch (error) {
    console.error("Evidence manifest failed:\n" + error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main(process.argv.slice(2));
}
