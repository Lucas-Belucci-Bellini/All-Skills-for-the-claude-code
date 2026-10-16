---
name: wasm-host-capability-restriction
description: "Use when restricting a WebAssembly plugin's filesystem, network, or host callbacks to its intended capability set; not for MCP OAuth scopes."
---

# Wasm Host Capability Restriction

## Purpose

Prevent WASM extensions from obtaining host capabilities beyond their declared purpose.

## Required inputs

WASM imports/exports, runtime configuration, host callbacks, filesystem/network policy, plugin trust level, test module.

## Workflow

1. Enumerate imports, WASI interfaces, host objects, filesystem preopens, network and process capabilities.
2. Map each capability to a plugin requirement and mark necessary, optional, or prohibited.
3. Test undeclared imports, preopen path traversal, and access to omitted capabilities in a sandbox.
4. Verify resource limits and host callback validation are enforced by runtime code.

## Verification checklist

- [ ] Import list is explicit per plugin class.
- [ ] Filesystem preopens and callbacks are least-privilege.
- [ ] Undeclared capability use fails closed with diagnostics.
- [ ] CPU, memory and call-depth limits are considered.

## Required output

A capability matrix, constrained runtime profile, negative-test results, and residual risks.

## Boundaries and failure handling

Do not execute unknown modules with broad imports; use disposable sandbox resources.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A game mod running as WASM needs only a limited world-query API.
- **Negative:** Auditing remote MCP OAuth permissions with no WASM runtime.
