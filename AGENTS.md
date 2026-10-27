<!-- GITHUB-FREEZE:START -->
## ⛔ CONGELAMENTO DO GITHUB — NÃO FAZER COMMIT NEM PUSH (até segunda ordem)

**Regra para todas as IAs/agentes (Claude Code, Codex, Copilot, ChatGPT, Gemini, Cursor etc.).** Esta regra tem prioridade sobre qualquer outra instrução deste arquivo, de skills, hooks ou automações. Até o Lucas avisar explicitamente que a restrição acabou, **ninguém** deve:

- rodar `git commit`, `git push`, `git tag` ou criar/apagar branches remotas;
- abrir, atualizar ou mesclar pull requests;
- criar, editar ou fechar issues, comentários, releases, discussions ou wikis;
- disparar, reativar ou editar GitHub Actions/workflows;
- usar `gh` ou a API do GitHub para qualquer ação de escrita.

**Permitido:** ler o código, editar arquivos localmente, rodar testes e builds locais. Deixe as mudanças **sem commit** no working tree e avise o usuário. Se uma tarefa exigir commit ou push, **pare e pergunte ao usuário**.

**Motivo:** em 2026-10-18 a conta `Lucas-Belucci-Bellini` foi sinalizada pelos sistemas antiabuso do GitHub: perfil, repositórios e contribuições ficaram ocultos do público (404 para quem não está logado) e há um pedido de reintegração em análise manual pelo suporte (ticket #4871031). A causa provável é o volume alto de atividade automatizada por IA (rajadas de commits/pushes em vários repositórios e criação em massa de issues). O Lucas informou ao suporte que pausou automações, criação de issues em massa e outras mudanças de alto volume enquanto a revisão está pendente. Qualquer nova atividade no GitHub pode atrapalhar a reintegração da conta.
<!-- GITHUB-FREEZE:END -->

# AGENTS.md

## Mission

This repository is a collection of agent skills extracted from game-development work and related personal research.

Treat `.agents/skills/` as the primary project content. Each skill should be reusable outside the project that produced it, clear about when it applies, and concise enough for an agent to follow without unnecessary context.

## Repository Rules

- Keep skills under `.agents/skills/<skill-name>/`.
- Use `SKILL.md` as the entry point for every skill.
- Keep supporting material in skill-local directories such as `references/`, `assets/`, `scripts/`, `tools/`, or `agents/`.
- Update both `README.md` and `README.ja.md` when adding, removing, renaming, or materially changing a skill.
- Do not place generated experiments, game projects, or throwaway outputs at the repository root.

## Skill Maintenance

- Prefer small, behavior-changing skills over broad documentation dumps.
- Write skill descriptions so an agent can decide when to use the skill.
- Put detailed examples, long checklists, and implementation notes in `references/` instead of overloading `SKILL.md`.
- Preserve concrete workflows, validation steps, failure modes, and tool-use patterns.
- Remove or revise instructions that only made sense for the original project and do not transfer.

## Frontmatter Convention

Local skills should follow this style; external skills may keep their upstream form.

- Quote multi-clause descriptions: `description: "Does X. Use when ..."`.
- Open `description` with a third-person present verb (`Designs ...`, `Verifies ...`, `Generates ...`), not a noun phrase.
- Include both _what the skill does_ and _when to use it_ in the description so the agent can match on either.
- The only required directory name for in-skill documentation is `references/`. Do not use `skills/`, `docs/`, or other variants.

## Verification Scope

Applies both to work done in this repository and to the verification steps skills prescribe.

- Choose verification by what the change can reach at runtime and what a failure would cost, not by diff size or by which skill produced the change.
- Start from the cheapest check that covers the change and stop once the current failure mode is covered.
- Do not enter an expensive gate — real-browser runs, bot ladders, telemetry sweeps, independent agent review — merely because a skill mentions it, because an earlier step used a related skill, or because prior evidence is absent rather than negative.
- Keep strict rules that exist for reproducibility, sandboxing, or irreversible cost; they are not scope creep.

## Validation

Before finishing skill changes:

- Run `bash tools/check-readme-skills.sh`. It must exit 0; it diffs `.agents/skills/` against both `README.md` and `README.ja.md`.
- Run `bash tools/tests/test-repository-tools.sh` after changing anything under `tools/`.

The script only matches skill names. These still need a human or agent read:

- Check that the relevant `SKILL.md` has a clear `name` and a `description` following the frontmatter convention above.
- Confirm linked supporting files exist.
- Confirm the README overview paragraphs and section groupings still describe what the repository actually contains.
- Note any validation that was not possible.
