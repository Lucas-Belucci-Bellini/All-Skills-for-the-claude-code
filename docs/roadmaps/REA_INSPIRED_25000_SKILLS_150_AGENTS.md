# Strategy: 25,000 canonical skills and a 150-role agent architecture

**Status:** strategic proposal plus a small, reviewable first implementation on a Draft PR branch.
**Observed sync baseline:** the repository's current source-to-bundle generator reports 1,540 distinct skills in the All Skills Collection on this branch. This branch adds 15 candidate workflows in a separate plugin and defines 10 initial agent prompts. The 15 candidates are excluded from any aggregate unique-skill claim until cross-plugin semantic review decides whether each one is distinct from existing skills.
**Targets, not completion claims:** 25,000 useful, distinct skills; a catalog of 150 scoped agent roles. The 150-role table is a design inventory, not a statement that all 150 agent prompts already exist or have been runtime-tested.

## Vision

Build a discoverable library where a developer can point to a real repository or artifact and ask whether the collection can produce a careful workflow for understanding it. The differentiator should be trustworthy coverage, not raw file count: unique scope, useful triggers, source provenance, reproducible deliverables, evidence-linked claims, safety boundaries, and maintenance.

The REA project is a useful reference for the breadth of lawful reverse-engineering workflows: web and JavaScript/Electron applications, managed and native binaries, firmware, mobile packages, network captures, runtime behavior, databases, model artifacts, and evidence-led investigation. This is an independent workbench inspired by public capability areas in https://github.com/morluto/rea; it is not REA, not an official port, and not affiliated with or endorsed by its maintainers. This initial batch contains original instructions and does not vendor or copy REA's skill text, code, screenshots, or reference documents. REA identifies its own repository as MIT-licensed. Any future reuse of upstream code or substantial text must be handled as a separate provenance/licensing change with required notices preserved. Sources: https://github.com/morluto/rea/blob/main/README.md and https://github.com/morluto/rea/blob/main/LICENSE.

## 25,000-skill portfolio allocation

The allocations below sum to exactly 25,000 canonical, useful workflows. They are planning envelopes, not promises to generate every slot. A domain may finish below its allocation if no distinct, useful workflow can be justified.

| Domain | Planned distinct skills |
|---|---:|
| Evidence, scope, and provenance | 1,000 |
| Web and browser applications | 1,500 |
| JavaScript, Electron, and Node.js | 1,500 |
| Managed runtimes (.NET, JVM, Python) | 1,000 |
| Native binaries and architecture | 2,000 |
| Firmware, embedded systems, and IoT | 1,500 |
| Mobile application packages | 1,000 |
| File formats, archives, and data structures | 1,000 |
| Network protocols and packet captures | 1,500 |
| Process, runtime, debugging, and traces | 1,000 |
| Testing, reconstruction parity, and evaluation | 1,500 |
| Authorized security, privacy, and safe labs | 1,500 |
| Game engines, graphics, and media assets | 1,000 |
| Rust, Go, WebAssembly, and toolchains | 1,000 |
| MCP, agent workflows, and provider integration | 1,500 |
| Performance, resources, and observability | 1,000 |
| Release, update, compatibility, and reproducibility | 1,000 |
| Architecture, reverse engineering, and reconstruction | 1,500 |
| Documentation, reports, training, and knowledge transfer | 1,000 |
| Specialized analysis: GPU, ML, databases, industrial artifacts | 1,000 |
| **Total** | **25,000** |

### Counting rules

1. Count one canonical identity per genuinely distinct workflow, not per filename, alias, copy, translated duplicate, agent wrapper, or bundled mirror.
2. The All Skills Collection's source/bundle copies represent one skill. Skills shipped in a separate plugin are included in portfolio totals only when they have a separate useful scope and no semantic duplicate.
3. Every item needs a unique ID, user intent, inclusion/exclusion boundary, input contract, workflow, expected artifact, verification strategy, failure recovery, safety conditions, provenance, and maintenance owner.
4. Split an item only when the new workflow changes meaningful inputs, method, or acceptance criteria. A new title or wording alone is not a new skill.
5. Merge or retire dead and redundant skills. The target is a ceiling for useful coverage, not a quota that justifies filler.

## Delivery stages

| Stage | Skill target across portfolio | Agent target | Gate |
|---|---:|---:|---|
| 0 — governance and inventory | Existing sync baseline: 1,540 | 10 initial implementations; 150-role plan | Define canonical IDs, scope rules, provenance, and validators |
| 1 — capability proof | 1,540 collection baseline plus 15 candidates pending semantic review | 10 defined agents | Plugin metadata checks; semantic duplicate decisions; CI; Draft PR review |
| 2 — breadth pilot | 2,500 | 20–30 implemented definitions | Sample at least 3 domains; semantic review; validate actual Claude Code loading |
| 3 — operational library | 5,000 | 40–60 | Routing evaluation, retirement process, dependency map |
| 4 — broad coverage | 10,000 | 75–100 | Batch review and usage signals every 100 skills; package-size and discoverability checks |
| 5 — target portfolio | 25,000 | Up to 150 | Domain audits, external contribution process, scheduled de-duplication and release gates |

No stage has a calendar promise. Advance only when the previous stage's evidence is available. Use small batches of 25–50 skills; smaller batches are preferred for sensitive source or runtime work.

## Agent architecture: 150-role design

The companion document REA_INSPIRED_AGENT_REGISTRY_150.md gives each planned role a distinct slug and responsibility across 15 groups. Only 10 agent prompt files are included in this first implementation. The registry describes the intended destination and must not be treated as an inventory of installed or tested subagents.

- Default to read-only Read, Grep, and Glob. Grant Edit, Write, or Bash only to a narrowly scoped test/fixture specialist when the task explicitly requires it.
- One clear responsibility per agent; do not create parallel agents that merely restate a domain name.
- Each definition must specify input assumptions, investigation steps, required output, tool permissions, evidence rules, stop conditions, and escalation.
- Delegate analysis, not authority. A delegated agent cannot expand target scope, disclose secrets, deploy, publish, or merge without authorization.
- Keep agent roles and skills separate: an agent coordinates judgment and reporting; a skill packages a reusable, testable workflow. Their counts are not interchangeable.

## First implementation in this branch

The independent artifact-analysis-workbench plugin includes 10 specialist agents and 15 candidate workflow skills focused on the source-to-skill creation process: repository inventory, provenance/license review, capability mapping, workflow mining, acceptance criteria, API contract extraction, documentation evidence, fixture validation, canonical scope design, semantic deduplication, trigger testing, batch planning, original skill authoring, routing evaluation, and release gates. This is deliberately distinct from the 54 REA/reverse-engineering skills already listed in the existing catalog. The 15 new candidates still require semantic review against meta-skills and library-maintenance workflows before being included in any portfolio-wide unique count.

This is a deliberately small pilot—not a 25,000-skill implementation. No production REA MCP server is included. No live target was analyzed by this repository change. A successful structural CI check would prove only that files and policy assertions pass, not that Claude Code actually invokes each agent correctly.

## Required quality gates for each batch

1. **Inventory:** produce canonical IDs and an explicit duplicate/near-duplicate report.
2. **Provenance:** record whether content is original, derived, imported, or mirrored; verify source license and preserve notices when reusing material.
3. **Structure:** validate skill metadata, required sections, expected artifacts, links, and referenced resources.
4. **Semantics:** evaluate positive and negative triggers against neighboring skills; reject title-only variations.
5. **Safety:** identify authorized scope, untrusted input, possible side effects, secrets, and explicit stop conditions.
6. **Verification:** run deterministic checks on sample fixtures. Record commands, exit status, logs, environment, and checks not performed.
7. **Routing:** measure whether descriptions select the intended skill for representative prompts and avoid unrelated skills.
8. **Maintenance:** attach an owner/review cadence and retire obsolete skills instead of accumulating stale entries.
9. **Human review:** open a Draft PR for each batch; never merge automatically merely because CI passes.
10. **Release evidence:** test a clean Claude Code plugin installation and invoke representative agents/skills before describing runtime compatibility as verified.

## Contribution and source policy

Contributors may propose a skill from a repository, project, API, or artifact by supplying the source URL and immutable revision where applicable; license; user task; original analysis; candidate workflows; expected outputs; duplicate search; test fixtures; and known limitations. Do not copy a repository's skill library wholesale. The preferred process is to inspect the source, understand a distinct workflow, write an original skill with a clear provenance note, and retain references to upstream documentation.

Analysis guidance in this workbench is intended for lawful research, education, interoperability, software preservation, and artifacts the user owns or is explicitly authorized to examine. Keep static/offline analysis as the default. Never instruct users to bypass commercial tool licenses, steal keys, exfiltrate data, evade defenses, or access targets outside the approved scope.

## Success criteria

The portfolio succeeds when users can find a correct workflow quickly, follow it without guessing, see the evidence behind conclusions, reproduce the result, and understand uncertainty. Skill count and agent count are secondary indicators; semantic coverage, routing precision, maintenance health, provenance, and real-use feedback determine whether expansion continues.
