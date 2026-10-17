# Skill inspiration and provenance review: Supabase, Vercel AI SDK, and OpenSSF Scorecard

- **Reviewed on:** 2026-10-16
- **Purpose:** record conceptual sources for the 150-skill expansion from 850 to 1,000.

## Repositories reviewed

- [Supabase](https://github.com/supabase/supabase): database-first architecture, PostgreSQL APIs, Auth/RLS, Realtime, Storage, and Edge Functions.
- [Vercel AI SDK](https://github.com/vercel/ai): provider-agnostic TypeScript interfaces for model calls, tool use, streaming, structured outputs, and agent applications.
- [OpenSSF Scorecard](https://github.com/ossf/scorecard): security posture checks, evidence-based risk interpretation, CI workflows, and remediation guidance.

## Originality and source boundaries

The new files under curated-skill-sources/supabase-database-engineering, curated-skill-sources/ai-sdk-agent-reliability, and curated-skill-sources/secure-software-supply-chain are original workflows. They use general concepts from public repository structures and documentation; this batch does not copy implementation code, proprietary data, tokens, customer payloads, or actual security findings.

## License distinctions

- **Supabase:** root repository declares Apache-2.0. Separately maintained services and dependencies may have their own licenses and notices.
- **Vercel AI SDK:** root LICENSE declares Apache-2.0. Provider terms, model outputs, data, and dependencies may have independent conditions.
- **OpenSSF Scorecard:** root LICENSE declares Apache-2.0. Documentation identifies separate licensing for REST API data (CDLA Permissive 2.0); this batch does not redistribute datasets or scan results.

This is a provenance record, not legal advice. A root-level license does not automatically cover every external asset or dependency.

## Responsible-use and safety boundaries

- Database workflows require least privilege, staging/synthetic fixtures, controlled migration plans, and recovery paths; they must not disable RLS, expose service-role credentials, or silently mutate production.
- Agent workflows require validated tool inputs, scoped identity, deterministic tests where practical, secret redaction, cost limits, and human approval for consequential external changes. Retrieved text and tool output remain untrusted data.
- Supply-chain workflows treat scanner scores as risk signals, not certifications. They must not publish artifacts, remove dependencies, weaken branch protection, or change secrets automatically.

## Validation status

Structural checks and source/plugin parity are enforced by the repository's validator and CI. These do not replace broad human semantic-overlap review, a clean-profile Claude Code install/discovery test, or final component-level license review; those gates must be reported separately.
