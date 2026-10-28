#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const slug = (v) => typeof v === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
const stopWords = new Set([
  "a","an","and","are","as","at","be","by","for","from","in","into","is","it","of","on","or",
  "the","to","using","with","when","this","that","help","use","run","task","workflow","safe",
  "repository","candidate","skill","skills","project","based"
]);

function tokens(value) {
  return new Set(String(value ?? "").toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 3 && !stopWords.has(term)));
}

function candidateTerms(candidate) {
  const skill = isObject(candidate.skill) ? candidate.skill : {};
  return tokens([
    skill.name, skill.user_intent, ...(Array.isArray(skill.positive_triggers) ? skill.positive_triggers : [])
  ].filter((x) => typeof x === "string").join(" "));
}

function jaccard(a, b) {
  const intersection = [...a].filter((term) => b.has(term)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function reviewGroup(candidate) {
  const skill = isObject(candidate.skill) ? candidate.skill : {};
  const supplied = candidate.review_group ?? skill.review_group ?? skill.domain ?? skill.category;
  if (!nonEmpty(supplied)) return "unclassified";
  const normalized = supplied.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return normalized || "unclassified";
}

function candidateFlags(candidate) {
  const flags = [];
  const source = isObject(candidate.source) ? candidate.source : {};
  const skill = isObject(candidate.skill) ? candidate.skill : {};
  const dedup = isObject(candidate.deduplication) ? candidate.deduplication : {};
  if (source.license_status !== "verified-compatible") flags.push("license-review-required");
  if (!nonEmpty(source.repository_url) || !nonEmpty(source.revision) || !nonEmpty(source.inspected_at)) flags.push("source-provenance-incomplete");
  if (!Array.isArray(candidate.evidence) || candidate.evidence.length < 2) flags.push("insufficient-evidence-pointers");
  if (candidate.decision !== "draft") flags.push("candidate-decision-" + (nonEmpty(candidate.decision) ? candidate.decision : "missing"));
  if (dedup.exact_check !== "pass") flags.push("exact-dedup-not-passed");
  if (dedup.semantic_review !== "distinct") flags.push("semantic-review-not-distinct");
  if (!nonEmpty(skill.user_intent)) flags.push("intent-needs-review");
  if (!Array.isArray(skill.acceptance_criteria) || skill.acceptance_criteria.length < 2) flags.push("acceptance-criteria-needs-review");
  return flags;
}

export function planReviewBatches(input, batchSize = 10) {
  if (!isObject(input) || input.schema_version !== 1 || !Array.isArray(input.candidates)) {
    throw new Error("input must be { schema_version: 1, candidates: [...] }");
  }
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 50) {
    throw new Error("batch size must be an integer from 1 to 50");
  }
  const errors = [];
  const seenIds = new Set();
  const normalized = input.candidates.map((candidate, index) => {
    if (!isObject(candidate)) {
      errors.push("candidates[" + index + "] must be an object");
      return null;
    }
    if (!slug(candidate.candidate_id)) errors.push("candidates[" + index + "].candidate_id must be a kebab-case slug");
    if (seenIds.has(candidate.candidate_id)) errors.push("duplicate candidate_id: " + candidate.candidate_id);
    seenIds.add(candidate.candidate_id);
    const skill = isObject(candidate.skill) ? candidate.skill : {};
    if (!slug(skill.name)) errors.push("candidate " + (candidate.candidate_id || index) + " has an invalid skill.name");
    return {
      candidate,
      candidate_id: candidate.candidate_id,
      skill_name: skill.name,
      group: reviewGroup(candidate),
      terms: candidateTerms(candidate),
      flags: candidateFlags(candidate)
    };
  });
  if (errors.length) throw new Error(errors.join("\n"));
  const entries = normalized.filter(Boolean).sort((a, b) =>
    a.group.localeCompare(b.group, "en") || a.skill_name.localeCompare(b.skill_name, "en") ||
    a.candidate_id.localeCompare(b.candidate_id, "en"));

  const overlaps = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i], b = entries[j];
      const sameName = a.skill_name.toLowerCase() === b.skill_name.toLowerCase();
      const shared = [...a.terms].filter((term) => b.terms.has(term)).sort();
      const similarity = jaccard(a.terms, b.terms);
      if (sameName || (shared.length >= 3 && similarity >= 0.72)) {
        overlaps.push({
          candidate_a: a.candidate_id,
          candidate_b: b.candidate_id,
          group_a: a.group,
          group_b: b.group,
          signal: sameName ? "same-skill-name" : "lexical-similarity",
          jaccard_similarity: Number(similarity.toFixed(3)),
          shared_terms: shared.slice(0, 12),
          status: "human-review-required",
          note: "Heuristic signal only; this is not a semantic duplicate verdict."
        });
      }
    }
  }

  const grouped = new Map();
  for (const entry of entries) {
    if (!grouped.has(entry.group)) grouped.set(entry.group, []);
    grouped.get(entry.group).push(entry);
  }
  const batches = [];
  for (const [group, groupEntries] of grouped) {
    for (let start = 0, number = 1; start < groupEntries.length; start += batchSize, number++) {
      const chunk = groupEntries.slice(start, start + batchSize);
      batches.push({
        batch_id: group + "-" + String(number).padStart(3, "0"),
        review_group: group,
        batch_number: number,
        candidate_count: chunk.length,
        candidates: chunk.map((entry) => ({
          candidate_id: entry.candidate_id,
          skill_name: entry.skill_name,
          source: {
            repository_url: entry.candidate.source?.repository_url ?? null,
            revision: entry.candidate.source?.revision ?? null,
            license_status: entry.candidate.source?.license_status ?? "unknown"
          },
          evidence_count: Array.isArray(entry.candidate.evidence) ? entry.candidate.evidence.length : 0,
          decision: entry.candidate.decision ?? "missing",
          review_flags: entry.flags,
          reviewer_checklist: [
            "Inspect every evidence pointer against the pinned source revision.",
            "Confirm license compatibility and preserve required notices.",
            "Complete exact and semantic duplicate review against the canonical catalog.",
            "Verify trigger boundaries, workflow steps, acceptance criteria, and stop conditions.",
            "Record a human decision; do not add this candidate to the canonical catalog from this report."
          ]
        }))
      });
    }
  }

  const allFlags = entries.reduce((sum, item) => sum + item.flags.length, 0);
  return {
    schema_version: 1,
    report_type: "repository-skill-human-review-plan",
    generated_at: new Date().toISOString(),
    policy: {
      canonical_catalog_modified: false,
      skill_or_agent_counts_modified: false,
      candidates_approved: false,
      automatic_semantic_deduplication: false,
      network_access: false,
      human_review_required: true
    },
    summary: {
      candidate_count: entries.length,
      review_group_count: grouped.size,
      batch_count: batches.length,
      batch_size_limit: batchSize,
      candidates_with_flags: entries.filter((e) => e.flags.length > 0).length,
      total_review_flags: allFlags,
      potential_overlap_pairs: overlaps.length,
      unclassified_candidates: entries.filter((e) => e.group === "unclassified").length
    },
    batches,
    potential_overlap_pairs: overlaps
  };
}

function fixtureCandidate(id, name, intent, decision = "hold") {
  return {
    schema_version: 1,
    candidate_id: id,
    source: { repository_url: "https://github.com/example/repo", revision: "a".repeat(40), inspected_at: "2026-10-27", license_status: "unknown", license_evidence: ["LICENSE"] },
    skill: {
      name, user_intent: intent,
      positive_triggers: ["Help inspect repository API contracts", "Review documented API contract changes"],
      negative_triggers: ["Explain concepts only", "Handle unrelated database outage"],
      inputs: ["Pinned checkout"], workflow_steps: ["Inspect source", "Compare contract", "Report findings"],
      output_contract: "Evidence-backed review report",
      acceptance_criteria: ["Evidence resolves", "Findings are actionable"],
      stop_conditions: ["Stop when evidence is missing"],
      category: "api-contracts"
    },
    evidence: [{source_ref:"docs/api.md#L1-L3",supports:"API contract",kind:"documentation"},{source_ref:"tests/api.test.js#L1-L5",supports:"Contract tests",kind:"test"}],
    deduplication: {exact_check:"not-run", semantic_review:"not-run", compared_skills:[]},
    decision, review_notes: "Fixture only."
  };
}

function selfTest() {
  const input = { schema_version: 1, candidates: [
    fixtureCandidate("api-contract-audit", "api-contract-audit", "Inspect repository API contracts and document compatibility."),
    fixtureCandidate("api-contract-review", "api-contract-review", "Inspect repository API contracts and document compatibility."),
    { ...fixtureCandidate("cli-workflow-review", "cli-workflow-review", "Review CLI task workflows and expected outputs."), skill: { ...fixtureCandidate("cli-workflow-review", "cli-workflow-review", "Review CLI task workflows and expected outputs.").skill, category: "cli-workflows" }, decision: "draft" }
  ]};
  const plan = planReviewBatches(input, 1);
  assert.equal(plan.summary.candidate_count, 3);
  assert.equal(plan.summary.batch_count, 3);
  assert.ok(plan.batches.every((batch) => batch.candidate_count <= 1));
  assert.ok(plan.potential_overlap_pairs.some((pair) => pair.signal === "same-skill-name" || pair.signal === "lexical-similarity"));
  assert.equal(plan.policy.canonical_catalog_modified, false);
  assert.ok(plan.batches.flatMap((b) => b.candidates).some((c) => c.review_flags.includes("license-review-required")));
  assert.throws(() => planReviewBatches({schema_version:1,candidates:[input.candidates[0],input.candidates[0]]}), /duplicate candidate_id/);
  assert.throws(() => planReviewBatches(input, 0), /batch size/);
  assert.equal(planReviewBatches({schema_version:1,candidates:[]}).summary.batch_count, 0);
  console.log("Review-batch planner self-test passed (grouping/chunking, overlap signals, review flags, duplicate IDs, bounds, empty input).");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const args = process.argv.slice(2);
  const positional = args.filter((value) => !value.startsWith("--"));
  const inputPath = positional[0];
  const outputIndex = args.indexOf("--output");
  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
  const sizeIndex = args.indexOf("--batch-size");
  const batchSize = sizeIndex >= 0 ? Number(args[sizeIndex + 1]) : 10;
  if (!inputPath || (outputIndex >= 0 && !outputPath) || (sizeIndex >= 0 && !args[sizeIndex + 1])) {
    console.error("Usage: node tools/plan-repository-skill-review-batches.mjs <candidates.json> [--batch-size 10] [--output review-plan.json] | --self-test");
    process.exit(2);
  }
  try {
    const input = JSON.parse(await readFile(inputPath, "utf8"));
    const plan = planReviewBatches(input, batchSize);
    const json = JSON.stringify(plan, null, 2) + "\n";
    if (outputPath) await writeFile(outputPath, json, "utf8");
    else process.stdout.write(json);
    console.error("Review plan prepared: " + plan.summary.candidate_count + " candidates in " + plan.summary.batch_count + " batches; no candidate was approved or published.");
  } catch (error) {
    console.error("Review-batch planning failed:\n" + error.message);
    process.exitCode = 1;
  }
}
