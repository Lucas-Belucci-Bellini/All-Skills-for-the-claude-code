---
name: economy-market-price-stability
description: Test simulated market pricing for oscillation, arbitrage exploits, runaway inflation, and feedback between stock and demand.
---

# Economy Market Price Stability

## Goal

Make prices responsive to scarcity while keeping trade systems bounded and strategically fair.

## Inputs to inspect

Pricing formula, stock tracking, production/consumption rates, currency sources/sinks, taxes, and trading rules.

## Workflow

1. Map all price drivers and delays: inventory, shipments, recent trades, production costs, taxes, NPC budgets, and competing markets.
2. Check dimensional consistency, price bounds, failed transaction rollback, and whether trades update buyer/seller stock consistently.
3. Simulate mass buys/sells, supply interruption, population growth, currency injection, no-substitute goods, and asymmetric market taxes.
4. Measure equilibrium recovery, volatility, unsold inventory, wealth concentration, and arbitrage profitability after travel/time/tax costs.
5. Change one feedback factor at a time and retest transaction splitting, alternating-market arbitrage, and tick-order exploitation.

## Validation checklist

- [ ] Item and currency invariants hold for successful and failed trades.
- [ ] Price response is bounded with documented lag and meaning.
- [ ] Splitting transactions cannot bypass fees, caps, or market-impact rules.
- [ ] Long-run inflation, volatility, and wealth distribution are measured.
- [ ] Gameplay goals are distinct from claims about real-world economics.

## Required output

Create a pricing-driver map, stress scenario set, stability measures, exploit findings, and tested tuning recommendations.

## Boundaries and failure handling

Do not assume a clamp fixes arbitrage loops; do not change coupled coefficients together and claim a single cause.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
