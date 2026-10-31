#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

export function scaffoldDraft(discovery, manifest, opportunityId, selectedClaimIds) {
  if (!isObject(discovery) || discovery.schema_version !== 1 || discovery.report_type !== "repository-skill-opportunity-discovery" || !isObject(discovery.repository) || !Array.isArray(discovery.opportunities)) {
    throw new Error("discovery must be a schema v1 repository-skill-opportunity-discovery report");
  }
  if (!isObject(manifest) || manifest.schema_version !== 1 || manifest.manifest_type !== "repository-evidence-pointers" || !isObject(manifest.repository) || !Array.isArray(manifest.evidence)) {
    throw new Error("manifest must be a schema v1 repository-evidence-pointers manifest");
  }
  for (const key of ["url", "revision", "inspected_at"]) {
    if (!nonEmpty(discovery.repository[key]) || discovery.repository[key] !== manifest.repository[key]) {
      throw new Error(`discovery/manifest repository metadata mismatch: ${key}`);
    }
  }
  if (!/^[0-9a-f]{40}$/i.test(manifest.repository.revision)) throw new Error("repository revision must be a full 40-character commit SHA");
  if (!nonEmpty(opportunityId)) throw new Error("opportunity-id is required");
  const opportunity = discovery.opportunities.find((item) => isObject(item) && item.opportunity_id === opportunityId);
  if (!opportunity) throw new Error(`opportunity not found: ${opportunityId}`);
  if (!Array.isArray(selectedClaimIds) || selectedClaimIds.length === 0 || selectedClaimIds.some((id) => !nonEmpty(id))) {
    throw new Error("select at least one explicit evidence claim ID with --claim-ids");
  }
  if (new Set(selectedClaimIds).size !== selectedClaimIds.length) throw new Error("claim IDs must be unique");
  const opportunityClaims = new Set(Array.isArray(opportunity.evidence_claim_ids) ? opportunity.evidence_claim_ids : []);
  const manifestClaims = new Map(manifest.evidence.filter(isObject).map((item) => [item.id, item]));
  const evidence = selectedClaimIds.map((id) => {
    if (!opportunityClaims.has(id)) throw new Error(`claim is not referenced by selected opportunity: ${id}`);
    const item = manifestClaims.get(id);
    if (!item) throw new Error(`claim ID missing from evidence manifest: ${id}`);
    if (!nonEmpty(item.source_ref) || !Number.isInteger(item.start_line) || !Number.isInteger(item.end_line) || item.start_line < 1 || item.end_line < item.start_line) {
      throw new Error(`claim has invalid source pointer or line range: ${id}`);
    }
    return { claim_id: id, source_ref: item.source_ref, start_line: item.start_line, end_line: item.end_line, claim: nonEmpty(item.claim) ? item.claim : "TODO: human must verify this claim against the pinned source." };
  });
  const slug = opportunityId.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    schema_version: 1,
    artifact_type: "repository-skill-draft-specification",
    status: "draft-needs-human-authoring-and-review",
    approval: "not-approved",
    skill: {
      name: `TODO: define a narrow skill name for ${opportunity.title ?? opportunityId}`,
      slug: `TODO-${slug}`,
      purpose: "TODO: state the specific user problem and intended outcome; do not infer this from path names.",
      user_intent: "TODO: describe an explicit user request that should activate this skill.",
      positive_triggers: ["TODO: add a concrete positive trigger", "TODO: add a second positive trigger"],
      negative_triggers: ["TODO: add a nearby request that must not activate this skill", "TODO: add a second negative trigger"],
      inputs: ["TODO: define required inputs and validation rules"],
      workflow_steps: ["TODO: add at least three ordered, evidence-backed steps"],
      output_contract: "TODO: specify the output format, required fields, and completion criteria.",
      acceptance_criteria: ["TODO: define a verifiable success condition", "TODO: define a second verifiable success condition"],
      stop_conditions: ["TODO: define when to stop, ask for clarification, or hand off"],
      license_review: { status: "unverified", evidence: "TODO: record license and applicable provenance evidence" },
      exact_duplicate_review: "not-reviewed",
      semantic_duplicate_review: "not-reviewed",
      human_review_notes: "TODO: inspect every cited source range, validate workflow claims, and review provenance/license before submission."
    },
    provenance: {
      repository_url: manifest.repository.url,
      pinned_revision: manifest.repository.revision,
      inspected_at: manifest.repository.inspected_at,
      discovery_opportunity_id: opportunity.opportunity_id,
      discovery_signal_type: opportunity.signal_type ?? "unknown",
      evidence_pointers: evidence,
      evidence_is_not_approval: true
    },
    guardrails: {
      draft_only: true,
      inferred_workflow_steps: false,
      license_verified: false,
      duplicate_review_completed: false,
      candidate_gate_passed: false,
      canonical_skill_created: false,
      canonical_counts_modified: false,
      requires_human_review: true
    }
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const positional = args.filter((arg) => !arg.startsWith("--"));
  const [discoveryPath, manifestPath, opportunityId] = positional;
  const claimIndex = args.indexOf("--claim-ids");
  const outputIndex = args.indexOf("--output");
  const claimsArg = claimIndex >= 0 ? args[claimIndex + 1] : null;
  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
  if (!discoveryPath || !manifestPath || !opportunityId || !claimsArg || (outputIndex >= 0 && !outputPath)) {
    throw new Error("Usage: node tools/scaffold-repository-skill-spec.mjs <discovery.json> <manifest.json> <opportunity-id> --claim-ids id1,id2 [--output draft-spec.json]");
  }
  const [discoveryText, manifestText] = await Promise.all([readFile(discoveryPath, "utf8"), readFile(manifestPath, "utf8")]);
  const draft = scaffoldDraft(JSON.parse(discoveryText), JSON.parse(manifestText), opportunityId, claimsArg.split(",").map((id) => id.trim()));
  const output = JSON.stringify(draft, null, 2) + "\n";
  if (outputPath) await writeFile(outputPath, output, { flag: "wx" });
  else process.stdout.write(output);
}

function selfTest() {
  const revision = "a".repeat(40);
  const manifest = { schema_version: 1, manifest_type: "repository-evidence-pointers", repository: { url: "https://github.com/example/repo", revision, inspected_at: "2026-10-27T00:00:00.000Z" }, evidence: [
    { id: "routes", source_ref: "src/api/routes.ts", claim: "Routes are declared", start_line: 1, end_line: 4 },
    { id: "docs", source_ref: "docs/api.md", claim: "API usage is documented", start_line: 2, end_line: 5 }
  ] };
  const discovery = { schema_version: 1, report_type: "repository-skill-opportunity-discovery", repository: { ...manifest.repository }, opportunities: [
    { opportunity_id: "api-contracts", title: "API and contract workflows", signal_type: "path-and-file-category-heuristic", evidence_claim_ids: ["routes", "docs"] }
  ] };
  const draft = scaffoldDraft(discovery, manifest, "api-contracts", ["routes", "docs"]);
  assert.equal(draft.status, "draft-needs-human-authoring-and-review");
  assert.equal(draft.approval, "not-approved");
  assert.equal(draft.provenance.evidence_pointers.length, 2);
  assert.equal(draft.guardrails.canonical_skill_created, false);
  assert.equal(draft.guardrails.candidate_gate_passed, false);
  assert.match(draft.skill.purpose, /^TODO:/);
  assert.throws(() => scaffoldDraft(discovery, manifest, "missing-opportunity", ["routes"]), /opportunity not found/);
  assert.throws(() => scaffoldDraft(discovery, manifest, "api-contracts", []), /at least one explicit evidence/);
  assert.throws(() => scaffoldDraft(discovery, manifest, "api-contracts", ["unknown"]), /not referenced by selected opportunity/);
  assert.throws(() => scaffoldDraft(discovery, manifest, "api-contracts", ["routes", "routes"]), /unique/);
  assert.throws(() => scaffoldDraft(discovery, { ...manifest, repository: { ...manifest.repository, revision: "b".repeat(40) } }, "api-contracts", ["routes"]), /metadata mismatch/);
  assert.throws(() => scaffoldDraft(discovery, { ...manifest, evidence: [] }, "api-contracts", ["routes"]), /missing from evidence manifest/);
  assert.throws(() => scaffoldDraft(discovery, { ...manifest, evidence: [{ id: "routes", source_ref: "../secret", start_line: 0, end_line: 1 }] }, "api-contracts", ["routes"]), /invalid source pointer/);
  console.log("Draft specification scaffolder self-test passed (metadata pinning, opportunity and evidence references, TODO-only content, draft/no-approval guardrails).");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
