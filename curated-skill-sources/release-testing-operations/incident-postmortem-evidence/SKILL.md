---
name: incident-postmortem-evidence
description: Write a blameless engineering postmortem grounded in timelines, system behavior, impact evidence, and corrective actions.
---

# Incident Postmortem Evidence

## Goal

Turn an incident into improvements to detection, containment, recovery, and system design without inventing causality or assigning personal blame.

## Inputs to inspect

Incident timeline, alerts, logs, relevant deployments, user impact evidence, mitigation steps, and open uncertainties.

## Workflow

1. Reconstruct a timestamped timeline from primary records, noting clock/timezone uncertainty and separating observed events from retrospective interpretation.
2. Quantify impact with available evidence: affected users or jobs, duration, data affected, error rates, and what remains unknown. Label estimates and their method.
3. Describe how system conditions and safeguards interacted. Focus on contributing factors, detection gaps, and recovery constraints rather than an individual as the root cause.
4. Create corrective actions at multiple layers: immediate repair, prevention, detection, response procedure, and validation that each action reduces a named failure mode.
5. Assign each action an owner, due date, measurable completion criterion, and verification plan. Review for actions that merely add alerts or documentation without changing resilience.

## Validation checklist

- [ ] The timeline points to evidence and marks uncertain event ordering.
- [ ] Impact statements are quantified only where records support them.
- [ ] Root cause is a system explanation with evidence, not a single-person explanation.
- [ ] Each action links to a contributing factor and includes a test of effectiveness.
- [ ] Sensitive user data and secrets are redacted from the postmortem.

## Required output

Produce a postmortem with summary, impact, detection, timeline, contributing conditions, what worked, what failed, action owners, and unresolved questions.

## Boundaries and failure handling

Do not fill evidentiary gaps with a confident narrative; do not publish sensitive logs or use hindsight to assign blame.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
