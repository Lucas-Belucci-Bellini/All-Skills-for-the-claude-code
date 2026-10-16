---
name: economy-production-sink-invariants
description: Track resource sources, transformations, losses, and sinks to catch duplication, dead-end accumulation, and impossible production chains in simulated economies.
---

# Economy Production Sink Invariants

## Goal

Keep long-running economies internally consistent and reveal why shortages or inflation emerge.

## Inputs to inspect

Production recipes, resource flows, storage, trade, currency sources/sinks, spoilage, and simulation tick order.

## Workflow

1. Build a directed resource graph for raw inputs, transformations, byproducts, storage, imports, exports, destruction, decay, and currency issuance/removal.
2. Write conservation or bounded-growth invariants for each resource class; distinguish created resources from transformed resources and intentional losses.
3. Simulate equilibrium, input shortages, production bottlenecks, sudden demand, transport failures, and rapid population change over long horizons.
4. Check update order and transaction atomicity so a failed crafting/trade/job cannot consume inputs without output or create output without cost.
5. Use telemetry to locate resource piles, zero-throughput chains, runaway currencies, and repeated shortage loops; change one rule at a time.

## Validation checklist

- [ ] Resource creation and destruction have named causes in simulation events.
- [ ] Failed operations preserve transaction invariants.
- [ ] Byproducts and conversions are accounted for without double counting.
- [ ] Long runs reveal accumulation or collapse before it becomes a silent softlock.
- [ ] Accepted abstractions such as infinite-source resources are explicit and excluded from conservation claims.

## Required output

Deliver a resource-flow graph, invariant set, long-run scenario report, bottleneck evidence, and tested rule adjustments.

## Boundaries and failure handling

Do not assume all resources must be conserved; do not apply global caps without identifying the creation/consumption loop that requires correction.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
