#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const unresolved = (v) => typeof v === "string" && (/^\s*TODO\b/i.test(v) || /\bTODO:\s*/i.test(v));
const validText = (v) => nonEmpty(v) && !unresolved(v);
const validList = (v, min) => Array.isArray(v) && v.length >= min && v.every(validText);

export function validateDraftSpec(spec) {
  const errors = [];
  const warnings = [];
  const add = (condition, message) => { if (!condition) errors.push(message); };
  add(isObject(spec), "artifact must be a JSON object");
  if (!isObject(spec)) return result(errors, warnings);
  add(spec.schema_version === 1, "schema_version must be 1");
  add(spec.artifact_type === "repository-skill-draft-specification", "artifact_type is invalid");
  add(spec.status === "draft-needs-human-authoring-and-review", "status must remain draft-needs-human-authoring-and-review");
  add(spec.approval === "not-approved", "approval must remain not-approved");
  const skill = spec.skill;
  const provenance = spec.provenance;
  const guards = spec.guardrails;
  add(isObject(skill), "skill object is required");
  add(isObject(provenance), "provenance object is required");
  add(isObject(guards), "guardrails object is required");
  if (!isObject(skill) || !isObject(provenance) || !isObject(guards)) return result(errors, warnings);
  add(validText(skill.name), "skill.name is missing or still a TODO");
  add(validText(skill.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.slug), "skill.slug must be a lowercase kebab-case slug, without TODO placeholders");
  add(validText(skill.purpose), "skill.purpose is missing or still a TODO");
  add(validText(skill.user_intent), "skill.user_intent is missing or still a TODO");
  add(validList(skill.positive_triggers, 2), "positive_triggers needs at least two non-placeholder entries");
  add(validList(skill.negative_triggers, 2), "negative_triggers needs at least two non-placeholder entries");
  add(validList(skill.inputs, 1), "inputs needs at least one non-placeholder entry");
  add(validList(skill.workflow_steps, 3), "workflow_steps needs at least three non-placeholder steps");
  add(validText(skill.output_contract), "output_contract is missing or still a TODO");
  add(validList(skill.acceptance_criteria, 2), "acceptance_criteria needs at least two non-placeholder criteria");
  add(validList(skill.stop_conditions, 1), "stop_conditions needs at least one non-placeholder condition");
  add(isObject(skill.license_review), "license_review object is required");
  if (isObject(skill.license_review)) {
    add(skill.license_review.status === "verified-compatible", "license_review.status must be verified-compatible");
    add(validText(skill.license_review.evidence), "license review evidence is missing or still a TODO");
  }
  add(skill.exact_duplicate_review === "passed-no-exact-duplicate", "exact_duplicate_review must be passed-no-exact-duplicate");
  add(skill.semantic_duplicate_review === "reviewed-distinct", "semantic_duplicate_review must be reviewed-distinct");
  add(validText(skill.human_review_notes), "human_review_notes must record completed human review, not a TODO");
  add(/^https:\/\//.test(provenance.repository_url ?? ""), "provenance.repository_url must use HTTPS");
  add(/^[0-9a-f]{40}$/i.test(provenance.pinned_revision ?? ""), "provenance.pinned_revision must be a full 40-character commit SHA");
  add(validText(provenance.inspected_at), "provenance.inspected_at is required");
  add(validText(provenance.discovery_opportunity_id), "provenance.discovery_opportunity_id is required");
  add(Array.isArray(provenance.evidence_pointers) && provenance.evidence_pointers.length > 0, "at least one evidence pointer is required");
  if (Array.isArray(provenance.evidence_pointers)) {
    const seen = new Set();
    provenance.evidence_pointers.forEach((e, i) => {
      add(isObject(e), `evidence_pointers[${i}] must be an object`);
      if (!isObject(e)) return;
      add(validText(e.claim_id), `evidence_pointers[${i}].claim_id is required`);
      if (seen.has(e.claim_id)) errors.push(`duplicate evidence claim ID: ${e.claim_id}`);
      seen.add(e.claim_id);
      add(validText(e.source_ref) && !e.source_ref.startsWith("/") && !e.source_ref.split("/").includes(".."), `evidence_pointers[${i}].source_ref must be a safe repository-relative path`);
      add(Number.isInteger(e.start_line) && e.start_line > 0 && Number.isInteger(e.end_line) && e.end_line >= e.start_line && e.end_line - e.start_line < 80, `evidence_pointers[${i}] has an invalid line range (maximum 80 lines)`);
      add(validText(e.claim), `evidence_pointers[${i}].claim is missing or still a TODO`);
    });
  }
  add(provenance.evidence_is_not_approval === true, "evidence_is_not_approval must be true");
  for (const key of ["draft_only", "requires_human_review"]) add(guards[key] === true, `guardrails.${key} must remain true`);
  for (const key of ["inferred_workflow_steps", "license_verified", "duplicate_review_completed", "candidate_gate_passed", "canonical_skill_created", "canonical_counts_modified"]) {
    add(guards[key] === false, `guardrails.${key} must remain false; this validator never promotes or publishes a skill`);
  }
  warnings.push("Passing this validator only means the specification is structurally complete for human review; it does not establish correctness, licensing, originality, or approval.");
  return result(errors, warnings);
}

function result(errors, warnings) {
  return { valid: errors.length === 0, status: errors.length === 0 ? "complete-for-human-review" : "incomplete-draft", approval: "not-approved", errors, warnings };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) throw new Error("Usage: node tools/validate-repository-skill-draft-spec.mjs <draft-spec.json>");
  const spec = JSON.parse(await readFile(file, "utf8"));
  const report = validateDraftSpec(spec);
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  if (!report.valid) process.exitCode = 1;
}

function selfTest() {
  const valid = {
    schema_version: 1, artifact_type: "repository-skill-draft-specification",
    status: "draft-needs-human-authoring-and-review", approval: "not-approved",
    skill: {
      name: "Trace API route contracts", slug: "trace-api-route-contracts",
      purpose: "Map API routes to documented request and response contracts.",
      user_intent: "When asked to audit API route behavior against the repository's contract docs.",
      positive_triggers: ["Map route handlers to request schemas.", "Compare route responses with documented contracts."],
      negative_triggers: ["Do not implement a new endpoint.", "Do not infer behavior from filenames alone."],
      inputs: ["Repository checkout pinned to the supplied commit."],
      workflow_steps: ["Inspect route declarations.", "Read referenced schemas and tests.", "Report each verified mismatch with file and line references."],
      output_contract: "Return a Markdown table of route, evidence, mismatch, and confidence.",
      acceptance_criteria: ["Every reported mismatch cites a source range.", "Unverified assumptions are marked explicitly."],
      stop_conditions: ["Stop and request access if required source files are unavailable."],
      license_review: { status: "verified-compatible", evidence: "Human checked LICENSE and dependency provenance on the pinned revision." },
      exact_duplicate_review: "passed-no-exact-duplicate",
      semantic_duplicate_review: "reviewed-distinct",
      human_review_notes: "Reviewer inspected the cited ranges and completed license and duplicate review."
    },
    provenance: {
      repository_url: "https://github.com/example/repo", pinned_revision: "a".repeat(40), inspected_at: "2026-10-27",
      discovery_opportunity_id: "api-contracts", evidence_is_not_approval: true,
      evidence_pointers: [{ claim_id: "routes", source_ref: "src/api/routes.ts", start_line: 1, end_line: 12, claim: "Route handlers are declared in this module." }]
    },
    guardrails: { draft_only: true, inferred_workflow_steps: false, license_verified: false, duplicate_review_completed: false, candidate_gate_passed: false, canonical_skill_created: false, canonical_counts_modified: false, requires_human_review: true }
  };
  const pass = validateDraftSpec(valid);
  assert.equal(pass.valid, true);
  assert.equal(pass.status, "complete-for-human-review");
  assert.equal(pass.approval, "not-approved");
  const todo = structuredClone(valid); todo.skill.workflow_steps[1] = "TODO: inspect";
  assert.equal(validateDraftSpec(todo).valid, false);
  const noEvidence = structuredClone(valid); noEvidence.provenance.evidence_pointers = [];
  assert.equal(validateDraftSpec(noEvidence).valid, false);
  const unsafePath = structuredClone(valid); unsafePath.provenance.evidence_pointers[0].source_ref = "../outside";
  assert.equal(validateDraftSpec(unsafePath).valid, false);
  const badRange = structuredClone(valid); badRange.provenance.evidence_pointers[0].end_line = 100;
  assert.equal(validateDraftSpec(badRange).valid, false);
  const falseApproval = structuredClone(valid); falseApproval.approval = "approved";
  assert.equal(validateDraftSpec(falseApproval).valid, false);
  const promoted = structuredClone(valid); promoted.guardrails.canonical_skill_created = true;
  assert.equal(validateDraftSpec(promoted).valid, false);
  const duplicate = structuredClone(valid); duplicate.provenance.evidence_pointers.push({ ...duplicate.provenance.evidence_pointers[0] });
  assert.equal(validateDraftSpec(duplicate).valid, false);
  console.log("Draft spec validator self-test passed (required fields, TODO detection, evidence pointers, line bounds, duplicate IDs, and no-approval guardrails).");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
