# Plano local — All-Skills-for-the-claude-code

**Data:** 2026-10-19
**Base:** leitura das 125 issues abertas (#7–#147), das 10 PRs Draft abertas e do estado da `main` (`6615693`).
**Status:** só planejamento. Este arquivo ainda não foi commitado nem enviado ao GitHub.

---

## 0. Regra principal enquanto a conta está em revisão

No ticket #4871031, você se comprometeu com o Suporte do GitHub a:

> pausar a criação de issues em massa e outras mudanças de alto volume enquanto a revisão estiver pendente.

Por isso, **todo o trabalho deste plano é local até o GitHub responder**:

| Pode (local) | Não fazer até a conta ser restaurada |
|---|---|
| Editar arquivos e rodar scripts, deixando tudo **sem commit** | `git commit` (inclusive local), `git push`, abrir/fechar/editar PRs |
| Ler issues e PRs com `gh` (só leitura) | Criar, fechar, editar ou comentar issues em lote |
| Escrever relatórios em `docs/` | Rodar workflows/automações que escrevem no GitHub |
| Revisar e consertar skills | Gerar centenas de skills por dia |

Depois da restauração, também vale um **ritmo humano**: poucos PRs por semana, commits agrupados de forma lógica e nenhum script criando issues ou PRs sozinho.

### O que o histórico mostra (fatos, não diagnóstico do GitHub)

- O repositório tem **850 commits**, todos entre **15 e 17/10/2026**. Foram 467 commits no dia 15, 138 no dia 16 e 245 no dia 17.
- **~100 issues** do tipo "Planejar 2.000/2.500 skills" foram criadas no mesmo dia (**18/10**). Somadas, elas planejam cerca de **204 mil skills**.
- O `README.md` da raiz é uma **cópia do README do diretório oficial de plugins da Anthropic**. Ele diz, por exemplo, *"Internal plugins developed and maintained by Anthropic"* e mostra `/plugin install {plugin-name}@claude-plugins-official`.

Não dá para saber qual desses pontos (ou outro) gerou o flag. Mesmo assim, os três são padrões que sistemas antiabuso costumam olhar: volume concentrado, criação de issues em massa e conteúdo que parece de outra organização. Por isso, os três entram como prioridade alta abaixo.

---

## 1. Estado real do repositório (verificado em 19/10)

- **Catálogo na `main`:** 1.500 skills distintas (1.374 autorais + 126 importadas). Fonte canônica em `curated-skill-sources/` (27 categorias) e cópia em `plugins/all-skills-collection/skills/`.
- **Distribuição desigual:** `minecraft-modded-environments` tem 230 skills, `flipperzero` 125 e `release-testing-operations` 109. Já `accessibility` e `documentation` têm 8 cada.
- **Tamanho:** a mediana de um `SKILL.md` é de **43 linhas**. Muitas skills de um mesmo lote compartilham blocos idênticos de checklist (grupos de 50–80 cópias exatas).

### Defeitos concretos encontrados

1. **199 skills com o texto literal `undefined`**, geralmente em `**Negative:** undefined` (preenchimento de template falhou):
   - `minecraft-modded-environments`: 75
   - `agent-tooling`: 68
   - `skill-library-governance`: 56
2. **161 skills com frases quebradas** do tipo `Produce do not report ...`. Nessas, os campos do template caíram na seção errada: "Purpose" contém a lista de inputs, um passo do workflow é na verdade a saída, e assim por diante. Exemplo: `curated-skill-sources/skill-library-governance/agent-adapter-cross-provider-metadata-parity/SKILL.md`.
3. **`AGENTS.md` desatualizado:** ele manda usar `.agents/skills/`, `tools/check-readme-skills.sh` e `tools/tests/test-repository-tools.sh`, mas **nenhum desses existe**. A validação real está em `tools/sync-skill-bundles.mjs`, `tools/validate-skill-batch.mjs` e `.github/workflows/skill-sync-validation.yml`.
4. **`README.md` / `README.ja.md`** descrevem o repositório como sendo da Anthropic (ver seção 0).
5. **Raiz bagunçada:** há dezenas de plugins soltos, `rea-agent-skills-pack (1)` (cópia duplicada) e arquivos `REA ... .md`, contrariando a regra do `AGENTS.md` de não deixar material solto na raiz.
6. **10 PRs Draft obsoletas** (#9, #10, #13–#17, #20, #42, #44). O conteúdo delas já entrou na `main` pelo PR #45 (marco 1.500).
7. **`SKILL_GROWTH_ROADMAP.md` é gerado** por `tools/sync-skill-bundles.mjs`. Não editar à mão.

---

## 2. Mapa das 125 issues abertas

### Grupo A — Marcos de contagem (provavelmente já concluídos ou superados)

| Issue | Assunto | Situação provável | Ação (após restauração) |
|---|---|---|---|
| #7 | Marcos 425–525 | Superado (`main` = 1.500) | Fechar com comentário curto |
| #8, #12 | Meta 500 → 2.500 e processo de lotes | Processo útil; a meta numérica perdeu sentido | Manter #12 como **regra de qualidade**; fechar #8 |
| #18 | Marco 850 (OSIRIS, AERIS-10, Flipper) | Conteúdo está na `main` | Verificar a CI e fechar |
| #19 | Marco 1.000 (Supabase, AI SDK, Scorecard) | Na `main` | Fechar |
| #21 | Marco 1.150 (Playwright, OTel, Temporal) | Na `main` | Fechar |
| #23 | Marco 1.300 (Kubernetes, Buildx, OpenFeature) | **Não existe na `main`** (PR #24 revertido) | Reavaliar: só fazer se houver uso real |
| #25 | ATM10, 100 skills | Na `main`, **mas com defeitos** (ver 1.2) | Manter aberta até o reparo |
| #26 | ProjectE, 100 skills | Na `main`, **mas com defeitos** | Manter aberta até o reparo |
| #39 | Roadmap 1.150 → 2.500 | Desatualizado | Substituir por este plano |
| #46, #47 | Marcos 1.750 e 2.000 | Não iniciados | Congelar (ver seção 4) |

### Grupo B — "Cenário 3": transformar a coleção em sistema (o trabalho mais valioso)

| Issue | Fase |
|---|---|
| #29 | Issue mestre |
| #30 | F0: inventário e arquitetura |
| #31 | F1: catálogo, metadados e qualidade |
| #32 | F2: busca e roteamento de skills |
| #33 | F3: orquestração |
| #34 | F4: contexto por projeto e handoff |
| #35 | F5: segurança e aprovação humana |
| #36 | F6: testes e benchmarks |
| #37 | F7: observabilidade e recuperação |
| #38 | F8: pilotos reais (ATM10, NEXORA, Cosmos, web) |
| #40 | F9: Skill Broker |
| #41 | F10: ciclo automático de skills |
| #43 | F11: acesso multiagente |

Essas fases geram **pouco volume de commits e muito valor**. As fases F0–F2 e F6 começam por consertar o que já existe, e nenhuma depende de chegar a 2.500 skills.

### Grupo C — Planos de expansão por domínio (~100 issues, ~204 mil skills)

| Issues | Domínio | Skills planejadas |
|---|---|---:|
| #48 | Blender (urgente, 5 áreas × 50) | 250 |
| #61–#70 | Blender (10 áreas × 2.500) | 25.000 |
| #50 | NEXORA — texturas | 1.000 |
| #51–#55 | Impressão 3D (básico → industrial) | 15.000 |
| #56–#59 | Manufatura aditiva espacial | 10.000 |
| #60 | Impressão 3D médica | 2.500 |
| #71–#96 | Game Engine (mestre + 25 áreas × 2.000) | 50.000 |
| #97–#147 | Game Dev (mestre + 50 áreas × 2.000) | 100.000 |
| #49 | Visão 2027–2036 (50 mil → 500 mil) | — |

**Avaliação honesta:** no padrão atual, em que um lote de 100 skills saiu com metade dos arquivos contendo `undefined` ou frases quebradas, 2.000 skills por área só podem ser feitas por geração em massa a partir de template. Isso (a) produz skills que um agente não consegue usar de verdade e (b) repete exatamente o padrão de alto volume que você disse ao Suporte que pausou. Como **lista de ideias** essas issues são úteis. Como **metas numéricas**, não.

---

## 3. Plano de execução

### Fase 0 — Higiene que reduz risco (local, já pode começar)

1. **Reescrever `README.md` e `README.ja.md`** para descrever o *seu* repositório: o que é, quem mantém, como instalar. Os plugins copiados de terceiros devem aparecer com **origem e licença** (Apache-2.0), sem apresentar o repositório como da Anthropic.
2. **Corrigir o `AGENTS.md`** para o layout real (`curated-skill-sources/`, `plugins/all-skills-collection/skills/`, `tools/*.mjs`) ou criar os scripts que ele cita. Uma das duas coisas, mas sem contradição.
3. **Organizar a raiz:** remover `rea-agent-skills-pack (1)` (é uma cópia) e mover os arquivos `REA ... .md` para `docs/` ou para a pasta do pack.
4. Deixar as mudanças **sem commit** no working tree. O `AGENTS.md` (bloco `GITHUB-FREEZE`) proíbe qualquer `git commit` até o Lucas liberar. Quando liberar, fazer um commit por item.

**Pronto quando:** o README não cita a Anthropic como dona, o `AGENTS.md` só referencia arquivos que existem e a raiz só tem o que precisa estar lá.

### Fase 1 — Validador de qualidade (#31, #36)

Criar `tools/lint-skills.mjs` (Node, sem dependências) que falha quando um `SKILL.md`:

- contém `undefined`, `null`, `[object Object]` ou placeholders `{...}` não preenchidos;
- tem frases de template quebradas (`Produce do not`, `Produce does not`);
- tem uma seção obrigatória vazia ou menor que um limite mínimo;
- tem `description` fora da convenção (não começa com verbo na 3ª pessoa ou não tem "Use when");
- tem corpo idêntico ou quase idêntico a outra skill (hash por seção e similaridade simples);
- tem fonte e cópia do plugin com conteúdo diferente.

O script deve gerar o relatório `docs/reports/skill-quality-baseline.md`, com a lista de skills reprovadas por motivo e por categoria. O lint entra no workflow existente, mas o push fica para depois da restauração.

**Pronto quando:** o lint roda localmente sobre as 1.500 skills e o relatório confirma (ou corrige) os números 199/161 deste plano.

### Fase 2 — Reparar o que já existe (#25, #26, Cenário 3 F1)

Para cada skill reprovada, escolher uma de três ações:

- **Consertar:** reescrever o conteúdo à mão ou com IA, com **revisão sua de cada arquivo**.
- **Fundir:** juntar skills quase iguais numa skill mais profunda. Por exemplo, várias `projecte-emc-*-audit` podem virar uma skill com seções.
- **Remover:** se não houver um caso de uso real.

Ordem sugerida: `minecraft-modded-environments` (você usa ATM10 de verdade e consegue testar), depois `agent-tooling` e por último `skill-library-governance`.

Meta: **0 falhas no lint**. **Fundir é melhor que inflar.** A contagem total pode cair, e isso é progresso. Depois de cada lote reparado, rodar `node tools/sync-skill-bundles.mjs --write` e `--check` para manter fonte e plugin iguais.

### Fase 3 — Catálogo, busca e pilotos (#30, #32, #38)

1. Gerar o inventário a partir do catálogo e do lint: categoria, tamanho, status (`planejada` / `implementada` / `validada` / `usada`).
2. Fazer um protótipo simples de busca e roteamento (por palavras-chave e `description`): dado um pedido, retorna de 3 a 5 skills com justificativa.
3. Rodar **pilotos reais**: escolher 5 tarefas verdadeiras (por exemplo, um crash do ATM10, um ajuste de EMC, um bug de projeto web) e anotar se as skills ajudaram. Isso vira a evidência que falta em todo o roadmap.

### Fase 4 — Depois da conta restaurada: GitHub em ritmo normal

1. Fazer push das fases 0–2 em **1 a 3 PRs revisáveis**, e não dezenas.
2. Fechar as 10 PRs Draft obsoletas, poucas por dia, cada uma com um comentário curto ("conteúdo incorporado em #45").
3. Consolidar os grupos A e C: fechar as issues de marcos já cumpridos e mover os ~100 planos de domínio para **um** arquivo, `docs/roadmap/dominios.md`, mantendo só as issues mestre (#29, #49, #71, #97, #48). Fazer isso **aos poucos ao longo de dias**, e não num script único.
4. Atualizar o ticket do Suporte se fizer sentido (rascunho na seção 5).

### Fase 5 — Expansão por domínio, só por necessidade real

- Escolher **um** domínio por vez com base no que você vai usar agora (o candidato mais natural é **Blender #48**, ou **Game Engine** se a NEXORA/engine estiver ativa).
- Fazer um **piloto de 10 a 25 skills profundas** (100–300 linhas, com exemplos reais, comandos testados e casos de falha), escritas e revisadas uma a uma.
- Usar as skills em trabalho real por 1 a 2 semanas e só então decidir o próximo lote.
- Lote máximo de 25, com lint passando, revisão semântica e um PR por lote.

---

## 4. Decisões que ficam com você

1. **Metas numéricas** (2.500, 50 mil, 500 mil): recomendo trocar por metas de **qualidade e uso** (skills validadas, skills usadas em pilotos). As projeções podem ficar como visão em #49, sem ditar o ritmo.
2. **Fundir e remover skills defeituosas:** aceita que a contagem total diminua?
3. **Primeiro domínio de expansão** depois do reparo: Blender, Game Engine ou Game Dev?
4. **Plugins de terceiros na raiz** (lsp, discord, telegram etc.): você usa? Se não usa, pode removê-los ou mover para `external/` com atribuição.

---

## 5. Rascunho opcional para o ticket do Suporte (só se quiser enviar)

> Hello, a short follow-up: I have reviewed my repository and found that its README was copied from Anthropic's official plugin directory and could make the repository look like it belongs to Anthropic. I am rewriting it to describe my own project and to credit the third-party plugins with their licenses. I am also repairing auto-generated skill files that had template errors, and I will consolidate my planning issues gradually, without bulk changes, once my account is reviewed. Please let me know if anything else needs correction. — Lucas

*(Envie você mesmo pela página do ticket. Eu não envio mensagens em seu nome.)*

---

## 6. Próximo passo imediato

- **Fase 0, item 1 — feito (sem commit):** `README.md` e `README.ja.md` foram reescritos.
- **`claude-security` — feito (sem commit):** a pasta e a cópia no bundle foram removidas (licença proprietária da Anthropic, que proíbe redistribuir num repositório **público**). O `tools/sync-skill-bundles.mjs` ganhou a lista `excludedSources`, então a skill não volta mesmo que seja reimportada. O bundle foi regenerado: 1.499 skills, plugin 2.1.14, e `--check` passa. **O histórico do git ainda contém os arquivos**; reescrever o histórico é uma decisão separada.
- **Os 8 erros antigos do `--check`** eram fim de linha CRLF no Windows (`core.autocrlf=true`) e um catálogo desatualizado. Somem após o `--write`.
- **Pendente:** `plugins/skill-library-maintainer/scripts/sync-skill-bundles.mjs` é uma cópia antiga do script (meta 500) e não tem a exclusão. Atualizar ou remover essa cópia.
- **Depois:** Fase 0, itens 2 e 3, e em seguida a **Fase 1** (`tools/lint-skills.mjs`). Tudo local e sem commit.
