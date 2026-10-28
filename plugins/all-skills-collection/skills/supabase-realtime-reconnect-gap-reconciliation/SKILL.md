---
name: supabase-realtime-reconnect-gap-reconciliation
description: "Audits and verifies supabase realtime reconnect gap reconciliation with explicit acceptance checks and recoverable failure handling. Use when implementation, configuration, release, or incident evidence must be reviewed for this boundary."
---

# Supabase Realtime Reconnect GAP Reconciliation

## Purpose

Establish an evidence-backed, repeatable procedure for supabase realtime reconnect gap reconciliation, with explicit guardrails and a reusable validation artifact.

## Required inputs

Repository/module and version; intended behavior; current implementation or configuration; representative logs, fixtures or metrics; applicable platform constraints; and the rollback/authorization policy. Supply the exact evidence relevant to supabase realtime reconnect gap reconciliation, and redact credentials and sensitive records.

## Workflow

1. Record Supabase project/environment, schema revision, role/JWT claims, tenant model and relevant feature configuration for supabase realtime reconnect gap reconciliation; redact tokens and customer data.
2. Trace table, view, function, policy, trigger, storage or realtime access paths; identify trusted and untrusted callers and the intended isolation boundary.
3. Write positive authorization cases and negative anonymous, wrong-role and cross-tenant cases; include null, deleted, expired and malformed records where relevant to supabase realtime reconnect gap reconciliation.
4. Run queries or migration tests in local/staging scope, inspect transaction/lock/plan behavior, and test rollback or recovery before proposing production changes.
5. Record schema/commit identifiers, fixture outcomes, policy gaps and a safe follow-up; never treat service-role access as proof that client-side authorization works.

## Validation checklist

- [ ] The scope and intended invariant for supabase realtime reconnect gap reconciliation are explicit and distinguish adjacent responsibilities.
- [ ] Inputs, version/environment and source evidence are recorded without exposing secrets or unnecessary personal data.
- [ ] At least one success case and one negative/boundary/failure case are documented and reproducible.
- [ ] Results include a concrete artifact, command/check output, fixture, or review record rather than an unsupported assertion.
- [ ] Failure handling, remaining uncertainty and any authorization/rollback condition are stated.

## Required output

A supabase realtime reconnect gap reconciliation evidence record containing scope, exact version/commit/environment, assumptions, checks performed, observed results, failure modes, remediation or rollback guidance, and a clear PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not expose secrets or production records in logs. Never broaden RLS or bypass tenant checks as a debugging shortcut; prove both allowed and denied access paths.
If required inputs are missing, record the gap and stop before irreversible changes. Separate implementation from verification, bound retries, preserve a minimal reproduction, and escalate when evidence cannot resolve the issue. Never claim a test, network request, deployment, compatibility result or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A maintainer is changing supabase realtime reconnect gap reconciliation and needs a repeatable procedure with explicit acceptance evidence and failure handling.
- **Negative:** The request concerns an unrelated subsystem and does not cross or depend on the supabase boundary covered by this skill.
