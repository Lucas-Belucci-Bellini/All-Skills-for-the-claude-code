# All Skills for Claude Code

[English](README.md) | 日本語

[Lucas Belucci Bellini](https://github.com/Lucas-Belucci-Bellini) が個人で管理する、Claude Code 向け agent skill ライブラリ(開発中)。ゲーム開発、Minecraft modpack、ソフトウェア開発などの自分のプロジェクトから生まれた skill を集めている。

> **Anthropic とは無関係。** これは独立した個人プロジェクトであり、Anthropic の公式リポジトリ、marketplace、plugin directory ではない。一部のフォルダには第三者の素材が含まれており、下記で元のライセンスとともに出典を明記している。

## 現状

- 統合プラグインのカタログには **1,499 件の skill** がある(このライブラリ向けに書いたもの 1,374 件、第三者ソースから保持したもの 125 件)。[SKILL_LIBRARY_CATALOG.md](SKILL_LIBRARY_CATALOG.md) を参照。
- 新しい skill の多くは AI の支援を受けてテンプレートから下書きしたもので、**現在品質の修正作業中**である。一部のファイルにはテンプレートの不具合(例: trigger examples に文字どおり `undefined` が残っている)がある。これらは修正、統合、または削除する予定。
- issue やロードマップにある skill 数やマイルストーンの数字は**計画上の目標**であり、作業の完了や検証済みを意味しない。

## インストール

Claude Code でこのリポジトリを marketplace として追加し、プラグインをインストールする。

```
/plugin marketplace add Lucas-Belucci-Bellini/All-Skills-for-the-claude-code
/plugin install all-skills-collection@all-skills-for-the-claude-code
```

marketplace は [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) で定義しており、次の 2 つのプラグインを提供する。

| Plugin | 用途 |
| --- | --- |
| [`all-skills-collection`](plugins/all-skills-collection/README.md) | 生成された統合 skill バンドル |
| [`skill-library-maintainer`](plugins/skill-library-maintainer/README.md) | ライブラリの監査と再生成を行うコマンド |

skill に頼る前に内容を確認すること。skill は agent への指示であり、システムを変更するコマンドを提案する場合がある。

## リポジトリ構成

| パス | 内容 |
| --- | --- |
| `curated-skill-sources/<category>/<skill>/SKILL.md` | このライブラリ向けに書いた skill の**正規ソース** |
| `plugins/all-skills-collection/skills/` | インストールされる生成コピー。手で編集しない。 |
| `tools/sync-skill-bundles.mjs` | ソースからバンドル、カタログ、ロードマップを再生成する |
| `tools/validate-skill-batch.mjs`、`tools/skill-batch-manifests/` | バッチ検証 |
| `SKILL_LIBRARY_CATALOG.{md,json}`、`SKILL_GROWTH_ROADMAP.md` | 生成されるインベントリとロードマップ |
| `docs/` | ガイドと調査メモ |
| その他のトップレベルフォルダ | 第三者の素材(下記参照) |

## ライブラリの保守

`curated-skill-sources/` 以下の skill を変更したら、次を実行する。

```
node tools/sync-skill-bundles.mjs --write
node tools/sync-skill-bundles.mjs --check
```

差分を確認してから pull request を作成する。CI workflow([.github/workflows/skill-sync-validation.yml](.github/workflows/skill-sync-validation.yml))でも同じチェックが走る。

## 第三者の素材とライセンス

[ルートの LICENSE](LICENSE)(Apache-2.0)はこのリポジトリ独自の内容に適用される。**第三者の素材を再ライセンスするものではない。** 下記の各フォルダは上流のライセンスファイルを保持しており、そちらが優先される。

| フォルダ | 出典 | ライセンス |
| --- | --- | --- |
| `agent-sdk-dev`、`clangd-lsp`、`claude-code-setup`、`code-review`、`code-simplifier`、`commit-commands`、`csharp-lsp`、`cwc-makers`、`example-plugin`、`explanatory-output-style`、`feature-dev`、`frontend-design`、`gopls-lsp`、`hookify`、`jdtls-lsp`、`kotlin-lsp`、`learning-output-style`、`lua-lsp`、`math-olympiad`、`math-proof`、`mcp-server-dev`、`mcp-tunnels`、`php-lsp`、`playground`、`plugin-dev`、`pr-review-toolkit`、`project-artifact`、`pyright-lsp`、`ralph-loop`、`receipts`、`ruby-lsp`、`rust-analyzer-lsp`、`security-guidance`、`session-report`、`skill-creator`、`swift-lsp`、`typescript-lsp` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Apache-2.0 |
| `asana`、`context7`、`discord`、`fakechat`、`imessage`、`telegram`、`external_plugins/` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)(external plugins) | 各フォルダと上流を参照 |
| `agent-workflow-engineering`、`game-concept-workbench`、`gameplay-debugging-toolkit`、`godot-mini-game-builder`、`one-button-game-builder`、`retro-arcade-game-finisher`、`web-mini-game-kit`(および対応する `.json`)、`marketplace.json`、`schema.json`、`PLUGIN_RELEASE.md` | [abagames/agentic-gamedev-skills](https://github.com/abagames/agentic-gamedev-skills) | MIT、© abagames |
| `plugins/godot`、`plugins/unity`、`plugins/unreal`、`scripts/` | [IvanMurzak/ai-game-dev-plugin](https://github.com/IvanMurzak/ai-game-dev-plugin) | Apache-2.0 |
| `REA-50-Skills-Claude-Code`、`rea-agent-skills-pack` | [morluto/rea](https://github.com/morluto/rea) 用のコンパニオン skill(独自に執筆。`REA-50-Skills-Claude-Code/NOTICE.txt` を参照) | REA 本体は MIT。パック自体にはまだライセンスファイルがない。 |

Anthropic の `claude-security` プラグインは誤って含まれていた。プロプライエタリなライセンスで再配布が許諾されていないため削除し、`tools/sync-skill-bundles.mjs` でバンドルから除外するようにした。

生成バンドルにもこれらの skill の一部がコピーされている。[plugins/all-skills-collection/ATTRIBUTION.md](plugins/all-skills-collection/ATTRIBUTION.md) を参照。ソースごとのライセンス確認はまだ完了していない。

公開プロジェクト(OSIRIS、AERIS-10/PLFM_RADAR、Flipper Zero firmware など)に着想を得た skill は、独自に書いた workflow である。上流のコード、回路図、素材はコピーしていない。[docs/research/](docs/research/) を参照。

## 責任ある利用

一部の skill はリバースエンジニアリング、無線ハードウェア、ファームウェア、セキュリティテストを扱う。自分が所有している、または明示的にテストを許可されたシステムと成果物に対してのみ使うこと。

## 連絡先

このリポジトリで issue を作成すること。
