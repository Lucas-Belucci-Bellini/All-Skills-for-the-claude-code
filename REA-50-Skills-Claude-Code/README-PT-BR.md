# REA — pacote de 50 skills complementares para Claude Code

Este pacote contém **50 skills de fluxo de trabalho**, cada uma em seu próprio `skills/<nome>/SKILL.md`, além de um instalador PowerShell que instala essas skills e configura o MCP oficial do REA no Claude Code.

> **Transparência:** o repositório upstream `morluto/rea` atualmente publica um skill principal e alguns skills de manutenção/contribuição; ele não fornece 50 skills oficiais independentes. As 50 deste ZIP são skills complementares elaboradas com base nas famílias de análise documentadas pelo REA. Não são um produto oficial nem endossado por `morluto/rea`.

## Instalação no Windows

1. Extraia o ZIP completo para uma pasta normal, por exemplo `Downloads\REA-50-Skills-Claude-Code`.
2. Abra essa pasta no Explorador de Arquivos.
3. Clique na barra de endereço, digite `powershell` e pressione Enter.
4. Execute:

   ```powershell
   Set-ExecutionPolicy -Scope Process Bypass
   .\Install-REA-50-Skills-And-MCP.ps1
   ```

5. O script copia as 50 skills para `$HOME\.claude\skills`, verifica o Node.js e mostra um plano de instalação do MCP antes de aplicar a configuração. Leia o plano e confirme somente se estiver correto.
6. Quando terminar, feche e abra novamente o Claude Code. Dentro dele, peça para listar/confirmar as ferramentas REA disponíveis; não considere a instalação concluída só porque o comando do instalador terminou.

Se já existirem pastas com os mesmos nomes, o script pergunta antes de substituí-las e guarda cópias no diretório de backup fora da pasta de skills.

## O que o script instala/configura

- Pacote npm oficial `rea-agents` chamado via `npx` — não instala uma cópia local do repositório-fonte.
- Registro MCP do REA para Claude Code usando o escopo de usuário (`claude_code`).
- Skill oficial `reverse-engineer-anything` e arquivos de referência, conforme o setup upstream atual.
- As 50 skills complementares deste pacote.
- Verificação final com `rea doctor` para Claude Code e skills.

O setup do REA configura MCP e instruções. **Não instala automaticamente todos os motores opcionais** como Ghidra, IDA, Hopper, JADX, Binwalk ou Unblob; eles têm requisitos e licenças próprios. Não aceite instalar um motor extra sem entender o que ele instala e de onde vem.

## Como desinstalar as 50 skills deste pacote

Apague apenas as 50 pastas que começam com `rea-` listadas em `manifest.json`, dentro de `$HOME\.claude\skills`. Se o script criou backups, eles ficam em `$HOME\.claude\backups\rea-50-skills-*`.

Para remover o MCP do REA, use o fluxo oficial de desinstalação documentado pelo projeto. Evite apagar manualmente todo `~/.claude.json`: esse arquivo pode conter outras integrações. Ver: <https://github.com/morluto/rea/blob/main/docs/installation.md>.

## Referências oficiais

- Repositório: <https://github.com/morluto/rea>
- Guia de instalação: <https://github.com/morluto/rea/blob/main/docs/installation.md>
- Pacote npm: <https://www.npmjs.com/package/rea-agents>
- Licença upstream de REA: MIT. Este pacote não redistribui o código-fonte do REA; as skills incluídas são instruções complementares independentes.

Use somente em programas e artefatos próprios ou em que você tenha autorização para análise.
