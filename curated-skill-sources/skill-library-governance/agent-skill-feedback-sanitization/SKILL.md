---
name: agent-skill-feedback-sanitization
description: "Sanitizes task outcome feedback before it is used to improve shared skills. Use when agents report failures, traces, prompts, or artifacts to a central library."
---

# Agent Skill Feedback Sanitization

## Purpose

Enable evidence-driven skill improvement while minimizing leakage of secrets, private conversation history, and project-sensitive data.

## Required inputs

Feedback record, files/trace references, privacy policy, approved retention period, and the minimum information required to reproduce the issue.

## Workflow

1. Identify the question the feedback must answer and discard unrelated transcript sections, environment variables, source files, and user identity fields.
2. Detect or redact credentials, tokens, cookies, private URLs, personal/customer data, internal hostnames, and other sensitive literals.
3. Replace project-specific labels with stable synthetic identifiers where relationships matter for reproduction.
4. Validate that the sanitized record still identifies skill ID/version, expected versus observed behavior, error class, and reproduction fixture.
5. Store the sanitized evidence with access controls and retention rules; keep restricted raw evidence outside shared training/library artifacts.

## Validation checklist

- [ ] The submitted record contains only fields needed to improve the skill.
- [ ] Secret scans and privacy review run before persistence.
- [ ] Sanitization does not fabricate missing evidence.
- [ ] Raw sensitive logs are not copied into a public or shared skill.
- [ ] Retention and deletion responsibilities are documented.

## Required output

A sanitized feedback item with skill/version reference, reproducible symptom, privacy status, and triage recommendation.

## Boundaries and failure handling

Do not upload full conversation histories by default. If sanitization would remove the facts needed to assess a high-impact issue, ask an authorized maintainer to review restricted evidence securely.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** An agent needs to report that skill version 1.2 fails on a project-specific edge case.
- **Negative:** The proposed feedback contains only a vague rating with no task outcome or evidence to improve.
