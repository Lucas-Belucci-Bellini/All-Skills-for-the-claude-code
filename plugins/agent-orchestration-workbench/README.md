# Agent Orchestration Workbench

A Claude Code plugin with six specialized subagents for designing, testing, reviewing, securing, evaluating, and diagnosing multi-agent workflows.

| Agent | Role | Access |
|---|---|---|
| `orchestration-architect` | Task graphs, state contracts, deadlines, recovery | Read-only |
| `orchestration-test-engineer` | Deterministic regression tests and controlled fixtures | Read/edit files and run local tests |
| `orchestration-runtime-reviewer` | Independent review of races, retries, and false success | Read-only |
| `agent-security-auditor` | Trust boundaries, prompt injection, permissions, side effects | Read-only |
| `orchestration-incident-triager` | Event timeline and incident evidence | Read-only |
| `agent-evaluation-designer` | Evaluation matrices, baselines, thresholds, uncertainty | Read-only |

After installation, invoke an agent by its scoped name, for example `agent-orchestration-workbench:orchestration-architect`, or let Claude Code select a specialist when appropriate.

## Suggested sequence

1. Use the architect to define behavior and failure boundaries.
2. Use the evaluation designer to establish observable acceptance criteria.
3. Ask the test engineer to implement deterministic regression tests using fake adapters.
4. Request independent runtime and security reviews.
5. Use the incident triager when run results or event ordering conflict.

These agents are role prompts, not an orchestration server. They do not connect providers or override host permissions.

## Validate

```bash
node tools/validate-agent-plugin.mjs
claude plugin validate ./plugins/agent-orchestration-workbench
```

The Node validator checks metadata and structure. CLI validation and actual agent invocation require a supported Claude Code installation and are not claimed by this repository check.
