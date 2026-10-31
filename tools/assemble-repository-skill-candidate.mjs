#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const fail = (messages) => {
  console.error("Repository candidate assembly failed:");
  for (const message of messages) console.error("- " + message);
  process.exitCode = 1;
};

export function assembleCandidate(spec, manifest, inventory) {
  const errors = [];
  const need = (condition, message) => { if (!condition) errors.push(message); };
  need(isObject(spec), "candidate spec must be a JSON object");
  need(isObject(manifest), "evidence manifest must be a JSON object");
  need(isObject(inventory), "structural inventory must be a JSON object");
  if (!isObject(spec) || !isObject(manifest) || !isObject(inventory)) throw new Error(errors.join("\n"));
  need(spec.schema_version === 1, "candidate spec schema_version must be 1");
  need(manifest.schema_version === 1 && manifest.manifest_type === "repository-evidence-pointers", "unsupported evidence manifest schema/type");
  need(inventory.schema_version === 1 && inventory.inventory_type === "structural-only", "unsupported inventory schema/type");
  need(isObject(manifest.repository), "manifest.repository is missing");
  need(Array.isArray(manifest.evidence), "manifest.evidence must be an array");
  need(Array.isArray(inventory.files), "inventory.files must be an array");
  const source = spec.source;
  need(isObject(source), "spec.source must be an object");
  if (isObject(source) && isObject(manifest.repository)) {
    need(source.repository_url === manifest.repository.url, "candidate source URL must exactly match evidence manifest repository URL");
    need(typeof source.revision === "string" && source.revision.toLowerCase() === manifest.repository.revision?.toLowerCase(), "candidate revision must exactly match evidence manifest revision");
    need(source.inspected_at === manifest.repository.inspected_at || Date.parse(source.inspected_at) === Date.parse(manifest.repository.inspected_at), "candidate inspected_at must match evidence manifest inspected_at");
  }
  const inventoryByPath = new Map(inventory.files.filter(isObject).map((f) => [f.path, f]));
  const claimsById = new Map();
  for (const claim of manifest.evidence) {
    if (!isObject(claim) || !nonEmpty(claim.id)) continue;
    if (claimsById.has(claim.id)) errors.push("evidence manifest contains duplicate claim id: " + claim.id);
    claimsById.set(claim.id, claim);
    const file = inventoryByPath.get(claim.source_ref);
    need(Boolean(file), "evidence path is missing from structural inventory: " + claim.source_ref);
    if (file) need(file.sha256 === claim.file_sha256, "inventory SHA-256 does not match evidence manifest for: " + claim.source_ref);
    need(claim.review_status === "needs-human-inspection", "evidence claim must remain marked needs-human-inspection: " + claim.id);
  }
  need(Array.isArray(spec.evidence_refs) && spec.evidence_refs.length >= 2, "spec.evidence_refs needs at least two manifest claim IDs");
  const seen = new Set();
  const evidence = [];
  for (const id of (Array.isArray(spec.evidence_refs) ? spec.evidence_refs : [])) {
    need(nonEmpty(id), "every evidence_refs entry must be a claim ID");
    need(!seen.has(id), "duplicate evidence_refs entry: " + id);
    seen.add(id);
    const claim = claimsById.get(id);
    need(Boolean(claim), "evidence_refs contains unknown manifest claim ID: " + id);
    if (!claim) continue;
    evidence.push({
      source_ref: claim.source_ref + "#L" + claim.start_line + "-L" + claim.end_line + " [claim:" + claim.id + "]",
      supports: claim.claim,
      kind: claim.kind
    });
  }
  if (errors.length) throw new Error(errors.join("\n"));
  const candidate = {
    schema_version: 1,
    candidate_id: spec.candidate_id,
    source: {
      repository_url: source.repository_url,
      revision: source.revision,
      inspected_at: source.inspected_at,
      license_status: source.license_status,
      license_evidence: source.license_evidence
    },
    skill: spec.skill,
    evidence,
    deduplication: spec.deduplication,
    decision: ["draft", "hold", "reject"].includes(spec.decision) ? spec.decision : "hold",
    review_notes: (nonEmpty(spec.review_notes) ? spec.review_notes + " " : "") +
      "Assembled from pinned evidence pointers; every pointer still requires human inspection. Assembly never grants approval."
  };
  return candidate;
}

function runValidator(candidate) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const validator = path.join(dir, "validate-repository-skill-candidate.mjs");
  return mkdtemp(path.join(os.tmpdir(), "candidate-assembly-")).then(async (tmp) => {
    try {
      const file = path.join(tmp, "candidate.json");
      await writeFile(file, JSON.stringify(candidate, null, 2) + "\n", "utf8");
      const result = spawnSync(process.execPath, [validator, file], { encoding: "utf8", timeout: 10000 });
      return { status: result.status, stdout: result.stdout, stderr: result.stderr, error: result.error?.message };
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
}

async function selfTest() {
  const spec = {
    schema_version: 1, candidate_id: "documented-cli-workflow",
    source: { repository_url: "https://github.com/example/project", revision: "a".repeat(40), inspected_at: "2026-10-27", license_status: "unknown", license_evidence: ["LICENSE"] },
    skill: { name: "documented-cli-workflow", user_intent: "Safely complete a documented CLI workflow.", positive_triggers: ["Run documented export", "Use repository CLI instructions"], negative_triggers: ["Explain CLI concepts only", "Debug unrelated crash"], inputs: ["Checkout", "Task"], workflow_steps: ["Inspect docs", "Check prerequisites", "Verify output"], output_contract: "Return commands and evidence", acceptance_criteria: ["Flags match docs", "Output matches example"], stop_conditions: ["Stop when source is unclear"] },
    evidence_refs: ["cli-docs", "cli-test"],
    deduplication: { exact_check: "not-run", semantic_review: "not-run", compared_skills: [] },
    decision: "ready-for-human-review",
    review_notes: "Fixture only."
  };
  const manifest = { schema_version: 1, manifest_type: "repository-evidence-pointers", repository: { url: "https://github.com/example/project", revision: "a".repeat(40), inspected_at: "2026-10-27T00:00:00.000Z" }, evidence: [
    { id: "cli-docs", claim: "CLI flags are documented", source_ref: "docs/cli.md", kind: "documentation", start_line: 1, end_line: 2, file_sha256: "b".repeat(64), review_status: "needs-human-inspection" },
    { id: "cli-test", claim: "CLI output is tested", source_ref: "tests/cli.test.js", kind: "test", start_line: 1, end_line: 2, file_sha256: "c".repeat(64), review_status: "needs-human-inspection" }
  ] };
  const inventory = { schema_version: 1, inventory_type: "structural-only", files: [
    { path: "docs/cli.md", sha256: "b".repeat(64) }, { path: "tests/cli.test.js", sha256: "c".repeat(64) }
  ] };
  const result = assembleCandidate(spec, manifest, inventory);
  assert.equal(result.decision, "hold", "assembly must downgrade approval to hold");
  assert.equal(result.evidence.length, 2);
  assert.ok(result.evidence[0].source_ref.includes("#L1-L2"));
  assert.throws(() => assembleCandidate({ ...spec, source: { ...spec.source, revision: "b".repeat(40) } }, manifest, inventory), /revision/);
  assert.throws(() => assembleCandidate({ ...spec, evidence_refs: ["cli-docs", "missing"] }, manifest, inventory), /unknown manifest claim ID/);
  assert.throws(() => assembleCandidate(spec, manifest, { ...inventory, files: [{ path: "docs/cli.md", sha256: "d".repeat(64) }, inventory.files[1]] }), /SHA-256 does not match/);
  assert.throws(() => assembleCandidate({ ...spec, evidence_refs: ["cli-docs", "cli-docs"] }, manifest, inventory), /duplicate evidence_refs/);
  console.log("Candidate assembly self-test passed (revision mismatch, unknown/duplicate refs, inventory hash mismatch, forced hold).");
}

if (process.argv.includes("--self-test")) {
  await selfTest();
} else {
  const [specPath, manifestPath, inventoryPath, outputPath] = process.argv.slice(2);
  if (!specPath || !manifestPath || !inventoryPath || !outputPath) {
    console.error("Usage: node tools/assemble-repository-skill-candidate.mjs <spec.json> <evidence-manifest.json> <inventory.json> <output-candidate.json>");
    process.exit(2);
  }
  try {
    const [spec, manifest, inventory] = await Promise.all([
      readFile(specPath, "utf8").then(JSON.parse),
      readFile(manifestPath, "utf8").then(JSON.parse),
      readFile(inventoryPath, "utf8").then(JSON.parse)
    ]);
    const candidate = assembleCandidate(spec, manifest, inventory);
    const checked = await runValidator(candidate);
    if (checked.status !== 0) throw new Error("candidate validator rejected assembled record:\n" + (checked.stderr || checked.stdout || checked.error || "unknown validation failure"));
    await writeFile(outputPath, JSON.stringify(candidate, null, 2) + "\n", "utf8");
    console.log("Assembled candidate " + candidate.candidate_id + " and passed structural validation. Decision remains " + candidate.decision + "; human review is required.");
  } catch (error) {
    fail([error.message]);
  }
}
