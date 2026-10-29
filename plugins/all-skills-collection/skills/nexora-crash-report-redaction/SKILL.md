---
name: nexora-crash-report-redaction
description: "Produces actionable engine crash diagnostics while excluding secrets, private paths, and unnecessary user data."
---

# nexora crash report redaction

## Purpose

Use this workflow for NEXORA-scale engine work when crash diagnostics and privacy review. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. List diagnostic fields and their purpose.
2. classify secrets, identifiers, absolute paths, world names, chat, and mod-provided strings.
3. redact or transform sensitive fields before persistence or upload.
4. cap report size and bound nested payloads.
5. attach build ID, subsystem, crash phase, and sanitized stack context.
6. offer local-only retention and explicit consent for upload.
7. test with synthetic secret markers and hostile long strings.
8. Capture results and unresolved risks for review..
9. Document a safe rollback or fallback path..

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

Reports preserve debugging value while tests prove sensitive markers are absent and payload size is bounded.

Never upload by default without a documented consent model. Treat mod-generated text and filenames as untrusted input.

## Trigger examples

- **Positive:** A code change or incident directly involves nexora crash report redaction and needs a reproducible validation plan.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation or content work with no runtime, reliability, or code behavior impact.
