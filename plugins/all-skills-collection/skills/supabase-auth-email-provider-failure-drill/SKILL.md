---
name: supabase-auth-email-provider-failure-drill
description: "Validate supabase auth email provider failure drill, including boundary cases, evidence capture, and safe failure handling."
---

# Supabase Auth Email Provider Failure Drill

## Purpose

Make supabase auth email provider failure drill explicit, testable, and auditable instead of relying on undocumented assumptions. Establish the intended invariant, identify the affected boundary, and produce evidence another engineer can reproduce.

## Required inputs

Schema and migration files, RLS policies, role/tenant matrix, relevant API or Edge Function code, sanitized logs, and staging fixtures. Focus this review on supabase auth email provider failure drill and record applicable runtime, version, identity, and ownership constraints.

## Workflow

1. Locate the authoritative implementation, configuration, data contract, owner, and version boundary for supabase auth email provider failure drill; distinguish local assumptions from platform guarantees.
2. Write the acceptance invariant and the conditions that make it false. Record the expected result, permitted actors, resource boundaries, and failure budget before changing anything.
3. Build a minimal reproducible fixture covering an authorized request, a forbidden role/tenant request, and a timeout or partial-failure case. Keep test data synthetic or sanitized, and make event ordering and expected results explicit.
4. Run supported automated tests and static checks. When execution is unavailable, document the exact command/assertion to run and mark it pending rather than claiming it passed.
5. Compare observed evidence against the invariant using sanitized SQL/test output, migration plans, role assertions, and measured recovery or latency data. Separate confirmed failures, likely causes, false positives, and missing evidence.
6. Propose the smallest corrective change, add a regression test, and document the impact, recovery/rollback path, owner, and any time-bounded exception.
7. Re-run relevant checks and produce the required output with pass/fail/pending status, evidence references, and residual risks.

## Validation checklist

- [ ] The authoritative source, environment, owner, and relevant version are identified.
- [ ] Expected behavior and a concrete failure condition for supabase auth email provider failure drill are documented.
- [ ] Positive, negative, and boundary/failure cases are reproducible without unnecessary production access.
- [ ] Assertions distinguish a pass from a skipped, flaky, stale, or unavailable check.
- [ ] Diagnostics are useful and sanitized; secrets and unrelated user data are excluded.
- [ ] Any remediation has a regression check and recovery/rollback or exception-expiry plan.
- [ ] The report names evidence, unresolved questions, and the next accountable action.

## Required output

Produce a database/platform validation report with invariant matrix, reproducible tests, impact assessment, and rollback or recovery notes. Include a concise decision marked PASS, FAIL, or PENDING; exact evidence paths or command output references; observed versus expected behavior; and an owner/date for unresolved issues.

## Boundaries and failure handling

Use staging or synthetic fixtures. Do not disable RLS, expose service-role keys, apply an unreviewed production migration, or delete live objects. Stop if safe evidence requires a destructive action. Treat unavailable services or missing privileges as unresolved checks, not passes; stop before irreversible operations and document the recovery path.

## Trigger examples

- **Positive:** A schema, policy, or platform change needs evidence that the relevant contract holds for allowed and forbidden requests.
- **Negative:** The request asks to change a live schema or disable a security policy without approval, a maintenance window, or rollback.
