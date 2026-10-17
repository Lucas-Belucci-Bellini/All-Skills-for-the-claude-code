---
name: k8s-startup-probe-rollout-guard
description: "Validate kubernetes startup probe rollout guard with explicit acceptance criteria, failure handling, and reviewable evidence."
---

# Kubernetes Startup Probe Rollout Guard

## Purpose

Make kubernetes startup probe rollout guard a reviewable engineering contract. Define expected state, dangerous boundary conditions and a reproducible verification path instead of relying on tribal knowledge or a single successful happy-path run.

## Required inputs

Relevant Deployment/StatefulSet/DaemonSet/Service/Ingress/CRD manifests, Helm/Kustomize inputs, cluster version, rollout events, resource metrics, RBAC bindings, and sanitized controller logs.

## Workflow

1. Locate the manifest, controller/reconciler, cluster version and owning team relevant to kubernetes startup probe rollout guard; record namespace, workload identity and deployment revision.
2. Define the operational invariant for kubernetes startup probe rollout guard: expected state, failure threshold, availability budget, affected workloads and an explicit stop condition.
3. Construct a staging or kind-based fixture with healthy state, controlled failure and a boundary case such as capacity pressure, expired credentials or a dependent service outage.
4. Validate schemas and policy against the relevant Kubernetes API version; check interactions with admission webhooks, quotas, scheduling, RBAC and disruption budgets.
5. Exercise the rollout or reconciliation path and capture events, status conditions, readiness transitions, controller retries and resource metrics.
6. Verify that degradation remains bounded and recovery is repeatable; test rollback or reconciliation after reverting the smallest proposed change.
7. Publish the manifest diff, expected/observed state matrix, affected version scope, commands and evidence links; mark real-cluster-only checks pending.

## Validation checklist

- [ ] Kubernetes version, namespace and workload owner are recorded.
- [ ] The invariant names an observable status, event or metric and failure threshold.
- [ ] A normal case and an adverse or resource-pressure case are represented.
- [ ] RBAC and workload identity remain least-privilege.
- [ ] Availability, scheduling, termination and recovery behavior are considered.
- [ ] Validation does not silently change production or bypass admission policy.
- [ ] Untested cluster-specific assumptions are marked pending.

## Required output

Produce a Kubernetes operations report with manifest diff, readiness/status matrix, availability impact, reproducible tests and rollback/reconciliation guidance. Include target revision/environment, acceptance criteria, command or artifact references, pass/fail/blocked results, unresolved assumptions and the owner for the next action.

## Boundaries and failure handling

Use a disposable cluster or approved staging namespace for disruptive probes, drains, upgrades or restore tests. Do not delete production workloads, weaken RBAC/admission policy, or force CRD upgrades to manufacture a pass. If the control plane, metrics source or controller logs are unavailable, mark checks unknown and name the missing evidence; absence of events is not proof of health.

## Trigger examples

- **Positive:** A deployment, operator, or cluster change needs a reproducible check for kubernetes startup probe rollout guard.
- **Negative:** A request asks to bypass RBAC, ignore a failed readiness gate, delete live data, or force an unreviewed production rollout.
