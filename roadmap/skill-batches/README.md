# Pastas de preparação para os próximos lotes de skills

Esta árvore organiza o trabalho futuro sem contar arquivos de planejamento como skills. Os diretórios abaixo são **reservas de escopo**: só criar uma skill quando houver tarefa real, gatilho claro, saída verificável e diferença demonstrável em relação ao catálogo atual.

## Próxima etapa do inventário

- Ponto de partida de planejamento: 2.085 skills distintas, ainda sujeito à validação do PR de consolidação.
- Alvo atual do roadmap: 2.500 skills distintas; faltam nominalmente 415.
- Trabalhar em lotes pequenos (preferencialmente 25), com manifesto por lote, checagem de duplicatas, paridade fonte/bundle, procedência/licenças e CI.
- Não criar cópias de skills existentes nem preencher cotas com variações superficiais.
- Os diretórios aqui são para planejamento futuro, não são evidência de skills implementadas.

## Ordem sugerida

1. `01-coding-and-repository-quality/` — automação de código, revisão, testes e manutenção.
2. `02-engine-creation/` — arquitetura, runtime, renderização, assets e tooling de engines.
3. `03-game-development/` — gameplay, simulação, saves, rede e conteúdo.
4. `04-agent-orchestration/` — coordenação multiagente, ferramentas, segurança e avaliação.
5. `05-blender-and-3d-assets/` — Blender, materiais, texturas, animação e exportação.
6. `06-3d-printing/` — preparação de modelos, fatiamento, tolerâncias e validação de impressão.
7. `07-minecraft-atm10-projecte/` — diagnóstico de modpacks, compatibilidade, EMC e preservação de saves.
8. `08-platforms-data-and-observability/` — Rust, PostgreSQL/Supabase, Vercel, OpenTelemetry e confiabilidade.

## Processo para abrir um lote

1. Revisar o catálogo e as skills vizinhas antes de nomear uma nova.
2. Escrever um manifesto com nomes, objetivos e critérios de aceite.
3. Criar a fonte canônica e a cópia do plugin conforme a estrutura oficial.
4. Executar o gerador oficial, validador do manifesto e CI.
5. Revisar as diferenças geradas, duplicatas semânticas e procedência.
6. Marcar como concluído apenas após evidência verificável; não fazer merge em `main` sem autorização explícita.

## Sincronização do catálogo

A branch de consolidação agora executa o gerador oficial e, após validação bem-sucedida em um evento `push` da própria branch, commita os artefatos gerados. O workflow em eventos de pull request valida sem fazer commits. Isso mantém os catálogos versionados; não substitui a auditoria semântica, de procedência/licenças nem a revisão final do PR.
