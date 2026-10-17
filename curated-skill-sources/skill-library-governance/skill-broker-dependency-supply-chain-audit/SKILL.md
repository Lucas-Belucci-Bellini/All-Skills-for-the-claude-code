---
name: skill-broker-dependency-supply-chain-audit
description: "Audits dependencies used by the broker and adapter build. Use when updating search, authentication, parsing, or packaging dependencies."
---

# Skill Broker Dependency Supply Chain Audit

## Purpose

lockfiles, build manifests, provenance, vulnerability advisories, and deployment environment

## Required inputs

Inventory direct/transitive dependencies and verify versions, integrity, maintainership, and origin.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Prioritize dependencies that parse untrusted skill content, authenticate callers, or affect release integrity.
3. A dependency risk report with exact packages, evidence, and update/mitigation choices.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not install arbitrary untrusted packages or claim a clean security posture without running checks. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not install arbitrary untrusted packages or claim a clean security posture without running checks.

## Boundaries and failure handling

A broker release updates a package that handles Markdown, HTTP, or authentication. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No software dependencies are being added or updated.
- **Negative:** undefined
