# PJ033 FormBridge Location Picker Roadmap

## 目的とゴール

- 最終ゴール: 既存利用者との後方互換性を最優先に、Codexが調査・実装・テスト・Pull Request準備を主導し、Humanが理解したうえで公開を承認できる継続的な開発体制を確立する。
- 2026-08-04までのゴール: v13の基準を固定し、PJ管理、互換性仕様、lint、自動テスト、CI、ライセンス判断、開発・Release手順の初期基盤を整える。
- 成功条件:
  - v13の主要挙動が互換性仕様として記録される。
  - lintと自動テストをローカルおよびCIで再現できる。
  - Human承認なしにmain、公開Release、既存利用者の動作へ影響を与えない。
  - 変更理由、検証結果、戻し方をPull Requestで説明できる。
- 明確な非ゴール:
  - 2日間で新機能版を公開すること。
  - 初期基盤整備と同時に本体JavaScriptをリファクタリングすること。
  - 実FormBridge環境の確認を自動テストだけで代替すること。

## 現在の方針

- 最優先: 既存利用者保護とv13の後方互換性。
- 開発方式: Codex主導・Human公開承認。main直接編集は禁止し、ブランチとPull Requestを使用する。
- 初期実装方針: 配布ファイルの形式と本体動作を変えず、開発用の安全網から追加する。
- 見直し条件: FormBridge仕様変更、重大な脆弱性、現行v13では解決不能な互換性問題が判明した場合。

## 番号付き実行計画と進捗

| No. | 日付 | 作業 | 完了条件 | 状態 |
| --- | --- | --- | --- | --- |
| 1.1 | 8/3 | PJルートのOwner・ACL・書き込み確認 | 所有者、ACL継承、書き込み確認PASS | done |
| 1.2 | 8/3 | 次番号と配置決定 | PJ033、A_cloud、activeを確定 | done |
| 1.3 | 8/3 | 既存リポジトリclone | 履歴付きclone、origin/main一致 | done |
| 1.4 | 8/3 | Git安全確認 | safe.directory、branch、status、remote確認 | done |
| 1.5 | 8/3 | v13基準固定 | commit、tag、SHA-256、現行導入方法を記録 | done |
| 1.6 | 8/3 | PJ必須文書作成 | bootstrap必須文書と作業ログが揃う | done |
| 1.7 | 8/3 | ガバナンス登録 | registryとHANDOFFへ反映 | done |
| 1.8 | 8/3 | 初期検証 | bootstrap、Git、UTF-8検査がPASS | done |
| 1.9 | 8/3 | ライセンス方針確認 | MIT等の比較をHumanが理解し採否決定 | done |
| 1.10 | 8/3 | セッション移行準備 | 新セッション手順と自己診断がPASS | done |
| 2.1 | 8/4 | Node開発環境 | package.jsonと固定された実行コマンド | done |
| 2.2 | 8/4 | lint導入 | npm run lintが成功 | done |
| 2.3 | 8/4 | v13特性テスト | 主要互換挙動の自動テストが成功 | done |
| 2.4 | 8/4 | CI導入 | Pull Requestでlintとtestが自動実行 | done |
| 2.5 | 8/4 | 開発・Release手順 | CONTRIBUTING、確認表、rollback手順 | done |
| 2.6 | 8/4 | Humanレビュー | 差分、CI、実環境確認、公開可否を確認 | in_progress |

## フェーズ

| フェーズ | 目的 | 主な成果物 | 状態 |
| --- | --- | --- | --- |
| Phase 0 | 現状保全とPJ化 | PJ文書、v13基準、互換性仕様 | done |
| Phase 1 | 開発安全網 | lint、テスト、CI | done |
| Phase 2 | 公開運用確立 | ライセンス、CONTRIBUTING、Release手順 | done |
| Phase 3 | 互換性を保った改善 | エラー処理、設定整理、小規模機能拡張 | planned |

## マイルストーン

| 期限 | マイルストーン | 判定条件 | 状態 |
| --- | --- | --- | --- |
| 2026-08-03 | M1 PJ033立ち上げ | 1.1〜1.8完了 | done |
| 2026-08-04 | M2 エージェント開発基盤 | 2.1〜2.5完了、Humanレビュー可能 | done |
| Human承認後 | M3 初回基盤PR | 機能変更なし、CI成功、実環境確認済み | planned |

## 方針とのズレ確認

- 直近確認日: 2026-08-11
- 確認結果: MIT Licenseと第三者条件を整備し、v13本体を変更せずNode 24 LTS、固定依存、ESLint、Node標準テストによる開発安全網を追加した。Pull Request #3でremote CI成功を確認し、HumanがGitHub公開手順に沿って検証用kintoneアプリとFormBridgeフォームを新規作成して、標準構成の実環境動作確認にも成功した。既存v13の保全を優先する方針と一致。
- 調整が必要な点: Pull Request #3の最終差分レビューとmerge可否のHuman判断。

## 未決事項

- 次期バージョンをv14とするか、Semantic Versioningへ移行するか。
- OpenStreetMap標準タイルの現行v13 URLを、最新のTile Usage Policy指定URLへ互換性を保って変更するか。

## 次に見直すタイミング

- 各番号項目の完了時。
- Pull Request作成前、Humanレビュー後、公開判断前。
