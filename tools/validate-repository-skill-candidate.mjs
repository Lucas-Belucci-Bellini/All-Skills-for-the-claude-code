#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const fail = (errors) => {
  console.error("Repository-to-skill candidate validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
};
const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const slug = (v) => typeof v === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
const list = (v, min = 1) => Array.isArray(v) && v.length >= min && v.every(nonEmpty);

export function validateCandidate(candidate) {
  const errors = [];
  const need = (condition, message) => { if (!condition) errors.push(message); };
  need(isRecord(candidate), "root must be a JSON object");
  if (!isRecord(candidate)) return errors;

  need(candidate.schema_version === 1, "schema_version must be 1");
  need(slug(candidate.candidate_id), "candidate_id must be a lowercase kebab-case slug");

  const source = candidate.source;
  need(isRecord(source), "source must be an object");
  if (isRecord(source)) {
    need(nonEmpty(source.repository_url) && /^https:\/\//.test(source.repository_url), "source.repository_url must be an HTTPS URL");
    need(nonEmpty(source.revision) && !/^(main|master|latest|HEAD)$/i.test(source.revision), "source.revision must identify an immutable commit/tag, not a moving ref");
    need(nonEmpty(source.inspected_at) && !Number.isNaN(Date.parse(source.inspected_at)), "source.inspected_at must be a parseable date");
    need(["verified-compatible", "review-required", "restricted", "unknown"].includes(source.license_status), "source.license_status is invalid");
    need(list(source.license_evidence, 1), "source.license_evidence must contain at least one path or evidence reference");
    if (source.license_status !== "verified-compatible") {
      need(candidate.decision !== "ready-for-human-review", "license status not verified-compatible: candidate cannot be marked ready-for-human-review");
    }
  }

  const skill = candidate.skill;
  need(isRecord(skill), "skill must be an object");
  if (isRecord(skill)) {
    need(slug(skill.name), "skill.name must be a lowercase kebab-case slug");
    need(nonEmpty(skill.user_intent), "skill.user_intent is required");
    need(list(skill.positive_triggers, 2), "skill.positive_triggers needs at least two non-empty examples");
    need(list(skill.negative_triggers, 2), "skill.negative_triggers needs at least two hard-negative examples");
    need(list(skill.inputs, 1), "skill.inputs must describe required inputs");
    need(list(skill.workflow_steps, 3), "skill.workflow_steps needs at least three concrete steps");
    need(nonEmpty(skill.output_contract), "skill.output_contract is required");
    need(list(skill.acceptance_criteria, 2), "skill.acceptance_criteria needs at least two verifiable checks");
    need(list(skill.stop_conditions, 1), "skill.stop_conditions must define when to stop or escalate");
  }

  need(Array.isArray(candidate.evidence) && candidate.evidence.length >= 2, "evidence needs at least two source-backed entries");
  if (Array.isArray(candidate.evidence)) {
    candidate.evidence.forEach((item, i) => {
      need(isRecord(item), `evidence[${i}] must be an object`);
      if (!isRecord(item)) return;
      need(nonEmpty(item.source_ref), `evidence[${i}].source_ref is required`);
      need(nonEmpty(item.supports), `evidence[${i}].supports must state the claim supported`);
      need(["source", "test", "documentation", "example", "issue"].includes(item.kind), `evidence[${i}].kind is invalid`);
    });
  }

  const dedup = candidate.deduplication;
  need(isRecord(dedup), "deduplication must be an object");
  if (isRecord(dedup)) {
    need(["pass", "fail", "not-run"].includes(dedup.exact_check), "deduplication.exact_check is invalid");
    need(["distinct", "overlap", "merge", "reject", "not-run"].includes(dedup.semantic_review), "deduplication.semantic_review is invalid");
    need(Array.isArray(dedup.compared_skills) && dedup.compared_skills.every(nonEmpty), "deduplication.compared_skills must be an array of canonical skill names");
    if (dedup.exact_check !== "pass" || dedup.semantic_review !== "distinct") {
      need(candidate.decision !== "ready-for-human-review", "candidate cannot be ready for human review until exact and semantic duplicate checks pass as distinct");
    }
  }

  need(["draft", "hold", "reject", "ready-for-human-review"].includes(candidate.decision), "decision is invalid");
  need(nonEmpty(candidate.review_notes), "review_notes must explain unresolved risks and the current decision");
  return errors;
}

const validFixture = () => ({
  schema_version: 1,
  candidate_id: "documented-cli-workflow",
  source: {
    repository_url: "https://github.com/example/project",
    revision: "0123456789abcdef0123456789abcdef01234567",
    inspected_at: "2026-10-27",
    license_status: "verified-compatible",
    license_evidence: ["LICENSE", "NOTICE"]
  },
  skill: {
    name: "documented-cli-workflow",
    user_intent: "Complete a documented CLI task safely and verify its result.",
    positive_triggers: ["Run the documented export command and verify its output.", "Help me execute this CLI workflow from the repository docs."],
    negative_triggers: ["Explain CLI design concepts without executing a workflow.", "Debug an unrelated runtime crash."],
    inputs: ["Repository checkout", "Target task and environment"],
    workflow_steps: ["Inspect the command documentation.", "Check flags and prerequisites.", "Run the command only with authorization.", "Verify the output against documented expectations."],
    output_contract: "Return commands, observed results, evidence paths, and unresolved assumptions.",
    acceptance_criteria: ["All flags are supported by the pinned source revision.", "Output is checked against a documented example or test."],
    stop_conditions: ["Stop if the license or source revision cannot be verified."]
  },
  evidence: [
    { source_ref: "docs/cli.md#export", supports: "Documented flags and expected output", kind: "documentation" },
    { source_ref: "tests/cli_export.test.js", supports: "Output shape and error behavior", kind: "test" }
  ],
  deduplication: { exact_check: "pass", semantic_review: "distinct", compared_skills: ["cli-output-contract-audit"] },
  decision: "ready-for-human-review",
  review_notes: "Illustrative fixture only; source URLs and evidence must be replaced with real verified references before release."
});

function selfTest() {
  const good = validFixture();
  assert.deepEqual(validateCandidate(good), []);
  const movingRef = structuredClone(good);
  movingRef.source.revision = "main";
  assert.ok(validateCandidate(movingRef).some((e) => e.includes("immutable")));
  const noNegativeExamples = structuredClone(good);
  noNegativeExamples.skill.negative_triggers = ["Unrelated task"];
  assert.ok(validateCandidate(noNegativeExamples).some((e) => e.includes("hard-negative")));
  const unresolvedLicense = structuredClone(good);
  unresolvedLicense.source.license_status = "unknown";
  assert.ok(validateCandidate(unresolvedLicense).some((e) => e.includes("license status")));
  const duplicateRisk = structuredClone(good);
  duplicateRisk.deduplication.semantic_review = "overlap";
  assert.ok(validateCandidate(duplicateRisk).some((e) => e.includes("duplicate checks")));
  console.log("Candidate validator self-test passed (5 cases: valid, moving revision, missing negative triggers, unresolved license, semantic overlap).");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node tools/validate-repository-skill-candidate.mjs <candidate.json> | --self-test");
    process.exit(2);
  }
  try {
    const candidate = JSON.parse(await readFile(file, "utf8"));
    const errors = validateCandidate(candidate);
    if (errors.length) fail(errors);
    else console.log(`Candidate ${candidate.candidate_id} passed structural/provenance gating. Human review is still required.`);
  } catch (error) {
    fail([`could not read/parse candidate JSON: ${error.message}`]);
  }
}
