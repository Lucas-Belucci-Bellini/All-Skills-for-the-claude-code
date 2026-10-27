# Agent registry: 150 planned specialist roles

**Status:** planning inventory. Only the first 10 roles are implemented as prompt files in the current branch. The remaining entries are proposed roles, not existing or tested agents.

Each role has a single primary responsibility. All roles default to read-only investigation; editing or command execution is an explicit exception requiring a narrowly justified scope. No role can expand authorization or bypass the host's own permissions.

## 1. Repository-to-skill synthesis pipeline

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 1 | repository-capability-architect | Maps source-backed capabilities into a reviewable plan for original skills. | Read-only |
| 2 | upstream-provenance-auditor | Audits source revisions, licenses, notices, and reuse blockers. | Read-only |
| 3 | repository-structure-miner | Maps packages, interfaces, examples, tests, and extension points. | Read-only |
| 4 | workflow-evidence-miner | Mines repeatable input-to-output workflows from source and examples. | Read-only |
| 5 | acceptance-criteria-miner | Converts tests/issues/docs into falsifiable acceptance criteria. | Read-only |
| 6 | api-contract-extractor | Extracts public API/CLI/config contracts with source evidence. | Read-only |
| 7 | skill-scope-designer | Defines a unique skill's intent, triggers, prerequisites, and exclusions. | Read-only |
| 8 | semantic-dedup-reviewer | Compares candidate skill intent and outputs against the canonical library. | Read-only |
| 9 | skill-batch-evaluation-engineer | Designs quality and routing evaluations for candidate batches. | Read-only |
| 10 | skill-release-gatekeeper | Reconciles provenance, duplicates, validation, and human release gates. | Read-only |

## 2. Web and browser applications

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 11 | web-surface-mapper | Maps supplied routes, assets, entry points, and page relationships. | Read-only |
| 12 | browser-dom-inspector | Documents relevant DOM structure from authorized snapshots. | Read-only |
| 13 | route-graph-analyst | Builds navigation graphs from supplied observations. | Read-only |
| 14 | web-asset-inventory | Inventories bundles, stylesheets, images, manifests, and source maps. | Read-only |
| 15 | source-map-triager | Checks source-map availability, path mapping, and completeness evidence. | Read-only |
| 16 | client-state-flow-analyst | Reconstructs state transitions from code and recorded behavior. | Read-only |
| 17 | frontend-bundle-comparator | Compares frontend bundle versions and summarizes changes. | Read-only |
| 18 | web-storage-inspector | Reviews supplied storage schemas and redacts sensitive data. | Read-only |
| 19 | web-snapshot-reconciler | Compares snapshots and separates real changes from capture noise. | Read-only |
| 20 | web-behavior-report-writer | Turns browser evidence into a bounded behavior specification. | Read-only |

## 3. JavaScript, Electron, and Node.js

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 21 | javascript-module-graph-analyst | Reconstructs module imports, exports, cycles, and boundaries. | Read-only |
| 22 | electron-boundary-auditor | Documents main, renderer, and preload trust boundaries. | Read-only |
| 23 | ipc-contract-inspector | Maps IPC channels, payloads, callers, and handlers. | Read-only |
| 24 | asar-package-triager | Inventories an authorized ASAR package and its extraction limits. | Read-only |
| 25 | node-dependency-provenance-reviewer | Maps dependency versions, lockfile evidence, and provenance gaps. | Read-only |
| 26 | dynamic-import-tracer | Identifies dynamic import points and unresolved modules. | Read-only |
| 27 | sourcemap-reconstruction-specialist | Assesses source-map quality without overstating source fidelity. | Read-only |
| 28 | node-runtime-observer | Summarizes bounded, authorized Node.js runtime observations. | Read-only |
| 29 | js-deobfuscation-planner | Plans reproducible deobfuscation experiments on owned artifacts. | Read-only |
| 30 | electron-reconstruction-reviewer | Checks whether a proposed Electron design matches evidence. | Read-only |

## 4. Managed runtimes

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 31 | dotnet-assembly-inspector | Inventories .NET assemblies, metadata, references, and frameworks. | Read-only |
| 32 | dotnet-il-flow-analyst | Explains managed IL control flow using cited evidence. | Read-only |
| 33 | clr-dependency-triager | Maps CLR dependency and binding assumptions. | Read-only |
| 34 | jvm-bytecode-analyst | Inspects Java bytecode and class metadata. | Read-only |
| 35 | java-classpath-auditor | Reconstructs classpath and dependency-resolution assumptions. | Read-only |
| 36 | python-wheel-inspector | Inspects Python wheel metadata and package layout. | Read-only |
| 37 | pyinstaller-package-analyst | Inventories PyInstaller containers and extraction limits. | Read-only |
| 38 | managed-symbol-recovery-reviewer | Checks symbol recovery claims against tool output. | Read-only |
| 39 | reflection-metadata-auditor | Documents reflection-driven type/member discovery evidence. | Read-only |
| 40 | managed-runtime-comparison-analyst | Compares managed-runtime artifacts across versions. | Read-only |

## 5. Native binaries and architecture

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 41 | elf-layout-analyst | Reviews ELF headers, sections, segments, symbols, and relocations. | Read-only |
| 42 | pe-layout-analyst | Reviews PE headers, sections, imports, exports, and resources. | Read-only |
| 43 | mach-o-structure-analyst | Documents Mach-O slices, load commands, and linked libraries. | Read-only |
| 44 | architecture-fingerprint-triager | Identifies architecture and ABI claims supported by evidence. | Read-only |
| 45 | assembly-control-flow-analyst | Summarizes assembly control flow without inventing semantics. | Read-only |
| 46 | decompiler-output-reviewer | Checks decompiler output against disassembly and uncertainty. | Read-only |
| 47 | symbol-relocation-inspector | Explains symbol and relocation relationships with references. | Read-only |
| 48 | callgraph-reconstruction-agent | Builds tentative call graphs and labels inferred edges. | Read-only |
| 49 | binary-diff-investigator | Prioritizes differences between two authorized binaries. | Read-only |
| 50 | native-reconstruction-test-designer | Designs parity tests for reconstructed native behavior. | Read-only |

## 6. Firmware, embedded systems, and IoT

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 51 | firmware-inventory-triager | Inventories firmware containers, partitions, and hashes. | Read-only |
| 52 | firmware-filesystem-analyst | Documents filesystem structure and extraction confidence. | Read-only |
| 53 | boot-chain-documenter | Models boot stages from supplied artifacts and observations. | Read-only |
| 54 | firmware-config-auditor | Reviews firmware configuration and redacts secrets. | Read-only |
| 55 | embedded-protocol-mapper | Maps documented device protocols and message formats. | Read-only |
| 56 | mcu-image-inspector | Identifies MCU image layout and architecture evidence. | Read-only |
| 57 | hardware-interface-documenter | Documents hardware interfaces and unknown electrical assumptions. | Read-only |
| 58 | firmware-version-differ | Compares firmware builds and groups meaningful changes. | Read-only |
| 59 | firmware-safety-reviewer | Checks lab, flashing, radio, and device-safety boundaries. | Read-only |
| 60 | firmware-reconstruction-validator | Designs offline fixtures for reconstructed firmware logic. | Read-only |

## 7. Mobile application packages

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 61 | android-package-inventory | Inventories authorized APK or AAB package contents. | Read-only |
| 62 | android-manifest-analyst | Documents Android components and manifest declarations. | Read-only |
| 63 | android-permission-auditor | Separates declared permissions from evidence of runtime use. | Read-only |
| 64 | apk-resource-inspector | Maps resources, assets, and package identifiers. | Read-only |
| 65 | android-dex-flow-analyst | Summarizes DEX classes and control-flow evidence. | Read-only |
| 66 | ios-bundle-inventory | Inventories an authorized iOS application bundle. | Read-only |
| 67 | ios-plist-auditor | Checks property-list configuration and entitlement evidence. | Read-only |
| 68 | mobile-dependency-analyst | Maps bundled mobile libraries and version evidence. | Read-only |
| 69 | mobile-runtime-evidence-reviewer | Audits supplied mobile runtime traces and redacts user data. | Read-only |
| 70 | mobile-app-behavior-comparator | Compares behavior across authorized application versions. | Read-only |

## 8. Network, protocols, and packet evidence

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 71 | pcap-evidence-curator | Preserves packet-capture provenance and capture limitations. | Read-only |
| 72 | protocol-field-mapper | Documents protocol fields and distinguishes decoded/inferred values. | Read-only |
| 73 | packet-timeline-analyst | Builds timestamped timelines from supplied packet captures. | Read-only |
| 74 | tls-metadata-reviewer | Summarizes permitted TLS metadata without interception. | Read-only |
| 75 | dns-behavior-comparator | Compares DNS observations with environment and cache caveats. | Read-only |
| 76 | api-capture-schema-extractor | Extracts schemas from authorized, sanitized recordings. | Read-only |
| 77 | traffic-anomaly-triager | Ranks capture anomalies and competing explanations. | Read-only |
| 78 | replay-fixture-designer | Builds offline replay fixtures from sanitized examples. | Read-only |
| 79 | network-privacy-auditor | Checks captures for credentials, personal data, and minimization. | Read-only |
| 80 | protocol-claim-reviewer | Checks protocol interpretation against raw fields and decoder limits. | Read-only |

## 9. Process, runtime, and execution traces

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 81 | process-tree-observer | Documents bounded process trees and ownership evidence. | Read-only |
| 82 | filesystem-event-analyst | Summarizes supplied filesystem event traces. | Read-only |
| 83 | runtime-file-access-reviewer | Compares observed file accesses against declared expectations. | Read-only |
| 84 | syscall-trace-summarizer | Summarizes supplied system-call traces and gaps. | Read-only |
| 85 | crash-register-analyst | Explains recorded crash registers and signal context. | Read-only |
| 86 | multi-run-differential-analyst | Compares isolated runs and highlights repeatable outcomes. | Read-only |
| 87 | resource-behavior-profiler | Summarizes measured CPU, memory, I/O, and timing. | Read-only |
| 88 | application-lifecycle-tracer | Models startup, steady-state, shutdown, and crash transitions. | Read-only |
| 89 | process-ownership-reviewer | Checks whether process ownership claims are supported. | Read-only |
| 90 | runtime-recovery-planner | Designs safe reproduction and recovery for runtime failures. | Read-only |

## 10. Testing, reproducibility, and evaluation

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 91 | golden-fixture-curator | Maintains documented fixtures with provenance and expected outcomes. | Read-only |
| 92 | differential-test-designer | Designs tests comparing original and reconstructed behavior. | Read-only |
| 93 | hypothesis-test-planner | Turns competing explanations into falsifiable experiments. | Read-only |
| 94 | reconstruction-parity-evaluator | Scores behavior parity using explicit inputs and outputs. | Read-only |
| 95 | behavioral-regression-engineer | Builds bounded regression tests for behavior changes. | Read-only |
| 96 | evaluation-metric-designer | Defines metrics, thresholds, baselines, and failure categories. | Read-only |
| 97 | synthetic-data-governor | Labels synthetic fixtures and prevents evidence confusion. | Read-only |
| 98 | coverage-gap-auditor | Identifies untested branches, formats, versions, and edge cases. | Read-only |
| 99 | reproducibility-test-engineer | Checks repeatability, environment recording, and determinism. | Read-only |
| 100 | confidence-calibration-analyst | Compares confidence claims against observed evaluation outcomes. | Read-only |

## 11. Authorized security and safe lab practice

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 101 | authorization-scope-reviewer | Verifies authorization boundaries before analysis or testing. | Read-only |
| 102 | isolation-boundary-auditor | Checks containment, temporary directories, and test-data separation. | Read-only |
| 103 | prompt-injection-threat-modeler | Identifies untrusted instructions embedded in artifacts/tool output. | Read-only |
| 104 | secret-redaction-auditor | Checks logs, captures, and reports for sensitive values. | Read-only |
| 105 | safe-sandbox-planner | Plans offline or least-privilege analysis environments. | Read-only |
| 106 | dependency-risk-triager | Prioritizes dependency risks with bounded recommendations. | Read-only |
| 107 | untrusted-artifact-reviewer | Defines safe handling requirements for suspicious files. | Read-only |
| 108 | exploit-safety-gatekeeper | Stops steps that exceed safe, authorized analysis. | Read-only |
| 109 | privacy-minimization-reviewer | Reduces collected data to what the question requires. | Read-only |
| 110 | responsible-disclosure-doc-writer | Prepares factual disclosure and remediation notes. | Read-only |

## 12. Games, graphics, and interactive media

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 111 | unity-package-analyst | Inventories authorized Unity package structures and metadata. | Read-only |
| 112 | godot-pck-inspector | Documents Godot PCK structure and extraction evidence. | Read-only |
| 113 | unreal-asset-inventory-analyst | Maps Unreal asset containers and resource metadata. | Read-only |
| 114 | shader-artifact-analyst | Reviews supplied shader sources, binaries, and build metadata. | Read-only |
| 115 | game-data-format-analyst | Documents game data schemas and inferred fields. | Read-only |
| 116 | asset-hash-differ | Finds byte-identical and changed assets across builds. | Read-only |
| 117 | engine-version-compatibility-analyst | Compares engine version evidence and compatibility constraints. | Read-only |
| 118 | gpu-kernel-artifact-reviewer | Inspects GPU code-object metadata and source limitations. | Read-only |
| 119 | game-save-format-analyst | Reconstructs save-file structure with synthetic fixtures. | Read-only |
| 120 | graphics-pipeline-evidence-reviewer | Maps graphics claims to shaders, assets, and runtime evidence. | Read-only |

## 13. MCP, agents, and analysis tooling

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 121 | mcp-readiness-checker | Checks local MCP setup and reports missing prerequisites. | Read-only |
| 122 | tool-schema-contract-auditor | Reviews input/output schema compatibility and validation boundaries. | Read-only |
| 123 | mcp-server-surface-mapper | Maps advertised tools to documented implementation surfaces. | Read-only |
| 124 | agent-prompt-boundary-reviewer | Audits role separation, tool permissions, and prompt boundaries. | Read-only |
| 125 | provider-configuration-auditor | Checks provider configuration without exposing credentials. | Read-only |
| 126 | tool-output-evidence-normalizer | Normalizes structured output while preserving raw references. | Read-only |
| 127 | agent-delegation-reviewer | Checks delegation scope, return contracts, and failure handling. | Read-only |
| 128 | mcp-compatibility-tester | Designs non-destructive protocol and schema compatibility checks. | Read-only |
| 129 | workflow-instruction-curator | Maintains clear, non-duplicative workflow instructions. | Read-only |
| 130 | tool-integration-release-reviewer | Checks versioning, release notes, and compatibility evidence. | Read-only |

## 14. Databases, file formats, and model artifacts

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 131 | sqlite-schema-inspector | Documents SQLite tables, columns, indexes, and constraints. | Read-only |
| 132 | sqlite-wal-snapshot-reviewer | Explains WAL/snapshot limits and consistent-read conditions. | Read-only |
| 133 | archive-format-inspector | Inventories archive members, compression, and bounds. | Read-only |
| 134 | binary-container-parser | Designs safe parsers for documented binary containers. | Read-only |
| 135 | gguf-header-analyst | Summarizes GGUF metadata without claiming model quality. | Read-only |
| 136 | safetensors-metadata-auditor | Checks tensor declarations and metadata consistency. | Read-only |
| 137 | tensor-shape-reconciler | Reconciles tensor shapes and derived size estimates. | Read-only |
| 138 | database-migration-differ | Compares schema or migration versions. | Read-only |
| 139 | serialization-format-reconstructor | Builds schema hypotheses from known examples. | Read-only |
| 140 | model-artifact-provenance-reviewer | Tracks model hashes, source, format, and restrictions. | Read-only |

## 15. Architecture, reconstruction, and reporting

| # | Agent slug | Responsibility | Default access |
|---:|---|---|---|
| 141 | system-boundary-cartographer | Maps system components, interfaces, and uncertainty boundaries. | Read-only |
| 142 | dependency-edge-reconciler | Checks dependency graphs against independent evidence. | Read-only |
| 143 | behavioral-spec-writer | Produces testable behavior specs grounded in observations. | Read-only |
| 144 | reconstruction-design-architect | Plans minimal reconstruction without claiming unobserved internals. | Read-only |
| 145 | compatibility-contract-analyst | Defines compatibility requirements and failure modes. | Read-only |
| 146 | technical-report-editor | Edits reports for precision, traceability, and reproducibility. | Read-only |
| 147 | unknowns-register-curator | Maintains prioritized unknowns and next-evidence requests. | Read-only |
| 148 | multi-artifact-correlation-analyst | Correlates hashes, timestamps, symbols, and references. | Read-only |
| 149 | review-package-assembler | Packages source references, test outputs, and limitations. | Read-only |
| 150 | release-evidence-gatekeeper | Recommends hold/proceed based on explicit acceptance evidence. | Read-only |

## Implementation order

- **Wave A — first 10 (implemented in this branch):** repository-capability-architect, upstream-provenance-auditor, repository-structure-miner, workflow-evidence-miner, acceptance-criteria-miner, api-contract-extractor, skill-scope-designer, semantic-dedup-reviewer, skill-batch-evaluation-engineer, and skill-release-gatekeeper.
- **Wave B — evidence and safety:** implement the first 10 roles of the Evidence and scope group and the Authorized security group only after the initial plugin has passed runtime and permission review.
- **Wave C — platform-specialist clusters:** implement in groups of five to ten, with at least one representative artifact/fixture and regression case per group.
- **Wave D — scale to all 150:** only after a routing evaluation demonstrates that each new agent has a distinct call pattern and does not reduce selection precision.

The names are a planning vocabulary, not a recommendation to install 150 subagents at once. Keep installed agent sets small enough to remain discoverable and reviewable.
