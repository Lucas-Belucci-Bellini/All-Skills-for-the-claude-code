---
name: configuration-and-secret-management
description: "Structures runtime configuration and secret handling with validation, clear precedence, and least privilege. Use when managing environment variables, feature flags, credentials, or deployment-specific settings."
---

# Configuration and Secret Management

## Goal
Keep configuration predictable across environments and protect secrets throughout development, CI, deployment, and runtime.

## Workflow
1. Inventory configuration inputs, required/optional values, defaults, allowed ranges, and the components that consume them.
2. Define and document precedence between defaults, local files, environment variables, deployment settings, and secret stores.
3. Parse configuration once at a clear startup boundary and validate types, required values, URLs, ranges, and incompatible combinations.
4. Separate ordinary configuration from secrets; never commit live credentials or place them in example files, logs, screenshots, or test fixtures.
5. Use the platform's approved secret store and least-privilege credentials; prefer short-lived credentials and rotation where available.
6. Provide safe local-development templates with placeholders and clear setup instructions.
7. Fail startup with actionable, redacted errors when critical configuration is invalid; avoid silently substituting insecure defaults.
8. Ensure secret rotation and configuration changes have a defined reload/restart policy.
9. Test missing, malformed, conflicting, and production-like configuration without printing sensitive values.
10. Document ownership, rotation cadence, access policy, and incident response for leaked secrets.

## Deliverable
- Configuration schema and precedence.
- Validation and startup behavior.
- Secret storage, access, and rotation guidance.

## Acceptance criteria
- Invalid configuration is caught early.
- Secrets are absent from source control and diagnostics.
- Environment differences are explicit and reproducible.
- Permissions and rotation responsibilities are defined.

## Guardrails
- Do not request or reproduce actual secret values in documentation.
- Do not add credentials to commits, logs, or generated artifacts.
- Do not use permissive production defaults to mask missing configuration.

