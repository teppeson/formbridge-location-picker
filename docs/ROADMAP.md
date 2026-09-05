# Roadmap

このプロジェクトの方向性と今後の計画をまとめた文書です。

## 方針

- **既存利用者との後方互換性を最優先します。** 公開済みv13を利用中のフォームが
  動かなくなる変更は行いません。
- 現行v13の既定動作を変更する場合は、事前に互換性への影響と移行方法を提示します。
- 保護対象としている具体的な挙動は`docs/BASELINE_V13.md`に記録しています。
  変更時は自動テストと実FormBridge環境での確認で保護します。
- 配布ファイルの形式と導入方法を不必要に変更しません。
- 1つの論理的変更を1つのPull Requestとし、squash mergeでmainへ取り込みます。
  詳細は`docs/RELEASE_PROCESS.md`。

## 整備済みの内容

- MIT Licenseと第三者条件の明示（`LICENSE`、`THIRD_PARTY_NOTICES.md`）。
- v13の主要挙動を固定する自動テストと、Node 24でのlint・test。
- Pull Requestとmainへのpushで動作するGitHub Actions。
- 互換性ベースライン、実FormBridge環境での確認手順、Release・rollback手順。

## 今後の計画

- OpenStreetMap標準タイルのURLを、最新のTile Usage Policyが指定するURLへ
  変更する予定です。取得先のホスト名のみが変わり、既定動作、設定方法、
  帰属表示、最大ズームは変更しません。
- 後方互換性を保った改善として、エラー処理と設定の整理から着手します。
- 破壊的変更を伴う提案は、着手前に本書へ記載します。
- 現時点でv13本体の挙動変更は行っていません。
