# Skill inspiration and provenance review: Playwright, OpenTelemetry Collector, and Temporal TypeScript SDK

- **Reviewed on:** 2026-10-16
- **Purpose:** document conceptual sources for the 150-skill expansion from 1,000 to 1,150.

## Repositories reviewed

- [Microsoft Playwright](https://github.com/microsoft/playwright): browser automation, context isolation, test fixtures, traces, and cross-browser testing.
- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector): receiver/processor/exporter pipelines, data routing, backpressure, and telemetry processing.
- [Temporal TypeScript SDK](https://github.com/temporalio/sdk-typescript): durable TypeScript workflows, activities, retries, replay, testing, and worker lifecycle.

## Originality and license boundaries

The new entries under curated-skill-sources/playwright-e2e-engineering, opentelemetry-collector-engineering, and temporal-durable-workflows are original procedural workflows. They do not copy source implementation, browser binaries, production telemetry, customer histories, credentials, or external service payloads.

- Playwright root LICENSE declares Apache-2.0.
- OpenTelemetry Collector root LICENSE declares Apache-2.0.
- Temporal TypeScript SDK root LICENSE declares MIT.

These root notices do not automatically cover every dependency, downloaded browser artifact, test fixture, telemetry dataset, or external integration. Review the precise component and notice before adding third-party files or data; this note is provenance documentation, not legal advice.

## Safe-use boundaries

- Browser tests must use synthetic accounts or authorized staging environments, mask sensitive screenshot regions, and avoid committing real session state.
- Collector tests must use synthetic or sanitized telemetry, bound queues/cardinality/retries, and account separately for accepted, dropped, refused, and exported signals.
- Temporal workflow tests must preserve determinism, keep side effects in activities, and never replay or terminate production executions merely to collect evidence.

## Validation status

Exact-name uniqueness, manifest structure, frontmatter, source/plugin parity, and CI are separate checks. A broad human semantic-overlap review, clean-profile Claude Code installation/discovery, and component-level license review remain separate quality gates and must be reported only when actually completed.
