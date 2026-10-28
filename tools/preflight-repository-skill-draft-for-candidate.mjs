#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { validateDraftSpec } from "./validate-repository-skill-draft-spec.mjs";

export function preflightDraftForCandidate(spec) {
  const validation = validateDraftSpec(spec);
  const passed = validation.valid === true;
  return {
    schema_version: 1,
    report_type: "repository-skill-draft-candidate-preflight",
    candidate_preflight: passed ? "passed" : "blocked",
    draft_validation_status: validation.status,
    approval: "not-approved",
    candidate_created: false,
    candidate_gate_passed: false,
    canonical_skill_created: false,
    canonical_counts_modified: false,
    human_review_required: true,
    errors: validation.errors,
    warnings: [
      ...validation.warnings,
      "Preflight only checks draft-spec structure. It does not create a candidate, run the candidate gate, verify evidence truth, establish license compatibility, or decide semantic originality."
    ]
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const positional = args.filter((arg) => !arg.startsWith("--"));
  const inputPath = positional[0];
  const outputIndex = args.indexOf("--output");
  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
  if (!inputPath || (outputIndex >= 0 && !outputPath)) {
    throw new Error("Usage: node tools/preflight-repository-skill-draft-for-candidate.mjs <draft-spec.json> [--output report.json]");
  }
  const spec = JSON.parse(await readFile(inputPath, "utf8"));
  const report = preflightDraftForCandidate(spec);
  const output = JSON.stringify(report, null, 2) + "\n";
  if (outputPath) await writeFile(outputPath, output, { flag: "wx" });
  else process.stdout.write(output);
  if (report.candidate_preflight !== "passed") process.exitCode = 1;
}

function validDraft() {
  return {
    schema_version: 1,
    artifact_type: "repository-skill-draft-specification",
    status: "draft-needs-human-authoring-and-review",
    approval: "not-approved",
    skill: {
      name: "Trace API route contracts",
      slug: "trace-api-route-contracts",
      purpose: "Map API routes to documented request and response contracts.",
      user_intent: "When asked to audit API route behavior against repository contract documentation.",
      positive_triggers: ["Map route handlers to request schemas.", "Compare route responses with documented contracts."],
      negative_triggers: ["Do not implement a new endpoint.", "Do not infer behavior from filenames alone."],
      inputs: ["Repository checkout pinned to the supplied commit."],
      workflow_steps: ["Inspect route declarations.", "Read referenced schemas and tests.", "Report verified mismatches with file and line references."],
      output_contract: "Return a Markdown table of route, evidence, mismatch, and confidence.",
      acceptance_criteria: ["Every reported mismatch cites a source range.", "Unverified assumptions are marked explicitly."],
      stop_conditions: ["Stop and request access if required source files are unavailable."],
      license_review: { status: "verified-compatible", evidence: "Human checked LICENSE and provenance on the pinned revision." },
      exact_duplicate_review: "passed-no-exact-duplicate",
      semantic_duplicate_review: "reviewed-distinct",
      human_review_notes: "Reviewer inspected cited ranges and completed license and duplicate review."
    },
    provenance: {
      repository_url: "https://github.com/example/repo",
      pinned_revision: "a".repeat(40),
      inspected_at: "2026-10-27",
      discovery_opportunity_id: "api-contracts",
      evidence_is_not_approval: true,
      evidence_pointers: [{ claim_id: "routes", source_ref: "src/api/routes.ts", start_line: 1, end_line: 12, claim: "Route handlers are declared in this module." }]
    },
    guardrails: {
      draft_only: true, inferred_workflow_steps: false, license_verified: false,
      duplicate_review_completed: false, candidate_gate_passed: false,
      canonical_skill_created: false, canonical_counts_modified: false, requires_human_review: true
    }
  };
}

function selfTest() {
  const complete = preflightDraftForCandidate(validDraft());
  assert.equal(complete.candidate_preflight, "passed");
  assert.equal(complete.approval, "not-approved");
  assert.equal(complete.candidate_created, false);
  assert.equal(complete.candidate_gate_passed, false);
  assert.equal(complete.canonical_skill_created, false);
  assert.equal(complete.canonical_counts_modified, false);

  const todo = validDraft();
  todo.skill.purpose = "TODO: define purpose";
  const blockedTodo = preflightDraftForCandidate(todo);
  assert.equal(blockedTodo.candidate_preflight, "blocked");
  assert.ok(blockedTodo.errors.some((error) => error.includes("purpose")));

  const noEvidence = validDraft();
  noEvidence.provenance.evidence_pointers = [];
  assert.equal(preflightDraftForCandidate(noEvidence).candidate_preflight, "blocked");

  const unsafe = validDraft();
  unsafe.provenance.evidence_pointers[0].source_ref = "../outside";
  assert.equal(preflightDraftForCandidate(unsafe).candidate_preflight, "blocked");

  const attemptedPromotion = validDraft();
  attemptedPromotion.approval = "approved";
  attemptedPromotion.guardrails.canonical_skill_created = true;
  assert.equal(preflightDraftForCandidate(attemptedPromotion).candidate_preflight, "blocked");

  const duplicateClaim = validDraft();
  duplicateClaim.provenance.evidence_pointers.push({ ...duplicateClaim.provenance.evidence_pointers[0] });
  assert.equal(preflightDraftForCandidate(duplicateClaim).candidate_preflight, "blocked");
  console.log("Draft-to-candidate preflight self-test passed (complete draft, TODO/evidence/path/duplicate rejection, and no-promotion guardrails).");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
