---
name: data-retention-deletion-verification
description: "Use when verifying that retention or deletion policy is enforced across primary stores, replicas, derived data, caches, and export flows; not for deciding legal retention policy."
---

# Data Retention Deletion Verification

## Purpose

Turn a data-retention rule into observable deletion coverage and exception handling.

## Required inputs

Approved retention rule, data inventory, object lineage, deletion APIs/jobs, legal-hold exceptions, backup semantics, and audit requirements.

## Workflow

1. Map the data subject or record from primary storage through replicas, indexes, event streams, caches, analytics, exports, and third-party processors.
2. Convert each policy rule into a due date, deletion/retention action, permitted exception, and evidence requirement.
3. Test expired, recently updated, legally held, already deleted, and partially failed records using synthetic data.
4. Trace completion and retry behavior across each store; document backup expiry separately when immediate backup rewrite is not technically supported.

## Verification checklist

- [ ] Every known copy has an owner and a retention/deletion behavior.
- [ ] Exceptions are narrow, approved, and auditable.
- [ ] Retries are idempotent and partial failures are detectable.
- [ ] The report distinguishes deletion from tombstoning, access revocation, and backup expiration.

## Required output

A retention coverage matrix, synthetic test results, exception register, and outstanding deletion-evidence gaps.

## Boundaries and failure handling

Do not independently interpret law or override a legal hold. Use approved policy and avoid including real personal data in test artifacts.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A user deletion workflow removes the account row but leaves export files and caches.
- **Negative:** Choosing how long a business is legally required to retain records.
