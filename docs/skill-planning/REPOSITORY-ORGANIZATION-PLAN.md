# Plano de organização do catálogo de skills

**Estado:** plano inicial, criado em 2026-10-26. Não declara concluído o inventário completo, a detecção semântica de duplicatas, a revisão de licenças ou a validação de runtime.

## 1. Baseline reproduzível observada em `main`

Árvore observada: `66156930b39c2ad817cacb9d56f94b0625514467`.

| Medida | Resultado observado | Interpretação |
|---|---:|---|
| Entradas no Git tree | 7233 | Arquivos e diretórios; não é a contagem de skills. |
| Caminhos terminados em `SKILL.md` | 3013 | Inclui fontes, bundles e outros plugins; não tratar como skills únicas. |
| Entradas em `SKILL_LIBRARY_CATALOG.json` | 1500 | Catálogo declara 1500 skills únicas. |
| Nomes únicos no catálogo | 1500 | Nenhuma duplicata exata de nome foi encontrada. |
| Novas/autoria própria no catálogo | 1374 | `origin: new-authored`. |
| Mantidas/importadas no catálogo | 126 | `origin: existing`; muitas não possuem `source_path` próprio no catálogo. |
| Caminhos de bundle do catálogo presentes | 1500/1500 | Verificação estrutural pelo Git tree. |
| Caminhos de fonte ausentes entre as autorais | 0 | A checagem corresponde somente a entradas declaradas como `new-authored`. |
| Divergências de SHA fonte/bundle nas autorais com ambos os caminhos | 0 | Paridade de blob conferida no tree, não teste de instalação em runtime. |

**Limites desta checagem:** foi uma leitura da árvore e do catálogo remoto. Não foram executados localmente os scripts de sincronização, testes, instalação/descoberta no Claude Code, comparação semântica das skills ou revisão de todas as licenças/proveniências. Esses itens continuam pendentes.

## 2. Conflitos que precisam ser resolvidos antes de expandir

### 2.1 Contagens e estado dos marcos

- `README.md`, `SKILL_LIBRARY_CATALOG.md`, `SKILL_LIBRARY_CATALOG.json` e `SKILL_GROWTH_ROADMAP.md` descrevem um inventário de 1.500.
- A Issue [#39](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/39) registra uma baseline anterior de 1.150 e observa que PRs recentes podem ter sido revertidas ou não integradas.
- O próprio README distingue o inventário da branch `feat/skills-expansion-1500-projete-cross-agent-2026` do estado mesclado em `main`, mas também descreve 1.500 como pacote atual.

**Ação:** reconciliar a linhagem de commits, catálogo, caminhos canônicos, bundle, manifests e PRs antes de tratar qualquer número como baseline final. Não somar números de branch ou títulos de PR ao catálogo de `main`.

### 2.2 Fonte canônica de skills

- `AGENTS.md` diz que `.agents/skills/` é o conteúdo primário e orienta manter as skills em `.agents/skills/<nome>/`.
- A árvore de `main` não contém um diretório raiz `.agents/`.
- O catálogo JSON identifica `curated-skill-sources/` como `source_path` para as 1374 skills autorais; os bundles ficam sob `plugins/all-skills-collection/skills/`.

**Ação:** registrar uma decisão de arquitetura (ADR) sobre a fonte canônica e alinhar as instruções depois da revisão. Até lá, não fazer migração em massa nem editar manualmente arquivos que o sincronizador gera.

### 2.3 Overlap entre os planos

O backlog contém metas gerais e subdomínios que se cruzam. Exemplos para auditar antes de nomear candidatas:

- Blender: Issue #48 (lote de 250) e Issues #61–#70 (domínios especializados).
- Texturas: Issue #50 (NEXORA) e Issue #65 (texturas/materiais Blender).
- Engines: Issue #71 é o programa-mestre; Issues #72–#96 são seus domínios-filhos.
- Desenvolvimento de jogos: Issue #97 é o programa-mestre; Issues #98–#147 são domínios-filhos.
- Impressão 3D: Issues #56–#59 incluem plano espacial geral e níveis especializados que precisam de fronteiras explícitas.
- O roadmap anual da Issue #49 é uma projeção transversal, não um lote adicional de skills a somar aos programas filhos.

Uma habilidade compartilhada deve ter uma identidade e um caminho canônico; os outros planos a referenciam, não a contam outra vez.

## 3. Sequência de trabalho

### Fase 0 — Fechar o diagnóstico da base (Issue #30)

1. Reconciliar a linhagem das PRs abertas, fechadas e revertidas com o tree atual.
2. Criar um método local reproduzível de contagem de skills canônicas, importadas, empacotadas, únicas e duplicadas.
3. Verificar estrutura, arquivos referenciados, READMEs, manifests, fontes/licenças e estados de validação.
4. Registrar evidências, limitações, riscos e as decisões arquiteturais pendentes.
5. Não excluir, renomear ou regenerar arquivos em massa sem relatório de diff revisado.

### Fase 1 — Definir o modelo de catálogo (Issue #31)

1. Definir identificador estável para candidatas e skills existentes.
2. Separar estado do plano, estado de implementação e estado de validação.
3. Definir metadados mínimos: slug, domínio, objetivo, gatilho, entradas/saídas, dependências, compatibilidade, riscos, proveniência/licença e evidências de teste.
4. Implementar validadores com testes positivos/negativos após a decisão de arquitetura.
5. Tornar duplicatas automáticas apenas alertas: fusão, renomeação ou remoção exige revisão humana.

### Fase 2 — Decompor as Issues em documentos Markdown

Para cada Issue de domínio:

1. Criar `docs/skill-planning/domains/issue-<n>-<slug>.md` a partir de [DOMAIN-PLAN-TEMPLATE.md](DOMAIN-PLAN-TEMPLATE.md).
2. Listar individualmente as capacidades candidatas, sem preencher milhares de placeholders.
3. Dar a cada candidata ID provisório `PLN-<n>-<sequência>`, slug proposto e estado `PLANNED`.
4. Marcar sobreposições e dependências com IDs/caminhos canônicos já existentes.
5. Separar a meta quantitativa anunciada na Issue dos nomes específicos que de fato foram propostos e revisados.
6. Atualizar a Issue existente com o caminho do Markdown; não abrir Issue duplicada.

**Regra:** uma skill só entra no diretório real de skills quando a candidata foi revisada e aprovada para implementação. Não criar um `SKILL.md` vazio ou genérico para contar como planejado.

### Fase 3 — Priorizar e implementar lotes pequenos

Ordem sugerida:

1. Resolver baseline e fonte da verdade (#30).
2. Aprovar esquema/metadados e validação (#31).
3. Reconciliar roadmaps e marcos gerais (#7, #8, #12, #39 e dependências).
4. Decompor/dominar primeiro os casos de uso de maior valor e com fronteiras mais claras, como ATM10/ProjectE (#25/#26), depois Blender e texturas (#48/#50/#61–#70).
5. Processar os demais domínios de forma incremental, começando pelos subdomínios com dependências resolvidas.

Cada lote deve ter branch, diff revisável, validações registradas e PR. Nenhum novo lote deve ser tratado como publicado antes da revisão/merge.

### Fase 4 — Critérios para encerrar uma Issue

Fechar uma Issue de planejamento/implementação somente quando:

- O documento Markdown correspondente existe e está ligado à Issue.
- O escopo foi decomposto e as sobreposições conhecidas foram revisadas.
- O estado dos candidatos/skills está explícito, sem confundir planejado com implementado.
- Os critérios de aceitação específicos da Issue têm evidências ou bloqueios registrados.
- Catálogo, bundle, documentação e contagens foram atualizados quando aplicável.
- A Issue não depende de validação ou decisão ainda pendente.

## 4. Próximo marco

O primeiro marco é **reconciliar a base real e a fonte canônica**, não produzir um lote grande de novas skills. Depois disso, os planos específicos serão convertidos para Markdown, uma Issue de cada vez, e só então as candidatas aprovadas passarão à implementação.
