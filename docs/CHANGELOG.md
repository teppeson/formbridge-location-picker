# CHANGELOG

本書は**製品の変更履歴**です。配布JavaScriptの挙動、導入方法、ライセンス、
動作要件、利用者に影響する文書など、このソフトウェアを使う人にとって
意味のある変更だけを記録します。

次は本書へ記録しません。

- 開発ワークフロー、Git運用、レビュー手順などの開発プロセスの変更。
- 開発中の作業経過や試行錯誤。

開発ワークフローは`docs/RELEASE_PROCESS.md`、今後の計画は
`docs/ROADMAP.md`を参照してください。

## Unreleased

### Added

- v13互換性ベースライン。
- 文字コード、改行、Git安全運用の初期設定。
- Teppei Utsunomiyaを著作権者とするMIT License。
- Leaflet、OpenStreetMap、国土地理院の条件を分離した第三者通知。
- Node 24 LTS / npm 11を前提とする開発専用`package.json`と固定依存ロックファイル。
- ESLint 10のflat configと再現可能なlintコマンド。
- Node標準テストによるv13主要挙動の特性テスト3件。
- Node 24でlintとtestを実行するGitHub Actions workflow。
- Contribution手順、実FormBridgeスモークテスト確認表、開発・Release・rollback手順。

### Changed

- 公開配布の基準となるリポジトリblob（LF）とWindows作業ツリー（CRLF）のSHA-256を区別し、Release・rollback検証の基準を修正。
- GitHub Actionsへ文字コード・改行検査を追加。
- READMEへMIT License、無保証、第三者条件の案内を追記。
- READMEへNode開発環境とWindows/macOS/Linuxのlint実行手順を追記。
- READMEへtestとlint・test一括確認コマンドを追記。

### Functional impact

- 配布JavaScriptの機能変更なし。
- 2026-08-09にGitHub公開手順どおりの新規kintoneアプリとFormBridgeフォームで、v13標準構成の実環境動作確認に成功。
