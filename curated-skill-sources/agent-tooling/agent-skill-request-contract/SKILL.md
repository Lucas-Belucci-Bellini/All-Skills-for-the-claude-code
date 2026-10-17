---
name: agent-skill-request-contract
description: "Defines a machine-checkable request and response contract for agents retrieving skills. Use when an agent needs capabilities from a shared skill registry or broker."
---

# Agent Skill Request Contract

## Purpose

Give any supported agent a bounded, auditable way to ask for a skill without sending its full conversation or silently granting permissions.

## Required inputs

Agent/provider and version, task goal, required capability, relevant project constraints, allowed tools, output expectations, context budget, and the broker's current request schema.

## Workflow

1. Inventory the existing registry and request format before designing a new one; preserve any stable fields already consumed by clients.
2. Define required fields, optional fields, enumerations, length limits, request ID, and schema version; reject unrecognized security-sensitive fields by default.
3. Separate task context from secrets and instructions quoted from untrusted repositories; send only the minimum context required for retrieval.
4. Define response statuses for found, multiple candidates, not found, incompatible, unvalidated, unauthorized, rate-limited, and temporarily unavailable.
5. Create valid, malformed, incomplete, oversized, incompatible, and unauthorized request fixtures; document the exact response contract for each.

## Validation checklist

- [ ] Requests carry a schema version and stable request identifier.
- [ ] Responses distinguish no match from broker failure and access denial.
- [ ] Secret values and full conversation transcripts are not required fields.
- [ ] Unknown status values and malformed payloads fail closed.
- [ ] Both positive and negative request fixtures are documented and repeatable.

## Required output

A versioned request/response schema, example payloads, validation rules, and a decision table for broker statuses.

## Boundaries and failure handling

Do not let the request itself authorize tool execution or upgrades. If the agent version, authentication state, or schema support is unknown, return a structured limitation instead of guessing.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** An agent needs a repeatable JSON request to obtain the testing skill relevant to a task.
- **Negative:** A user only needs help writing an ordinary answer and has not asked to discover or install repository skills.
