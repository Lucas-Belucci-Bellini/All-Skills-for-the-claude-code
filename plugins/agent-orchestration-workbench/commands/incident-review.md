---
description: "Reconstructs an agent workflow incident from logs and state evidence without performing repair or replaying live work."
argument-hint: [incident summary] [run ID] [log paths or time window]
---

Investigate this multi-agent workflow incident:

$ARGUMENTS

## Workflow

1. Establish incident scope, affected run/task/attempt IDs, time window, relevant branch/version, and evidence sources available in the current context.
2. Read project instructions and inspect provided logs, state records, callback payloads, artifact receipts, and diffs. Do not execute a replay or repair operation.
3. Delegate a read-only timeline reconstruction to `agent-orchestration-workbench:orchestration-incident-triager`. Require an event-ordered timeline, evidence references, facts, hypotheses, and unknowns.
4. When source code is available, delegate a separate read-only failure-path review to `agent-orchestration-workbench:orchestration-runtime-reviewer`. Require precise file/line references and distinguish proven defects from missing evidence.
5. Correlate events using run/task/attempt IDs, sequence numbers, state versions, and receipts before relying on wall-clock timestamps. Do not assume a worker message proves a side effect succeeded or that a timeout proves remote execution stopped.
6. Identify the first proven divergence from expected behavior, downstream impact, possible duplicate side effects, and the minimum safe follow-up evidence.
7. Provide containment recommendations that preserve evidence. Ask for approval before any destructive repair, live retry, replay, requeue, or production configuration change.

## Required output

- Incident scope and sources inspected.
- Ordered timeline with links/references and uncertainty notes.
- Observed facts versus plausible, contradicted, and unresolved hypotheses.
- Impacted tasks/artifacts and side effects with unknown completion state.
- Immediate safe containment, follow-up checks, and criteria to close the incident.

## Safety boundaries

- Read-only investigation only. Do not change remote state, replay workflows, requeue tasks, or run destructive remediation.
- Redact secrets and minimize sensitive personal/customer data in reports.
- Never fabricate timestamps, log records, root cause, or recovery status.
- Do not merge, publish, deploy, or change repository visibility without explicit user authorization.
