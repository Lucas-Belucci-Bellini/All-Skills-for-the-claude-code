# Lote futuro: criação de engines

## Escopo potencial
- Arquitetura modular, ECS, ciclo de jogo, cenas, recursos e serialização.
- Renderização, abstrações de GPU, shaders, iluminação e otimização.
- Física, áudio, input, ferramentas de editor e pipelines de assets.
- Runtime Rust, profiling, consumo de memória, compatibilidade e testes determinísticos.

## Evitar sobreposição
Separar skills por decisão técnica e entregável concreto, não por nomes de engines. Conferir as famílias de engine/runtime e Rust já existentes antes de autorar novas.

## Critério de aceite
Incluir trade-offs, limites de hardware, profiling reproduzível, invariantes e testes. Não declarar desempenho medido sem benchmark executado. Lote ainda não implementado.
