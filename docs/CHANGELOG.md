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

変更はまだありません。

## v13.0.1 - 2026-09-05

Semantic Versioningへ移行してからの最初のReleaseです。移行前に公開したタグ`v13`を
`13.0.0`に相当する基準として扱っており、`v13.0.0`は存在しません。
本Releaseは後方互換性を保った修正であり、既存利用者の設定変更や移行作業は不要です。

### Added

- v13互換性ベースライン。
- 文字コード、改行、Git安全運用の初期設定。
- Teppei Utsunomiyaを著作権者とするMIT License。
- Leaflet、OpenStreetMap、国土地理院の条件を分離した第三者通知。
- Node 24 LTS / npm 11を前提とする開発専用`package.json`と固定依存ロックファイル。
- ESLint 10のflat configと再現可能なlintコマンド。
- Node標準テストによるv13主要挙動の特性テスト3件。
- Node 24でlintとtestを実行するGitHub Actions workflow。
- Contribution手順と、開発・Release・rollback手順。

### Changed

- 公開配布の基準となるリポジトリblob（LF）とWindows作業ツリー（CRLF）のSHA-256を区別し、Release・rollback検証の基準を修正。
- GitHub Actionsへ文字コード・改行検査を追加。
- READMEへMIT License、無保証、第三者条件の案内を追記。
- READMEへNode開発環境とWindows/macOS/Linuxのlint実行手順を追記。
- READMEへtestとlint・test一括確認コマンドを追記。
- OpenStreetMap標準タイルのURLを、Tile Usage Policyが指定する
  `https://tile.openstreetmap.org/{z}/{x}/{y}.png` へ変更。v13の
  `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` は、同ポリシーが予告なく
  廃止されうると記載しているサブドメイン形式のため使用を取りやめた。

### Functional impact

- 配布JavaScriptの変更はOpenStreetMap標準タイルのURL文字列1行のみ。
  設定インターフェース、既定座標、ズーム、フィールド更新仕様、帰属表示、
  国土地理院への切替は変更していない。取得先ホスト名だけが変わるため、
  既存利用者の導入手順とフィールド構成は従来のまま利用できる。
- 実FormBridge環境で、READMEの設定方法どおりに構成したv13標準構成の動作を確認済み。
