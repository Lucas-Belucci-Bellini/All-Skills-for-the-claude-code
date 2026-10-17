---
name: cross-agent-skill-format-portability-audit
description: "Evaluates whether a canonical skill can be consumed across agent formats without losing important instructions. Use when distributing skills to multiple providers."
---

# Cross-Agent Skill Format Portability Audit

## Purpose

Identify instructions, metadata, file paths, or frontmatter that would break or change meaning when a skill is imported by another agent.

## Required inputs

Canonical SKILL.md, supporting files, source format, target formats and platform versions, plus the task the skill is expected to perform.

## Workflow

1. Parse the frontmatter and inventory references to local files, tools, commands, hooks, environment variables, and provider-specific conventions.
2. Classify each element as portable, transformable, provider-specific, unsafe to transform automatically, or unsupported on each target.
3. Render a target-format copy from the canonical source in a temporary location; do not overwrite the canonical file during compatibility experiments.
4. Compare source intent with rendered output, checking triggers, required workflow steps, safety boundaries, paths, and outputs.
5. Create targeted fixtures that prove the converted skill still activates for its intended task and does not activate for neighboring tasks.

## Validation checklist

- [ ] No safety-critical instruction disappears during conversion.
- [ ] Relative references resolve in the delivered package.
- [ ] Provider-specific commands are guarded by target capability checks.
- [ ] The audit records tested and untested targets separately.
- [ ] A conversion loss report exists whenever information must be omitted or rewritten.

## Required output

A portability report, per-target conversion notes, fixture results, and required manual adaptations.

## Boundaries and failure handling

Do not label a skill universally portable merely because the Markdown renders. Never transform a permission requirement into an unrestricted action or remove provenance notices to fit a target format.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A skill authored for Claude Code must be delivered to Codex or a ChatGPT tool-backed workflow.
- **Negative:** The skill will run only in its original environment and no cross-platform distribution is planned.
