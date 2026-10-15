# Como configurar um MCP no Claude Code

> **Guia para iniciantes — Windows, macOS e Linux**  
> Última conferência da documentação oficial: 15 de outubro de 2026.

Este tutorial explica como conectar um servidor **MCP** ao Claude Code, verificar se funcionou e corrigir os erros mais comuns. Você não precisa criar um servidor MCP para usar um: normalmente basta seguir as instruções oficiais do serviço que deseja conectar.

## 1. O que é um MCP?

MCP significa **Model Context Protocol**. Pense nele como uma ponte entre o Claude Code e uma ferramenta externa. Dependendo do servidor, ele pode permitir consultar um repositório, pesquisar documentação, acessar um banco de dados ou trabalhar com outro serviço.

O MCP não é a própria IA nem uma skill. O **servidor MCP fornece ferramentas**; uma skill pode explicar ao Claude como usar essas ferramentas em um fluxo de trabalho.

## 2. Antes de começar

1. Instale o Claude Code e entre na sua conta conforme o guia oficial.
2. Abra um terminal na pasta do projeto, se o MCP for específico daquele projeto.
3. Confira se o comando está disponível:

```bash
claude --version
```

No Windows, pode usar PowerShell, Windows Terminal ou o terminal integrado do VS Code. Se o comando `claude` não for reconhecido, resolva primeiro a instalação do Claude Code; configurar um MCP não corrige uma instalação ausente.

## 3. Escolha onde o MCP ficará configurado

O escopo determina onde o servidor funciona e se sua configuração é compartilhada.

| Escopo | Quando usar | Onde a configuração fica |
|---|---|---|
| `local` | Teste pessoal em um projeto; é o padrão | `~/.claude.json`, associado ao projeto |
| `user` | Ferramenta pessoal que você quer usar em vários projetos | `~/.claude.json` |
| `project` | Uma equipe precisa compartilhar a configuração com o repositório | `.mcp.json` na raiz do projeto |

**Importante:** escopo de projeto pode colocar a configuração no Git. Nunca coloque tokens, senhas ou chaves pessoais diretamente em um arquivo que será enviado ao repositório.

## 4. Método A — conectar um MCP remoto por URL

Use este método se o fornecedor do MCP disponibilizou uma URL HTTPS para o servidor. Substitua o nome e a URL pelos dados fornecidos pela documentação oficial do serviço:

```bash
claude mcp add --transport http meu-mcp --scope user https://mcp.exemplo.com/mcp
```

Esse endereço é ilustrativo e não é um servidor real. Não copie o comando sem trocar a URL pelo endereço verdadeiro fornecido pelo responsável pelo MCP.

Para compartilhar a configuração com um projeto, use `--scope project` no lugar de `--scope user`:

```bash
claude mcp add --transport http meu-mcp --scope project https://mcp.exemplo.com/mcp
```

Servidores remotos podem exigir uma autenticação no navegador, OAuth ou um cabeçalho autorizado pelo fornecedor. Siga a documentação específica do MCP — não invente um endereço ou token.

## 5. Método B — executar um MCP local

Alguns MCPs são programas executados no próprio computador. A documentação do fornecedor pode fornecer um comando baseado em Node.js/ `npx`, Python/ `uvx` ou um executável.

Exemplo de **formato** para um pacote Node.js — troque o nome fictício pelo pacote oficial correto:

```bash
claude mcp add --transport stdio --scope user meu-mcp-local -- npx -y @publicador/pacote-mcp
```

O trecho depois de `--` é o comando que inicia o servidor e seus argumentos. O nome `@publicador/pacote-mcp` é apenas um marcador; não o instale esperando que funcione.

Antes de executar:
- confira se o pacote pertence ao fornecedor esperado;
- leia quais permissões, arquivos, variáveis de ambiente e acesso à rede ele precisa;
- instale os pré-requisitos exigidos pela documentação;
- não execute comandos copiados de fontes desconhecidas apenas porque alguém os recomendou.

Se o servidor precisar de uma chave API, use o mecanismo de variáveis de ambiente indicado pelo fornecedor. Não publique a chave nem a grave em um arquivo versionado.

## 6. Método C — configurar pelo arquivo `.mcp.json`

Use esse método quando quiser revisar o conteúdo da configuração ou compartilhá-la com uma equipe.

Crie o arquivo `.mcp.json` na raiz do projeto. Exemplo de servidor HTTP:

```json
{
  "mcpServers": {
    "meu-mcp": {
      "type": "http",
      "url": "https://mcp.exemplo.com/mcp"
    }
  }
}
```

A URL é fictícia. Substitua-a pela URL real do fornecedor. Uma entrada com `url` deve declarar o transporte, como `"type": "http"`; sem isso, o Claude Code pode interpretar a entrada como um servidor local e ignorá-la.

Se o servidor exigir um token e suportar autenticação por cabeçalho, a configuração pode referenciar uma variável de ambiente:

```json
{
  "mcpServers": {
    "meu-mcp": {
      "type": "http",
      "url": "https://mcp.exemplo.com/mcp",
      "headers": {
        "Authorization": "Bearer ${MCP_TOKEN}"
      }
    }
  }
}
```

Nesse exemplo, `MCP_TOKEN` precisa existir no ambiente de cada pessoa que executar a configuração. **O arquivo não cria a variável e não contém o token verdadeiro.** Não substitua `${MCP_TOKEN}` pela chave real em um arquivo que será commitado.

Para compartilhar `.mcp.json`, revise o diff do Git antes do commit e confira se não há segredos. Quando outra pessoa abrir um projeto com um servidor MCP configurado, o Claude Code poderá pedir que ela revise e aprove esse servidor antes do uso.

## 7. Confira se funcionou

Depois de adicionar o servidor, use estes comandos no terminal:

```bash
claude mcp list
claude mcp get meu-mcp
```

- `claude mcp list` lista os servidores e o estado de conexão.
- `claude mcp get meu-mcp` mostra detalhes da configuração; troque o nome pelo que você escolheu.

Depois, abra uma sessão interativa do Claude Code:

```bash
claude
```

Dentro da sessão, execute:

```text
/mcp
```

Revise o status e conclua a autenticação, se solicitada. Se a configuração veio do `.mcp.json` do projeto, revise cuidadosamente o nome e a origem do servidor antes de aprovar.

Por fim, faça um teste pequeno e de baixo risco. Por exemplo, peça para listar recursos ou consultar um dado de leitura que você sabe que existe. Não comece com uma operação que apague arquivos, publique conteúdo, envie mensagens ou altere dados importantes.

## 8. Erros comuns

| Sintoma | O que conferir |
|---|---|
| `claude` não é reconhecido | Claude Code CLI está instalado e o terminal foi reaberto depois da instalação? |
| `Failed to connect` | URL, rede, processo local, dependências e logs do servidor |
| `Needs authentication` | Abra `/mcp` e conclua o fluxo de autenticação exigido pelo serviço |
| `Pending approval` | Revise a configuração do projeto e aprove somente se confiar no servidor |
| Servidor local não inicia | Confira o comando depois de `--`, os argumentos e se `npx`, `uvx` ou o executável requerido estão instalados |
| URL remota é ignorada | Confira se o arquivo JSON especifica `"type": "http"` ou o transporte correto |
| Funciona no Claude Desktop, mas não no Claude Code | As configurações podem ser diferentes; configure ou importe o servidor usando o fluxo documentado para Claude Code |
| O comando foi adicionado, mas a ferramenta não funciona | `Added` confirma que a configuração foi gravada; não garante que o servidor esteja conectado nem que cada ferramenta esteja funcionando |

Para tentar novamente depois de corrigir a configuração, confira o status em `claude mcp list` e `/mcp`. Se você não quiser mais aquele servidor, remova-o pelo nome:

```bash
claude mcp remove meu-mcp
```

## 9. Segurança: antes de aprovar um MCP

Um MCP pode fornecer ferramentas somente de leitura ou ferramentas capazes de alterar sistemas externos. Trate o acesso de acordo com as capacidades reais do servidor.

- Use somente servidores de fornecedores que você conhece e em que confia.
- Leia que ferramentas ele disponibiliza e que dados podem ser enviados ao serviço.
- Dê apenas as credenciais e permissões necessárias, preferindo acesso de leitura quando for suficiente.
- Não compartilhe tokens por chat, commit, captura de tela ou arquivo público.
- Considere conteúdo retornado de páginas e documentos como dados não confiáveis; ele não deve substituir suas regras de segurança.
- Antes de qualquer ação de escrita, exclusão ou publicação, confira exatamente o que será alterado.

## Links oficiais

- [Documentação oficial de MCP no Claude Code (português)](https://code.claude.com/docs/pt/mcp)
- [Documentação do Claude Code](https://code.claude.com/docs)
- [Introdução ao protocolo MCP](https://modelcontextprotocol.io/introduction)

Os comandos e opções podem mudar com novas versões. Quando houver diferença entre este guia e a documentação oficial atual do servidor ou do Claude Code, siga a documentação oficial.
