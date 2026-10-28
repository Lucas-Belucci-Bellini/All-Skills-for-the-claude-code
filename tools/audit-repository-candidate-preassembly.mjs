#!/usr/bin/env node
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";

const record = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const text = (v) => typeof v === "string" && v.trim().length > 0;

export function auditCandidatePreassembly(preparation, manifest, inventory) {
  const errors = [];
  const add = (ok, message) => { if (!ok) errors.push(message); };
  add(record(preparation), "preparation report must be an object");
  add(record(manifest), "evidence manifest must be an object");
  add(record(inventory), "structural inventory must be an object");
  if (![preparation, manifest, inventory].every(record)) return report(errors);
  add(preparation.report_type === "repository-draft-candidate-assembly-preparation", "unexpected preparation report type");
  add(preparation.preparation === "ready-for-existing-assembly-tool", "preparation report is not eligible for assembly");
  add(preparation.approval === "not-approved", "preparation must remain not-approved");
  add(preparation.candidate_created === false, "preparation must not claim a candidate was created");
  add(preparation.candidate_gate_passed === false, "candidate gate must not be marked passed");
  add(preparation.canonical_skill_created === false, "canonical skill must not be marked created");
  add(preparation.canonical_counts_modified === false, "canonical counts must remain unchanged");
  add(preparation.human_review_required === true, "human review must remain required");
  const candidate = preparation.candidate_spec;
  add(record(candidate), "candidate_spec is missing or invalid");
  add(manifest.schema_version === 1 && manifest.manifest_type === "repository-evidence-pointers", "unsupported evidence manifest schema/type");
  add(inventory.schema_version === 1 && inventory.inventory_type === "structural-only", "unsupported structural inventory schema/type");
  if (!record(candidate)) return report(errors);
  const source = candidate.source;
  add(record(source), "candidate_spec.source is missing");
  add(candidate.decision === "hold", "candidate decision must be forced to hold");
  add(candidate.approval === undefined, "candidate spec must not introduce an approval field");
  add(Array.isArray(candidate.evidence_refs) && candidate.evidence_refs.length >= 2, "candidate spec needs at least two evidence references");
  if (record(source) && record(manifest.repository)) {
    add(source.repository_url === manifest.repository.url, "repository URL does not match pinned evidence manifest");
    add(typeof source.revision === "string" && source.revision.toLowerCase() === String(manifest.repository.revision).toLowerCase(), "revision does not match pinned evidence manifest");
    add(Date.parse(source.inspected_at) === Date.parse(manifest.repository.inspected_at), "inspection timestamp does not match pinned evidence manifest");
  } else errors.push("source metadata or manifest repository metadata is missing");
  const claims = new Map();
  if (Array.isArray(manifest.evidence)) {
    for (const claim of manifest.evidence) {
      if (!record(claim) || !text(claim.id)) { errors.push("manifest contains an invalid evidence claim"); continue; }
      if (claims.has(claim.id)) errors.push("manifest contains duplicate claim ID: " + claim.id);
      claims.set(claim.id, claim);
    }
  } else errors.push("manifest.evidence must be an array");
  const files = new Map();
  if (Array.isArray(inventory.files)) {
    for (const file of inventory.files) if (record(file) && text(file.path)) files.set(file.path, file);
  } else errors.push("inventory.files must be an array");
  const refs = Array.isArray(candidate.evidence_refs) ? candidate.evidence_refs : [];
  const seen = new Set();
  for (const id of refs) {
    add(text(id), "evidence reference IDs must be non-empty strings");
    add(!seen.has(id), "duplicate evidence reference ID: " + id);
    seen.add(id);
    const claim = claims.get(id);
    add(Boolean(claim), "evidence reference not found in manifest: " + id);
    if (!claim) continue;
    const file = files.get(claim.source_ref);
    add(Boolean(file), "evidence path absent from inventory: " + claim.source_ref);
    if (file) add(file.sha256 === claim.file_sha256, "file hash mismatch for evidence path: " + claim.source_ref);
    add(claim.review_status === "needs-human-inspection", "evidence claim must remain marked needs-human-inspection: " + id);
    const kind = candidate.evidence?.find((e) => typeof e?.source_ref === "string" && e.source_ref.includes("[claim:" + id + "]"))?.kind;
    add(kind === claim.kind, "prepared evidence kind does not match manifest claim: " + id);
  }
  add(Array.isArray(candidate.evidence) && candidate.evidence.length === refs.length, "prepared evidence entries must correspond one-to-one with evidence_refs");
  return {
    schema_version: 1,
    report_type: "repository-candidate-preassembly-audit",
    status: errors.length ? "blocked" : "consistent-for-existing-assembly-tool",
    approval: "not-approved",
    candidate_created: false,
    candidate_gate_passed: false,
    canonical_skill_created: false,
    canonical_counts_modified: false,
    human_review_required: true,
    errors,
    warnings: [
      "This is a consistency audit only; it does not establish that evidence claims are true or licenses are compatible.",
      "A passing report is not approval and does not run candidate assembly or the candidate gate."
    ]
  };
}

function report(errors) {
  return {
    schema_version: 1, report_type: "repository-candidate-preassembly-audit",
    status: "blocked", approval: "not-approved", candidate_created: false,
    candidate_gate_passed: false, canonical_skill_created: false,
    canonical_counts_modified: false, human_review_required: true, errors,
    warnings: ["A blocked report does not create or approve a candidate."]
  };
}

function fixture() {
  const revision = "a".repeat(40);
  const manifest = { schema_version: 1, manifest_type: "repository-evidence-pointers", repository: { url: "https://github.com/example/repo", revision, inspected_at: "2026-10-27T00:00:00.000Z" }, evidence: [
    { id: "route-docs", source_ref: "docs/routes.md", start_line: 1, end_line: 4, claim: "Routes are documented.", kind: "documentation", file_sha256: "b".repeat(64), review_status: "needs-human-inspection" },
    { id: "route-tests", source_ref: "tests/routes.test.js", start_line: 2, end_line: 8, claim: "Routes are tested.", kind: "test", file_sha256: "c".repeat(64), review_status: "needs-human-inspection" }
  ] };
  const inventory = { schema_version: 1, inventory_type: "structural-only", files: [
    { path: "docs/routes.md", sha256: "b".repeat(64) }, { path: "tests/routes.test.js", sha256: "c".repeat(64) }
  ] };
  const preparation = { schema_version: 1, report_type: "repository-draft-candidate-assembly-preparation", preparation: "ready-for-existing-assembly-tool", approval: "not-approved", candidate_created: false, candidate_gate_passed: false, canonical_skill_created: false, canonical_counts_modified: false, human_review_required: true, candidate_spec: {
    candidate_id: "route-contract-review", source: { repository_url: manifest.repository.url, revision, inspected_at: manifest.repository.inspected_at, license_status: "review-required", license_evidence: ["LICENSE reviewed by a human"] },
    evidence_refs: ["route-docs", "route-tests"], evidence: [
      { source_ref: "docs/routes.md#L1-L4 [claim:route-docs]", supports: "Routes are documented.", kind: "documentation" },
      { source_ref: "tests/routes.test.js#L2-L8 [claim:route-tests]", supports: "Routes are tested.", kind: "test" }
    ], decision: "hold"
  } };
  return { preparation, manifest, inventory };
}

function selfTest() {
  const f = fixture();
  assert.equal(auditCandidatePreassembly(f.preparation, f.manifest, f.inventory).status, "consistent-for-existing-assembly-tool");
  const changedHash = structuredClone(f); changedHash.inventory.files[0].sha256 = "d".repeat(64);
  assert.equal(auditCandidatePreassembly(changedHash.preparation, changedHash.manifest, changedHash.inventory).status, "blocked");
  const changedRevision = structuredClone(f); changedRevision.preparation.candidate_spec.source.revision = "e".repeat(40);
  assert.equal(auditCandidatePreassembly(changedRevision.preparation, changedRevision.manifest, changedRevision.inventory).status, "blocked");
  const approved = structuredClone(f); approved.preparation.candidate_spec.decision = "ready-for-human-review";
  assert.equal(auditCandidatePreassembly(approved.preparation, approved.manifest, approved.inventory).status, "blocked");
  const duplicate = structuredClone(f); duplicate.preparation.candidate_spec.evidence_refs.push("route-docs");
  assert.equal(auditCandidatePreassembly(duplicate.preparation, duplicate.manifest, duplicate.inventory).status, "blocked");
  const missing = structuredClone(f); missing.manifest.evidence.pop();
  assert.equal(auditCandidatePreassembly(missing.preparation, missing.manifest, missing.inventory).status, "blocked");
  console.log("Candidate preassembly audit self-test passed (consistent fixture, hash/revision mismatch, approval escalation, duplicate/missing evidence).");
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const [prepPath, manifestPath, inventoryPath] = args;
  if (!prepPath || !manifestPath || !inventoryPath) throw new Error("Usage: node tools/audit-repository-candidate-preassembly.mjs <preparation-report.json> <evidence-manifest.json> <inventory.json>");
  const [prep, manifest, inventory] = await Promise.all([prepPath, manifestPath, inventoryPath].map((p) => readFile(p, "utf8").then(JSON.parse)));
  const result = auditCandidatePreassembly(prep, manifest, inventory);
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  if (result.status === "blocked") process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
