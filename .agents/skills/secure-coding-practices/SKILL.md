---
name: secure-coding-practices
description: "Reviews implementation choices for common security weaknesses and safer defaults. Use when handling untrusted input, authentication, authorization, secrets, file access, network calls, or sensitive data."
---

# Secure Coding Practices

## Goal
Reduce avoidable security risk while keeping security controls explicit and testable.

## Workflow
1. Identify trust boundaries, sensitive assets, attacker-controlled inputs, privileged operations, and relevant threat assumptions.
2. Validate inputs at the boundary using allowlists, schema validation, size limits, and domain constraints appropriate to the contract.
3. Enforce authorization server-side for every protected resource and operation; never treat hidden UI controls as access control.
4. Use parameterized database queries, safe serialization, context-aware output encoding, and established cryptographic libraries.
5. Keep secrets out of source, logs, URLs, client bundles, and error messages. Use the approved secret store and least-privilege credentials.
6. Apply safe file and process handling: constrain paths, avoid shell-string interpolation, set resource limits, and reject unsafe archive/path traversal cases.
7. Make network boundaries explicit: validate destinations where needed, use TLS, set timeouts, bound response sizes, and avoid unsafe redirects or server-side request forgery paths.
8. Handle failures without leaking internals. Keep audit logs useful but minimize personal and confidential data.
9. Add focused tests for denied access, malformed inputs, privilege boundaries, and regression cases. Use established scanners when the repository's workflow calls for them.
10. Report findings with impact, affected boundary, evidence, and a practical mitigation.

## Deliverable
- Threat-relevant changes and assumptions.
- Tests or checks run and their observed results.
- Any remaining exposure and recommended follow-up.

## Acceptance criteria
- Trust boundaries and authorization checks are explicit.
- Unsafe input and failure cases are tested proportionally.
- No new secrets or unnecessary sensitive logs are introduced.
- Security claims match the evidence collected.

## Guardrails
- Do not invent compliance or security certifications.
- Do not perform destructive or intrusive security testing without authorization.
- Do not roll your own cryptography.
- Do not conceal a finding merely because it is difficult to fix.

