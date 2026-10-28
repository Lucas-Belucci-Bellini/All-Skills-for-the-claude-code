#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const slug = (v) => typeof v === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);

const RULES = [
  { id: "api-contracts", title: "API and contract workflows", terms: /(^|\/)(api|apis|routes?|controllers?|handlers?|openapi|swagger|schemas?|contracts?)(\/|\.|-|$)/i, required: ["documentation", "test", "source-code"] },
  { id: "testing-quality", title: "Testing and quality workflows", terms: /(^|\/)(test|tests|__tests__|spec|specs|fixtures?|mocks?)(\/|\.|-|$)|\.(test|spec)\./i, required: ["test", "source-code"] },
  { id: "build-release", title: "Build and release workflows", terms: /(^|\/)(\.github\/workflows|ci|cd|release|releases|scripts?|build|deploy|deployment)(\/|\.|-|$)|(^|\/)(makefile|justfile|dockerfile)$/i, required: ["ci-workflow", "documentation", "package-manifest"] },
  { id: "security-governance", title: "Security and governance workflows", terms: /(^|\/)(security|auth|authentication|authorization|permissions?|policies|compliance|threat-model)(\/|\.|-|$)|^(security|license|licence|notice|copying)/i, required: ["license-or-notice", "documentation", "source-code"] },
  { id: "developer-tooling", title: "Developer tooling and repository automation", terms: /(^|\/)(tools?|scripts?|cli|commands?|automation|\.github)(\/|\.|-|$)|\.(config|tool)\./i, required: ["source-code", "documentation", "test"] },
  { id: "data-migrations", title: "Data and migration workflows", terms: /(^|\/)(migrations?|schema|database|db|seeders?|fixtures?|queries|sql)(\/|\.|-|$)|\.(sql|prisma)$/i, required: ["source-code", "test", "documentation"] },
  { id: "observability-debugging", title: "Observability and debugging workflows", terms: /(^|\/)(logs?|logging|metrics|tracing|telemetry|diagnostics|debug|monitoring|alerts?)(\/|\.|-|$)/i, required: ["source-code", "test", "documentation"] },
  { id: "documentation-operations", title: "Documentation and contributor workflows", terms: /(^|\/)(docs?|documentation|examples?|samples?|contributing|readme)(\/|\.|-|$)|^(readme|contributing)(\.|$)/i, required: ["documentation", "source-code"] }
];

export function discoverOpportunities(inventory, manifest, options = {}) {
  if (!isObject(inventory) || inventory.schema_version !== 1 || inventory.inventory_type !== "structural-only" || !Array.isArray(inventory.files)) {
    throw new Error("inventory must be a schema v1 structural-only inventory with files[]");
  }
  if (!isObject(manifest) || manifest.schema_version !== 1 || manifest.manifest_type !== "repository-evidence-pointers" || !isObject(manifest.repository) || !Array.isArray(manifest.evidence)) {
    throw new Error("manifest must be a schema v1 repository-evidence-pointers manifest");
  }
  const minimumFiles = options.minimumFiles ?? 2;
  if (!Number.isInteger(minimumFiles) || minimumFiles < 1) throw new Error("minimum-files must be a positive integer");
  const evidencePaths = new Set(manifest.evidence.filter(isObject).map((item) => item.source_ref));
  const files = inventory.files.filter((file) => isObject(file) && nonEmpty(file.path) && nonEmpty(file.category));
  const opportunities = [];
  for (const rule of RULES) {
    const matches = files.filter((file) => rule.terms.test(file.path));
    if (matches.length < minimumFiles) continue;
    const categories = [...new Set(matches.map((file) => file.category))].sort();
    const matchedPaths = new Set(matches.map((file) => file.path));
    const evidence = manifest.evidence.filter((item) => isObject(item) && matchedPaths.has(item.source_ref));
    const evidenceCoveredPaths = new Set(evidence.map((item) => item.source_ref));
    const missingEvidencePaths = matches.filter((file) => !evidenceCoveredPaths.has(file.path)).map((file) => file.path);
    const missingCategories = rule.required.filter((category) => !categories.includes(category));
    opportunities.push({
      opportunity_id: rule.id,
      title: rule.title,
      signal_type: "path-and-file-category-heuristic",
      matched_file_count: matches.length,
      matched_categories: categories,
      sample_paths: matches.slice(0, 12).map((file) => file.path),
      evidence_claim_ids: evidence.map((item) => item.id),
      evidence_covered_file_count: evidenceCoveredPaths.size,
      evidence_gap_paths: missingEvidencePaths.slice(0, 20),
      evidence_gap_count: missingEvidencePaths.length,
      missing_category_signals: missingCategories,
      status: "opportunity-needs-human-triage",
      proposed_next_action: missingEvidencePaths.length > 0 || missingCategories.length > 0
        ? "Inspect representative files, add pinned line-level evidence, and review license before drafting a skill."
        : "Inspect all referenced evidence and validate one narrow workflow before drafting a skill.",
      limitations: [
        "Path and category matches are heuristic signals, not proof that a capability exists.",
        "The inventory does not contain file contents and cannot establish a workflow or its correctness.",
        "Evidence pointers require human inspection; a file path match does not mean the claim is supported."
      ]
    });
  }
  opportunities.sort((a, b) => b.matched_file_count - a.matched_file_count || a.opportunity_id.localeCompare(b.opportunity_id));
  const repository = manifest.repository;
  return {
    schema_version: 1,
    report_type: "repository-skill-opportunity-discovery",
    generated_at: new Date().toISOString(),
    repository: { url: repository.url, revision: repository.revision, inspected_at: repository.inspected_at },
    policy: {
      discovery_is_heuristic: true,
      file_contents_inferred: false,
      skills_created: false,
      candidates_approved: false,
      canonical_catalog_modified: false,
      counts_modified: false,
      network_access: false,
      human_triage_required: true
    },
    summary: {
      inventory_file_count: files.length,
      evidence_pointer_count: manifest.evidence.length,
      opportunity_count: opportunities.length,
      opportunities_with_evidence_gaps: opportunities.filter((item) => item.evidence_gap_count > 0).length,
      total_evidence_gap_paths: opportunities.reduce((sum, item) => sum + item.evidence_gap_count, 0)
    },
    opportunities
  };
}

function selfTest() {
  const inventory = { schema_version: 1, inventory_type: "structural-only", files: [
    {path:"src/api/routes.ts",category:"source-code",sha256:"a".repeat(64)},
    {path:"src/api/handlers.ts",category:"source-code",sha256:"b".repeat(64)},
    {path:"docs/api.md",category:"documentation",sha256:"c".repeat(64)},
    {path:"tests/api.test.ts",category:"test",sha256:"d".repeat(64)},
    {path:"README.md",category:"readme",sha256:"e".repeat(64)}
  ]};
  const manifest = { schema_version:1,manifest_type:"repository-evidence-pointers",repository:{url:"https://github.com/example/repo",revision:"a".repeat(40),inspected_at:"2026-10-27T00:00:00.000Z"},evidence:[
    {id:"routes",source_ref:"src/api/routes.ts",claim:"Routes are defined",kind:"source",start_line:1,end_line:2},
    {id:"api-doc",source_ref:"docs/api.md",claim:"API documented",kind:"documentation",start_line:1,end_line:2}
  ]};
  const report=discoverOpportunities(inventory,manifest);
  assert.ok(report.opportunities.some((x)=>x.opportunity_id==="api-contracts"));
  const api=report.opportunities.find((x)=>x.opportunity_id==="api-contracts");
  assert.equal(api.evidence_claim_ids.length,2);
  assert.ok(api.evidence_gap_count>=1);
  assert.equal(report.policy.skills_created,false);
  assert.equal(report.policy.canonical_catalog_modified,false);
  assert.throws(()=>discoverOpportunities({...inventory,inventory_type:"full-content"},manifest),/structural-only/);
  assert.throws(()=>discoverOpportunities(inventory,{...manifest,evidence:undefined}),/manifest/);
  assert.throws(()=>discoverOpportunities(inventory,manifest,{minimumFiles:0}),/minimum-files/);
  assert.equal(discoverOpportunities({...inventory,files:[]},manifest).summary.opportunity_count,0);
  console.log("Opportunity discovery self-test passed (heuristic groups, evidence mapping/gaps, policy flags, schema guards, threshold, empty inventory).");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const args=process.argv.slice(2);
  const positional=args.filter((value)=>!value.startsWith("--"));
  const inventoryPath=positional[0], manifestPath=positional[1];
  const outputIndex=args.indexOf("--output"), outputPath=outputIndex>=0?args[outputIndex+1]:null;
  const minimumIndex=args.indexOf("--minimum-files"), minimumFiles=minimumIndex>=0?Number(args[minimumIndex+1]):2;
  if(!inventoryPath||!manifestPath||(outputIndex>=0&&!outputPath)||(minimumIndex>=0&&!args[minimumIndex+1])){
    console.error("Usage: node tools/discover-repository-skill-opportunities.mjs <inventory.json> <evidence-manifest.json> [--minimum-files 2] [--output opportunities.json] | --self-test");
    process.exit(2);
  }
  try{
    const [inventory,manifest]=await Promise.all([readFile(inventoryPath,"utf8").then(JSON.parse),readFile(manifestPath,"utf8").then(JSON.parse)]);
    const report=discoverOpportunities(inventory,manifest,{minimumFiles});
    const json=JSON.stringify(report,null,2)+"\n";
    if(outputPath) await writeFile(outputPath,json,"utf8"); else process.stdout.write(json);
    console.error("Discovery report: "+report.summary.opportunity_count+" heuristic opportunities; "+report.summary.opportunities_with_evidence_gaps+" need additional evidence. No skills were created.");
  }catch(error){console.error("Opportunity discovery failed:\n"+error.message);process.exitCode=1;}
}
