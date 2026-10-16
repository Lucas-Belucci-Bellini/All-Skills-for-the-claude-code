---
name: release-evidence-retention-policy
description: "Use when deciding how long release manifests, test reports, attestations, and deployment evidence remain available; not for end-user data retention."
---

# Release Evidence Retention Policy

## Purpose

Keep release decisions auditable for the required period without uncontrolled artifact growth.

## Required inputs

Evidence types, audit/support needs, storage locations, approved retention requirements, access rules, and deletion automation.

## Workflow

1. List evidence types including revisions, CI results, SBOM/provenance, signatures, test reports, deployment decisions, and rollback records.
2. Assign each type an owner, retention period, immutable identity, access scope, and archive/deletion mechanism.
3. Test retention for successful, failed, canceled, and rolled-back releases across each storage system.
4. Reconcile missing evidence, early deletion, expired artifacts, and unexpected storage growth.

## Verification checklist

- [ ] Rules cover failure and rollback evidence where required.
- [ ] Evidence maps to immutable release/artifact identity.
- [ ] Access controls protect sensitive logs without blocking required audit use.
- [ ] Expiry, manual deletion, and legal holds are distinct.

## Required output

An evidence inventory, retention matrix, gap report, and periodic verification plan.

## Boundaries and failure handling

Follow approved policy; do not invent retention periods or delete evidence to meet a storage target.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** CI artifacts expire before the supported rollback/audit window.
- **Negative:** Selecting a legally required retention period for user records.
