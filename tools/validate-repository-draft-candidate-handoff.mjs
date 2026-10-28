#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { preflightDraftForCandidate } from "./preflight-repository-skill-draft-for-candidate.mjs";

export function validateDraftCandidateHandoff(spec) {
  const preflight = preflightDraftForCandidate(spec);
  const errors = [...preflight.errors];
  if (preflight.candidate_preflight === "passed") {
    const pointers = spec.provenance.evidence_pointers;
    if (pointers.length < 2) errors.push("candidate handoff requires at least two evidence pointers; draft completeness alone requires only one");
    for (const [index, pointer] of pointers.entries()) {
      if (!["source", "test", "documentation", "example", "issue"].includes(pointer.kind)) {
        errors.push(`evidence_pointers[${index}].kind must be explicitly classified as source, test, documentation, example, or issue before candidate handoff`);
      }
    }
    const licenseEvidence = spec.skill.license_review.evidence;
    if (typeof licenseEvidence !== "string" || !licenseEvidence.trim()) errors.push("candidate handoff requires a non-empty human-reviewed license evidence reference");
  }
  const passed = errors.length === 0;
  return {
    schema_version: 1,
    report_type: "repository-skill-draft-candidate-handoff",
    candidate_handoff: passed ? "eligible-for-separate-human-controlled-assembly" : "blocked",
    draft_preflight: preflight.candidate_preflight,
    approval: "not-approved",
    candidate_created: false,
    candidate_gate_passed: false,
    canonical_skill_created: false,
    canonical_counts_modified: false,
    human_review_required: true,
    errors,
    warnings: [
      ...preflight.warnings,
      "Eligibility is not approval and does not create a candidate. Evidence kinds and license references are declarations; reviewers must inspect the pinned source and verify them independently."
    ]
  };
}

function fixture() {
  return {
    schema_version: 1, artifact_type: "repository-skill-draft-specification",
    status: "draft-needs-human-authoring-and-review", approval: "not-approved",
    skill: {
      name: "Trace API route contracts", slug: "trace-api-route-contracts",
      purpose: "Map API routes to documented request and response contracts.",
      user_intent: "When asked to audit API route behavior against repository contract documentation.",
      positive_triggers: ["Map route handlers to request schemas.", "Compare route responses with documented contracts."],
      negative_triggers: ["Do not implement a new endpoint.", "Do not infer behavior from filenames alone."],
      inputs: ["Repository checkout pinned to the supplied commit."],
      workflow_steps: ["Inspect route declarations.", "Read referenced schemas and tests.", "Report verified mismatches with file and line references."],
      output_contract: "Return a Markdown table of route, evidence, mismatch, and confidence.",
      acceptance_criteria: ["Every reported mismatch cites a source range.", "Unverified assumptions are marked explicitly."],
      stop_conditions: ["Stop and request access if required source files are unavailable."],
      license_review: { status: "verified-compatible", evidence: "LICENSE checked by human reviewer at pinned revision." },
      exact_duplicate_review: "passed-no-exact-duplicate", semantic_duplicate_review: "reviewed-distinct",
      human_review_notes: "Human reviewer inspected cited ranges and reviewed license and duplicate status."
    },
    provenance: {
      repository_url: "https://github.com/example/repo", pinned_revision: "a".repeat(40),
      inspected_at: "2026-10-27", discovery_opportunity_id: "api-contracts", evidence_is_not_approval: true,
      evidence_pointers: [
        { claim_id: "routes", source_ref: "src/api/routes.ts", start_line: 1, end_line: 12, claim: "Route handlers are declared here.", kind: "source" },
        { claim_id: "tests", source_ref: "tests/api.test.ts", start_line: 3, end_line: 18, claim: "API responses are covered by tests.", kind: "test" }
      ]
    },
    guardrails: {
      draft_only: true, inferred_workflow_steps: false, license_verified: false,
      duplicate_review_completed: false, candidate_gate_passed: false,
      canonical_skill_created: false, canonical_counts_modified: false, requires_human_review: true
    }
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const input = args.find((arg) => !arg.startsWith("--"));
  const outputIndex = args.indexOf("--output");
  const output = outputIndex >= 0 ? args[outputIndex + 1] : null;
  if (!input || (outputIndex >= 0 && !output)) throw new Error("Usage: node tools/validate-repository-draft-candidate-handoff.mjs <draft-spec.json> [--output report.json]");
  const spec = JSON.parse(await readFile(input, "utf8"));
  const report = validateDraftCandidateHandoff(spec);
  const reportText = JSON.stringify(report, null, 2) + "\n";
  if (output) await writeFile(output, reportText, { flag: "wx" });
  else process.stdout.write(reportText);
  if (report.candidate_handoff === "blocked") process.exitCode = 1;
}

function selfTest() {
  const good = validateDraftCandidateHandoff(fixture());
  assert.equal(good.candidate_handoff, "eligible-for-separate-human-controlled-assembly");
  assert.equal(good.approval, "not-approved");
  assert.equal(good.candidate_created, false);
  assert.equal(good.candidate_gate_passed, false);
  assert.equal(good.canonical_counts_modified, false);
  const oneEvidence = fixture(); oneEvidence.provenance.evidence_pointers.pop();
  assert.equal(validateDraftCandidateHandoff(oneEvidence).candidate_handoff, "blocked");
  const noKind = fixture(); delete noKind.provenance.evidence_pointers[0].kind;
  assert.equal(validateDraftCandidateHandoff(noKind).candidate_handoff, "blocked");
  const todo = fixture(); todo.skill.workflow_steps[0] = "TODO: inspect";
  assert.equal(validateDraftCandidateHandoff(todo).candidate_handoff, "blocked");
  const unsafe = fixture(); unsafe.provenance.evidence_pointers[0].source_ref = "../outside";
  assert.equal(validateDraftCandidateHandoff(unsafe).candidate_handoff, "blocked");
  const promoted = fixture(); promoted.approval = "approved";
  assert.equal(validateDraftCandidateHandoff(promoted).candidate_handoff, "blocked");
  console.log("Draft candidate handoff self-test passed (eligible handoff, insufficient evidence, missing kind, TODO, unsafe path, and approval guardrails).");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
