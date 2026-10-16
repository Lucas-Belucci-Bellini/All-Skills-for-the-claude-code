---
name: multi-region-failover-readiness-test
description: "Assess and rehearse regional failover against explicit recovery-time, recovery-point, fencing, routing and data-consistency requirements."
---

# Multi-Region Failover Readiness Test

## Purpose

Determine whether a service can move traffic between regions without split-brain writes, unacceptable data loss or undocumented recovery delay.

## Required inputs

Region topology, replication mode/lag, RTO/RPO, traffic routing, write fencing, runbook and failover permission.

## Workflow

1. Map stateful/stateless components, write authority, replication direction and single-region control-plane dependencies.
2. Translate RTO and RPO into measurable criteria using replication lag and required recovery steps.
3. Validate promotion, writer fencing, connection draining, routing, secrets/config availability and background worker ownership.
4. Run a non-production rehearsal or explicitly approved bounded exercise; record duration, data divergence, stale-write rejection and recovery actions.
5. Test failback separately, including reconciliation of region-local writes and prevention of dual authoritative writers.

## Validation checklist

- [ ] RTO/RPO targets are concrete and measurable.
- [ ] A former primary cannot continue authoritative writes after promotion.
- [ ] Replication lag and potential loss are measured before cutover.
- [ ] Routing, credentials and dependencies exist in the target region.
- [ ] Failback has data reconciliation and re-fencing steps.

## Required output

A component/region matrix, rehearsal evidence, actual RTO/RPO measurements, gaps and go/no-go recommendation.

## Boundaries and failure handling

Do not switch production traffic or promote a writer without explicit approval. Replication configuration alone does not prove zero data loss. If safe fencing is absent, block the failover.

## Trigger examples

- **Positive:** Proving a secondary region can assume writes during a regional outage.
- **Negative:** Comparing cloud prices without continuity requirements.
