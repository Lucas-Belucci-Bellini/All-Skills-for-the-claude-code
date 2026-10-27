# Artifact Analysis Workbench

An independent Claude Code plugin with 10 scoped specialist agents and 15 original workflow skills for careful software/artifact investigation. Its design is informed by public capability areas in https://github.com/morluto/rea, but this is not REA, does not ship REA's implementation, and is not affiliated with or endorsed by REA's maintainers.

## Included agents

| Agent | Purpose | Permissions |
|---|---|---|
| artifact-analysis-architect | Plans a bounded, evidence-led analysis of an authorized software artifact, choosing static-first methods and specialist handoffs. | Read-only |
| evidence-provenance-auditor | Audits artifact provenance, hashes, capture context, source references, claim strength, and disclosure risks in analysis reports. | Read-only |
| web-application-analyst | Analyzes supplied web application code, routes, assets, snapshots, and browser observations without unauthorized live probing. | Read-only |
| javascript-electron-analyst | Inspects authorized JavaScript, Node.js, and Electron artifacts with focus on module graphs, IPC boundaries, package dependencies, and evidence. | Read-only |
| native-binary-analyst | Triages authorized native binaries and explains file structure, architecture, imports, symbols, relocations, and disassembly evidence. | Read-only |
| firmware-embedded-analyst | Inventories authorized firmware and embedded artifacts, documenting partitions, filesystems, version clues, hardware assumptions, and lab safety limits. | Read-only |
| mobile-package-analyst | Reviews authorized Android and iOS package metadata, manifests, permissions, resources, and dependencies while minimizing private-data exposure. | Read-only |
| network-capture-analyst | Analyzes authorized packet captures and sanitized request/response recordings using timestamped, privacy-conscious protocol evidence. | Read-only |
| runtime-behavior-reviewer | Independently reviews supplied runtime traces, logs, crashes, and multi-run results to separate repeatable behavior from noise. | Read-only |
| reconstruction-test-engineer | Creates deterministic, non-destructive tests and sanitized fixtures to evaluate proposed reconstruction behavior against known evidence. | Read/edit/write and bounded local Bash |

## Included skills

| Skill | Intended use |
|---|---|---|
| authorized-scope-and-target-register | Determine the target, permitted methods, exclusions, and stop conditions before analysis. |
| evidence-ledger-and-artifact-hashing | Several files, logs, captures, or outputs need provenance and repeatability. |
| web-application-surface-mapping | Understand an owned or authorized web application using local code or supplied snapshots. |
| javascript-electron-package-analysis | A Node.js package, browser bundle, ASAR, or Electron app needs a static-first overview. |
| native-binary-format-triage | Create a fact sheet for an ELF, PE, Mach-O, object, archive, or unknown binary. |
| managed-runtime-assembly-analysis | Understand managed code or a packaged Python application without overclaiming source recovery. |
| firmware-and-embedded-image-inventory | Inventory firmware before any device-facing testing. |
| mobile-package-permission-audit | Audit an authorized APK/AAB or iOS bundle with minimal exposure of private data. |
| network-capture-timeline-analysis | Explain communication sequences, protocol evidence, or failures from a supplied capture. |
| runtime-behavior-comparison | A claim needs more than a single log or non-repeatable observation. |
| database-and-container-format-inspection | Inventory SQLite, archives, package containers, or structured binaries without modifying source. |
| gpu-and-model-artifact-inventory | A GGUF, safetensors, CUDA/HIP code object, or similar artifact needs a metadata fact sheet. |
| differential-reconstruction-validation | Evaluate a reconstruction against authorized behavior evidence. |
| mcp-analysis-tool-readiness | Determine if an analysis path is ready without changing global configuration. |
| evidence-backed-reconstruction-report | Present results without confusing facts, assumptions, and recommendations. |

## Usage guidance

1. Establish authorized target, allowed methods, and stop conditions.
2. Preserve hashes and provenance before analysis.
3. Select the smallest relevant skill/agent set; do not invoke all agents by default.
4. Prefer static/offline evidence and treat runtime, network, and device actions as separate approvals.
5. Report source references, confidence, contradictory evidence, limitations, and exact verification steps.
6. Review output for secrets and personal data before sharing.

These prompts coordinate investigation and reporting. They do not implement an analysis engine, install REA, provide a reverse-engineering provider, bypass host permissions, or prove that an artifact has been analyzed. Tool availability depends on the local environment. The test engineer may edit isolated fixtures and run approved local tests; it must not modify product code or external targets unless the user explicitly expands the scope.

## Validation

Run node tools/validate-artifact-analysis-workbench.mjs from the repository root. Optionally run claude plugin validate ./plugins/artifact-analysis-workbench on a supported Claude Code installation.

The repository validator checks metadata, inventory, skill sections, agent permissions, the 150-role registry, and the 25,000-skill budget. CLI validation and actual agent invocation are separate steps and are not claimed by the structural validator.

## Planning documents

- docs/roadmaps/REA_INSPIRED_25000_SKILLS_150_AGENTS.md
- docs/roadmaps/REA_INSPIRED_AGENT_REGISTRY_150.md

## Provenance and safe use

These 15 skill files and 10 agent prompts are original to this repository; they do not vendor REA source, skill text, screenshots, or reference documentation. REA's public README identifies its repository as MIT-licensed. Any future reuse of upstream code or substantial text needs a separate provenance/licensing review and required notices.

Use workflows only for lawful research, education, interoperability, preservation, and artifacts you own or are authorized to examine. Static analysis is the default. Commercial tool licenses, device safety, privacy, and authorization limits remain in force.
