#!/usr/bin/env node
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { validateDraftCandidateHandoff } from "./validate-repository-draft-candidate-handoff.mjs";

export function prepareCandidateAssemblySpec(draft) {
  const handoff = validateDraftCandidateHandoff(draft);
  if (handoff.candidate_handoff !== "eligible-for-separate-human-controlled-assembly") {
    throw new Error("Draft handoff blocked:\n" + handoff.errors.map((e) => "- " + e).join("\n"));
  }
  const p = draft.provenance;
  const s = draft.skill;
  const exact = s.exact_duplicate_review === "passed-no-exact-duplicate" ? "pass" : "not-run";
  const semantic = s.semantic_duplicate_review === "reviewed-distinct" ? "distinct" : "not-run";
  const licenseStatus = s.license_review.status === "verified-compatible" ? "verified-compatible" :
    s.license_review.status === "restricted" ? "restricted" :
    s.license_review.status === "unknown" ? "unknown" : "review-required";
  const candidateSpec = {
    schema_version: 1,
    candidate_id: s.slug,
    source: {
      repository_url: p.repository_url,
      revision: p.pinned_revision,
      inspected_at: p.inspected_at,
      license_status: licenseStatus,
      license_evidence: [s.license_review.evidence]
    },
    skill: {
      name: s.slug,
      user_intent: s.user_intent,
      positive_triggers: [...s.positive_triggers],
      negative_triggers: [...s.negative_triggers],
      inputs: [...s.inputs],
      workflow_steps: [...s.workflow_steps],
      output_contract: s.output_contract,
      acceptance_criteria: [...s.acceptance_criteria],
      stop_conditions: [...s.stop_conditions]
    },
    evidence_refs: p.evidence_pointers.map((item) => item.claim_id),
    deduplication: {
      exact_check: exact,
      semantic_review: semantic,
      compared_skills: []
    },
    decision: "hold",
    review_notes: "Prepared from a draft specification. Decision is forced to hold; verify every evidence claim, source revision, license, and duplicate assessment before any further review."
  };
  return {
    schema_version: 1,
    report_type: "repository-draft-candidate-assembly-preparation",
    preparation: "ready-for-existing-assembly-tool",
    approval: "not-approved",
    candidate_created: false,
    candidate_gate_passed: false,
    canonical_skill_created: false,
    canonical_counts_modified: false,
    human_review_required: true,
    candidate_spec: candidateSpec,
    warnings: [
      "This creates only an intermediate assembly input, not a candidate record or canonical skill.",
      "The existing assembly tool still requires a matching evidence manifest and structural inventory, verifies repository/revision/date alignment and file hashes, and forces the resulting candidate decision to hold.",
      "License evidence and duplicate review fields are human declarations, not independently verified facts."
    ]
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const input = args.find((a) => !a.startsWith("--"));
  const oi = args.indexOf("--output");
  const output = oi >= 0 ? args[oi + 1] : null;
  if (!input || (oi >= 0 && !output)) throw new Error("Usage: node tools/prepare-repository-draft-candidate-spec.mjs <draft-spec.json> [--output report.json]");
  const draft = JSON.parse(await readFile(input, "utf8"));
  const report = prepareCandidateAssemblySpec(draft);
  const json = JSON.stringify(report, null, 2) + "\n";
  if (output) await writeFile(output, json, { flag: "wx" });
  else process.stdout.write(json);
}

function fixture() {
  return {
    schema_version: 1, artifact_type: "repository-skill-draft-specification",
    status: "draft-needs-human-authoring-and-review", approval: "not-approved",
    skill: {
      name: "Trace API route contracts", slug: "trace-api-route-contracts",
      purpose: "Map API routes to documented request and response contracts.",
      user_intent: "Audit API route behavior against repository contract documentation.",
      positive_triggers: ["Map route handlers to request schemas.", "Compare responses with documented contracts."],
      negative_triggers: ["Do not implement a new endpoint.", "Do not infer behavior from filenames alone."],
      inputs: ["Repository checkout pinned to supplied commit."],
      workflow_steps: ["Inspect route declarations.", "Read referenced schemas and tests.", "Report verified mismatches with file and line references."],
      output_contract: "Return a Markdown table of route, evidence, mismatch, and confidence.",
      acceptance_criteria: ["Every mismatch cites a source range.", "Assumptions are explicitly marked."],
      stop_conditions: ["Stop if required source files are unavailable."],
      license_review: { status: "verified-compatible", evidence: "LICENSE and NOTICE inspected by human at pinned revision." },
      exact_duplicate_review: "passed-no-exact-duplicate",
      semantic_duplicate_review: "reviewed-distinct",
      human_review_notes: "Human reviewed source and duplicate status."
    },
    provenance: {
      repository_url: "https://github.com/example/repo", pinned_revision: "a".repeat(40),
      inspected_at: "2026-10-27", discovery_opportunity_id: "api-contracts", evidence_is_not_approval: true,
      evidence_pointers: [
        { claim_id: "routes", source_ref: "src/api/routes.ts", start_line: 1, end_line: 12, claim: "Route handlers are declared here.", kind: "source" },
        { claim_id: "tests", source_ref: "tests/api.test.ts", start_line: 3, end_line: 18, claim: "API responses are tested.", kind: "test" }
      ]
    },
    guardrails: { draft_only: true, inferred_workflow_steps: false, license_verified: false, duplicate_review_completed: false, candidate_gate_passed: false, canonical_skill_created: false, canonical_counts_modified: false, requires_human_review: true }
  };
}

function selfTest() {
  const report = prepareCandidateAssemblySpec(fixture());
  assert.equal(report.preparation, "ready-for-existing-assembly-tool");
  assert.equal(report.candidate_spec.decision, "hold");
  assert.equal(report.candidate_spec.candidate_id, "trace-api-route-contracts");
  assert.deepEqual(report.candidate_spec.evidence_refs, ["routes", "tests"]);
  assert.equal(report.candidate_created, false);
  assert.equal(report.approval, "not-approved");
  assert.equal(report.canonical_counts_modified, false);
  const weak = fixture(); weak.provenance.evidence_pointers.pop();
  assert.throws(() => prepareCandidateAssemblySpec(weak), /handoff blocked/);
  const unknownLicense = fixture(); unknownLicense.skill.license_review.status = "unknown";
  assert.throws(() => prepareCandidateAssemblySpec(unknownLicense), /handoff blocked/);
  const unknownDuplicate = fixture(); unknownDuplicate.skill.semantic_duplicate_review = "TODO";
  assert.equal(prepareCandidateAssemblySpec(unknownDuplicate).candidate_spec.deduplication.semantic_review, "not-run");
  console.log("Candidate assembly preparation self-test passed (hold decision, claim mapping, blocked handoff, license and duplicate uncertainty).");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
