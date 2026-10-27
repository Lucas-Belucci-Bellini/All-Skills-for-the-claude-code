# Plano de domínio — Issue #50: Texturas para NEXORA (meta 1.000)

- Issue de origem: [#50 — Planejar 1.000 skills de texturas para NEXORA](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/50)
- Estado: **SCOPE_RECORDED / CANDIDATE_NAMES_PENDING**
- Meta de planejamento: 1.000 skills únicas.
- Áreas temáticas registradas: 10.
- Candidatas individualizadas e aprovadas nesta versão: **0**.

> A Issue descreve dez áreas e um processo, mas não enumera 1.000 nomes individuais. Este documento registra o plano real sem inventar que a meta já foi decomposta. Os nomes serão criados em lotes depois da auditoria de lacunas e duplicações.

## Áreas planejadas

1. Fundamentos e direção visual: teoria das cores, leitura visual, consistência de estilo, paletas e referências.
2. Texturas PBR e materiais: albedo/base color, roughness, metallic, normal, height/displacement, ambient occlusion e validação dos canais.
3. Pixel art e baixa resolução: tilesets, sprites, paletas limitadas, escala 16×16/32×32 e legibilidade em jogo.
4. Voxel e materiais de mundo: blocos, terrenos, minerais, madeira, pedra, solos, líquidos e variações naturais.
5. Assets de jogos: itens, ferramentas, equipamentos, construções, ambientes, props e materiais modulares.
6. Procedural e automação: geração por nós e scripts, variações controladas, processamento em lote, conversão e exportação.
7. Blender e pipelines 3D: UVs, baking, mapas, materiais, inspeção e integração com ferramentas de criação.
8. Otimização para runtime: resolução, formatos, mipmaps, atlases, compressão, uso de memória e desempenho.
9. Integração com a NEXORA: convenções de assets, importação, validação, compatibilidade com renderizador e documentação do pipeline.
10. QA e acessibilidade: detecção de seams, tiling, artefatos, inconsistências, contraste e legibilidade em diferentes condições.

## Skills relacionadas já existentes

| Skill | Categoria do catálogo | Ação |
|---|---|---|
| `shader-compilation-cache-integrity` | Engine architecture & runtime | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `shader-render-pipeline-debugging` | Engine architecture & runtime | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `shader-variant-budget` | Engine architecture & runtime | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `flipper-nfc-secret-material-redaction` | Flipper Zero firmware and hardware engineering | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `asset-import-cache-key-audit` | Game content & save systems | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `asset-import-validation` | Game content & save systems | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `texture-mipmap-import-validation` | Game content & save systems | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `atm10-renderer-shader-mod-conflict` | Minecraft & modpack engineering | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `atm10-resource-pack-shader-crash-triage` | Minecraft & modpack engineering | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `projecte-emc-endgame-material-inflation` | Minecraft & modpack engineering | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |
| `projecte-emc-material-equivalence-map` | Minecraft & modpack engineering | Verificar se cobre parte do escopo; referenciar ou delimitar a nova candidata. |

## Fase 0 — Auditoria antes de nomear candidatas

- [ ] Inventariar skills existentes de textura, materiais, Blender, arte técnica, assets, shaders, renderização e importação.
- [ ] Inspecionar o pipeline real da NEXORA antes de fixar formatos, resolução, mapas, atlas ou convenções como requisitos universais.
- [ ] Definir taxonomia, IDs, dependências, metadados, proveniência e critérios de qualidade.
- [ ] Separar capacidades gerais de criação de texturas dos requisitos específicos da NEXORA.
- [ ] Definir método de detecção de duplicatas exatas e revisão semântica.

## Fase 1 — Aprovar candidatas

- [ ] Gerar uma lista nominal em lotes pequenos, guiada pelas lacunas encontradas, não automaticamente 100 skills por área.
- [ ] Registrar para cada candidata: ID `PLN-50-NNN`, nome provisório, objetivo, gatilho, entradas, saída, dependências, risco de duplicação e critério de aceite.
- [ ] Marcar todas como `PLANNED` até revisão. Não criar placeholders `SKILL.md` para representar a contagem.
- [ ] Priorizar, após a auditoria, fluxos úteis para NEXORA: materiais voxel 32×32, texturas tileable, paletas consistentes, mapas, export/import e QA, conforme requisitos reais do renderer.

## Fase 2 — Implementar e testar

- [ ] Implementar apenas candidatas aprovadas e distintas.
- [ ] Registrar ferramenta/versão, entradas, saídas e validações concretas.
- [ ] Criar testes representativos para seams/tiling, mipmaps, artefatos, contraste, tamanho de arquivo, memória e integração com renderer, quando aplicável.
- [ ] Testar importação/exportação em assets de prova e documentar limitações.
- [ ] Registrar proveniência e licenças; não copiar assets protegidos.
- [ ] Atualizar catálogo, manifestos e bundle a partir da fonte canônica; inspecionar o diff e abrir Draft PR.

## Regras de contagem

- A meta de 1.000 é planejamento, não 1.000 skills já definidas, implementadas ou validadas.
- Skills compartilhadas têm uma única identidade canônica e são referenciadas em outros domínios, não contadas duas vezes.
- Cópias de bundle, aliases, arquivos vazios e variantes cosméticas não aumentam a contagem.
- Reportar separadamente planejadas, aprovadas, implementadas, testadas e publicadas.

## Critério para avançar

Concluir a Fase 0 com inventário reproduzível, relatório de lacunas e fronteiras. Só então aprovar o primeiro lote de candidatas nominais. A Issue #50 permanece aberta até que a quantidade, utilidade, unicidade, validação, integração e proveniência exigidas tenham evidências.
