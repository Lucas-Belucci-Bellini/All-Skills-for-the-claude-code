[CmdletBinding()]
param(
    [switch]$SkipMcpSetup,
    [switch]$SkipSkillInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Header([string]$Text) {
    Write-Host "`n============================================================" -ForegroundColor Cyan
    Write-Host $Text -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
}

function Refresh-ProcessPath {
    $machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $env:Path = @($machinePath, $userPath) -join ';'
}

function Get-NodeVersion {
    $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCommand) { return $null }
    $raw = (& node --version 2>$null | Select-Object -First 1)
    if (-not $raw -or $raw -notmatch '^v?(\d+)\.(\d+)\.(\d+)') { return $null }
    return [version]::new([int]$Matches[1], [int]$Matches[2], [int]$Matches[3])
}

function Test-ReaNodeVersion([version]$Version) {
    if ($null -eq $Version) { return $false }
    if ($Version.Major -eq 22 -and $Version -ge [version]'22.19.0') { return $true }
    if ($Version.Major -eq 24 -and $Version -ge [version]'24.11.0') { return $true }
    if ($Version.Major -ge 26) { return $true }
    return $false
}

function Ensure-Node {
    $version = Get-NodeVersion
    if (Test-ReaNodeVersion $version) {
        Write-Host "Node.js compatível detectado: $version" -ForegroundColor Green
    } else {
        if ($null -eq $version) {
            Write-Warning 'Node.js não foi encontrado (ou node --version falhou).'
        } else {
            Write-Warning "Versão do Node.js não compatível com o REA: $version. Requisito atual: 22.19+, 24.11+ ou 26+."
        }
        $winget = Get-Command winget -ErrorAction SilentlyContinue
        if (-not $winget) {
            throw 'Instale Node.js compatível pelo site oficial https://nodejs.org/en/download e execute este script novamente. O winget não está disponível.'
        }
        $answer = Read-Host 'Deseja instalar/atualizar Node.js LTS pelo winget agora? (S/N)'
        if ($answer -notin @('S','s','SIM','sim','Y','y','YES','yes')) {
            throw 'Instalação interrompida por escolha do usuário. As skills copiadas continuam instaladas; o MCP ainda não foi configurado.'
        }
        if ($null -eq $version) {
            & winget install --id OpenJS.NodeJS.LTS --exact --source winget --accept-source-agreements --accept-package-agreements
        } else {
            & winget upgrade --id OpenJS.NodeJS.LTS --exact --source winget --accept-source-agreements --accept-package-agreements
            if ($LASTEXITCODE -ne 0) {
                Write-Warning 'O upgrade via winget não concluiu; tentando instalar o pacote LTS oficial.'
                & winget install --id OpenJS.NodeJS.LTS --exact --source winget --accept-source-agreements --accept-package-agreements
            }
        }
        if ($LASTEXITCODE -ne 0) { throw 'O winget não conseguiu instalar/atualizar Node.js. Veja o erro acima e tente novamente.' }
        Refresh-ProcessPath
        $version = Get-NodeVersion
        if (-not (Test-ReaNodeVersion $version)) {
            throw "Node.js após a instalação ainda não atende aos requisitos do REA (detectado: $version). Feche e reabra o PowerShell após instalar Node.js, então rode o script novamente."
        }
        Write-Host "Node.js compatível instalado: $version" -ForegroundColor Green
    }
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        throw 'npm não foi encontrado no PATH. Repare a instalação do Node.js e tente novamente.'
    }
    if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
        throw 'npx não foi encontrado no PATH. Repare a instalação do Node.js e tente novamente.'
    }
}

function Install-CompanionSkills {
    $sourceRoot = Join-Path $PSScriptRoot 'skills'
    if (-not (Test-Path -LiteralPath $sourceRoot -PathType Container)) {
        throw "Não encontrei a pasta 'skills' ao lado do instalador: $sourceRoot. Extraia o ZIP inteiro e execute o script dentro da pasta extraída."
    }
    $skillDirs = @(Get-ChildItem -LiteralPath $sourceRoot -Directory | Sort-Object Name)
    if ($skillDirs.Count -ne 50) {
        throw "Esperava 50 pastas de skills, mas encontrei $($skillDirs.Count). Não vou instalar um pacote incompleto."
    }
    foreach ($dir in $skillDirs) {
        if (-not (Test-Path -LiteralPath (Join-Path $dir.FullName 'SKILL.md') -PathType Leaf)) {
            throw "Skill sem SKILL.md: $($dir.Name). Nenhuma skill foi copiada nesta etapa."
        }
    }
    if ($SkipSkillInstall) {
        Write-Host 'Instalação das 50 skills ignorada por parâmetro.' -ForegroundColor Yellow
        return
    }

    $destinationRoot = Join-Path $HOME '.claude\skills'
    New-Item -ItemType Directory -Path $destinationRoot -Force | Out-Null
    $conflicts = @($skillDirs | Where-Object { Test-Path -LiteralPath (Join-Path $destinationRoot $_.Name) })
    $backupRoot = $null
    if ($conflicts.Count -gt 0) {
        Write-Warning 'Estas pastas já existem e seriam substituídas:'
        $conflicts | ForEach-Object { Write-Host " - $($_.Name)" }
        $answer = Read-Host 'Autoriza fazer backup dessas pastas e instalar as versões deste ZIP? (S/N)'
        if ($answer -notin @('S','s','SIM','sim','Y','y','YES','yes')) {
            throw 'Instalação das skills cancelada pelo usuário; nenhuma pasta existente foi substituída.'
        }
        $backupRoot = Join-Path $HOME ('.claude\backups\rea-50-skills-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
        New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
        foreach ($dir in $conflicts) {
            $old = Join-Path $destinationRoot $dir.Name
            $backup = Join-Path $backupRoot $dir.Name
            Move-Item -LiteralPath $old -Destination $backup
        }
        Write-Host "Backup das pastas substituídas: $backupRoot" -ForegroundColor Yellow
    }
    $installed = 0
    foreach ($dir in $skillDirs) {
        $dest = Join-Path $destinationRoot $dir.Name
        Copy-Item -LiteralPath $dir.FullName -Destination $dest -Recurse
        $installed++
    }
    Write-Host "Skills complementares instaladas: $installed em $destinationRoot" -ForegroundColor Green
}

function Setup-ReaMcp {
    if ($SkipMcpSetup) {
        Write-Host 'Configuração MCP ignorada por parâmetro.' -ForegroundColor Yellow
        return
    }
    Ensure-Node
    Write-Header '1/3 — Plano de configuração do MCP oficial do REA'
    Write-Host 'O comando abaixo consulta o pacote npm oficial e gera um plano sem aplicar alterações.' -ForegroundColor Gray
    & npx --yes rea-agents@latest setup --client claude_code --dry-run
    if ($LASTEXITCODE -ne 0) {
        throw 'Não foi possível gerar o plano do setup. As 50 skills complementares podem já estar instaladas; verifique rede/npm e tente novamente.'
    }
    Write-Host "`nO setup do REA normalmente grava o registro MCP em `$HOME\.claude.json e instala a skill oficial em `$HOME\.claude\skills. Ele preserva outras configurações e mantém backups conforme as regras upstream." -ForegroundColor Gray
    $answer = Read-Host 'Depois de revisar o plano acima, autoriza aplicar o setup para Claude Code? (S/N)'
    if ($answer -notin @('S','s','SIM','sim','Y','y','YES','yes')) {
        Write-Warning 'O MCP não foi configurado. As 50 skills complementares continuam instaladas.'
        return
    }
    Write-Header '2/3 — Aplicando setup MCP do REA'
    & npx --yes rea-agents@latest setup --client claude_code --yes
    if ($LASTEXITCODE -ne 0) {
        throw 'O setup MCP do REA falhou. Leia o diagnóstico acima; não apague manualmente .claude.json e não repita às cegas.'
    }
    Write-Header '3/3 — Diagnóstico pós-instalação'
    & npx --yes rea-agents@latest doctor --client claude_code --skill --json
    $doctorCode = $LASTEXITCODE
    if ($doctorCode -ne 0) {
        Write-Warning 'O doctor retornou um status não-zero. Pode haver um pré-requisito opcional ausente; confira a saída acima, em especial o registro MCP e o estado da skill.'
    } else {
        Write-Host 'O comando doctor terminou sem indicar falha fatal.' -ForegroundColor Green
    }
}

try {
    Write-Header 'REA — 50 skills complementares + MCP do Claude Code'
    Write-Host 'Este pacote não instala motores nativos opcionais (Ghidra/IDA/Hopper/JADX etc.). Esses componentes têm requisitos e licenças próprios.' -ForegroundColor Gray
    Install-CompanionSkills
    Setup-ReaMcp
    Write-Header 'Concluído — próximos passos'
    Write-Host '1. Feche completamente e reabra o Claude Code.'
    Write-Host '2. Confirme na sessão que as ferramentas MCP do REA aparecem e estão utilizáveis.'
    Write-Host '3. Faça primeiro um teste estático com um arquivo que você possui ou está autorizado a analisar.'
    Write-Host '4. Se houver avisos, preserve a saída de doctor; ausências de motores opcionais não significam necessariamente que o MCP esteja desconectado.'
} catch {
    Write-Host "`nERRO: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host 'Nada neste script apaga todo o perfil do Claude. Se uma etapa falhou, revise o erro antes de tentar outra vez.' -ForegroundColor Yellow
    exit 1
}
