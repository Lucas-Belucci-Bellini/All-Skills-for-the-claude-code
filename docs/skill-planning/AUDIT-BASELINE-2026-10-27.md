# Auditoria inicial da biblioteca de skills

> Snapshot remoto de 27/10/2026. Auditoria preliminar da árvore Git e metadados; não substitui testes em checkout limpo, revisão semântica ou auditoria de licenças.

## Escopo e método

- Repositório: `Lucas-Belucci-Bellini/All-Skills-for-the-claude-code`
- Branch examinada: `main`
- Commit de referência: `66156930b39c2ad817cacb9d56f94b0625514467`
- Foram lidos a árvore Git recursiva, `SKILL_LIBRARY_CATALOG.json`, `README.md`, `AGENTS.md`, `SKILL_GROWTH_ROADMAP.md`, o sincronizador e o workflow de validação.
- Nenhum script de sync/teste foi executado localmente neste levantamento.

## Resultados observados

| Medida | Resultado | Interpretação |
|---|---:|---|
| Entradas na árvore Git | 7.233 | Caminhos/objetos, não skills. |
| Caminhos terminados em `SKILL.md` | 3.013 | Incluem fontes, bundles e outros plugins; cópias não são skills extras. |
| Entradas no catálogo JSON | 1.500 | Contagem declarada pelo catálogo de `main`. |
| Nomes únicos no catálogo | 1.500 | Nenhuma duplicata exata de nome no JSON. |
| `origin: new-authored` | 1.374 | Entradas marcadas como autorais. |
| `origin: existing` | 126 | Entradas mantidas/importadas. |
| Caminhos de bundle presentes | 1.500/1.500 | Todos os caminhos esperados existem na árvore. |
| Caminhos de fonte autoral presentes | 1.374/1.374 | Todos os `source_path` das autorais existem. |
| Diferenças de SHA fonte/bundle autorais | 0 | Todos os pares comparáveis têm SHA igual. |

Os resultados demonstram consistência estrutural no snapshot, não qualidade semântica, funcionamento dos exemplos, licença aprovada nem descoberta/instalação em runtime.

## Inconsistências e riscos

### 1. Baseline histórica

A documentação de `main` declara 1.500 entradas. A [Issue #39](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/39) registra uma baseline anterior de 1.150 e relata PRs de expansão/reversão. Antes de usar uma contagem como baseline final, reconciliar histórico, merges, reverts, branches, catálogo e bundles. Títulos de branch/PR não provam que um lote foi publicado.

### 2. Fonte canônica

- `AGENTS.md` manda tratar `.agents/skills/` como conteúdo primário, mas esse diretório não existe no snapshot de `main`.
- O catálogo usa `curated-skill-sources/` como caminho das 1.374 skills autorais e `plugins/all-skills-collection/skills/` como bundle distribuído.
- O sincronizador lê fontes de vários diretórios e gera o bundle.

**Ação:** criar uma ADR sobre fonte de verdade, arquivos gerados e política de edição. Não migrar, renomear ou regenerar em massa antes da decisão.

### 3. CI de sincronização

`.github/workflows/skill-sync-validation.yml` tem gatilho `push` apenas para uma lista de branches específicas e `workflow_dispatch`; não define `pull_request`. A branch documental `docs/planned-skills-registry-2026-10-26` não está nessa lista. Portanto, ausência de execução nessa PR não é aprovação: o workflow existente não é acionado para ela pelo gatilho atual.

**Ação:** revisar separadamente quais PRs que alteram fontes/catálogos devem executar validação e com quais permissões mínimas.

## Fila remota observada

Foram encontradas 125 Issues abertas e 10 PRs abertas em rascunho antes da PR documental #148.

| PR | Escopo indicado | Estado observado |
|---:|---|---|
| [#9](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/9) | Marco 450 | Aberta, Draft |
| [#10](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/10) | Marco 475 | Aberta, Draft |
| [#13](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/13) | Correção de alvo de sincronização | Aberta, Draft |
| [#14](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/14) | Marco 525 | Aberta, Draft |
| [#15](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/15) | Marco 550 | Aberta, Draft |
| [#16](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/16) | Marco 600 | Aberta, Draft |
| [#17](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/17) | Marco 850 | Aberta, Draft |
| [#20](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/20) | Marco 1.000 | Aberta, Draft |
| [#44](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/44) | Integração multiagente, marco 1.175 | Aberta, Draft |
| [#42](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/42) | ATM10, marco de rascunho 1.250 | Aberta, Draft |

As PRs #17, #42 e #44 foram consultadas individualmente e continuam abertas, Draft e não mescladas. Ainda é necessário comparar os SHAs de base e de cabeça de todas as PRs para mapear dependências; não fazer merge pela ordem numérica nem assumir que as contagens de títulos estão publicadas em `main`.

## Sobreposição a revisar antes de nomear novas skills

- Blender: Issue #48 (250 candidatas) e Issues #61–#70 (domínios especializados).
- Texturas: Issue #50 (NEXORA) e Issue #65 (texturas/materiais Blender).
- Engines: Issue #71 é mestre; Issues #72–#96 são domínios.
- Criação de jogos: Issue #97 é mestre; Issues #98–#147 são domínios.
- Impressão 3D: Issues #56–#59 precisam de fronteiras explícitas para evitar dupla contagem.
- Roadmap anual da Issue #49 é projeção de longo prazo, não um lote adicional.

Uma skill compartilhada deve ter uma identidade canônica; outros planos devem referenciá-la, não contar suas cópias.

## Plano de ação

### P0 — Antes de expansão em volume
1. [ ] Reconciliar baseline de `main` com Issues, PRs, merges e reverts.
2. [ ] Comparar bases/SHAs das PRs abertas e documentar dependências.
3. [ ] Aprovar ADR sobre fonte canônica e cópias geradas.
4. [ ] Executar `node tools/sync-skill-bundles.mjs --check` em checkout limpo e o validador de manifesto aplicável; guardar saídas reais.
5. [ ] Decidir, em tarefa separada, o gatilho adequado de CI para PRs de skills.

### P1 — Planejamento em Markdown
1. [ ] Decompor Issues existentes gradualmente usando `DOMAIN-PLAN-TEMPLATE.md`.
2. [ ] Registrar candidatas individualmente com ID provisório e estado `PLANNED`.
3. [ ] Conferir catálogo, fonte canônica, bundle e vizinhos semanticamente semelhantes antes da aprovação.
4. [ ] Não somar metas de Issues-mestre com as filhas e não criar placeholders `SKILL.md`.

### P2 — Implementar lotes
1. [ ] Confirmar que a tarefa ainda é uma lacuna, não algo existente em outra branch/PR.
2. [ ] Implementar em branch dedicada, revisar o diff e rodar os testes aplicáveis.
3. [ ] Registrar validações não executadas; manter Draft PR quando houver pendências.
4. [ ] Fechar uma Issue somente com evidências para seus critérios de aceitação.

## Limitações e critério de conclusão

A revisão foi remota. Ainda não foram executados testes locais, análise semântica de duplicatas, auditoria de proveniência/licenças ou teste de instalação/descoberta em Claude Code. Nenhuma causa específica de sinalização de conta deve ser inferida a partir deste projeto.

A Issue #30 deve permanecer aberta até haver inventário reproduzível, matriz de lacunas com evidências, diagrama de arquitetura e ADRs prontos, com limitações restantes registradas. Este documento é uma entrega parcial, não encerra a Issue.
