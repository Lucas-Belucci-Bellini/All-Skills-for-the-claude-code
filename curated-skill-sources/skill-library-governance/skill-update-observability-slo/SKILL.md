---
name: skill-update-observability-slo
description: "Defines service-level indicators for distributing approved skill versions. Use when maintainers need measurable freshness and availability goals."
---

# Skill Update Observability SLO

## Purpose

client/adapter telemetry, version metadata, expected update window, and privacy policy

## Required inputs

Separate release availability, successful fetch, cache refresh, invocation, and verified task outcome as distinct events.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Set indicators and objectives per measurable stage, including what remains unknown for clients that do not report telemetry.
3. An SLI/SLO specification with denominator, window, data gaps, and reporting cadence.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not promise every agent updated if a client cannot acknowledge receipt. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not promise every agent updated if a client cannot acknowledge receipt.

## Boundaries and failure handling

The team needs to track how quickly approved skill updates reach connected agents. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No dynamic update distribution or observable clients exist.
- **Negative:** undefined
