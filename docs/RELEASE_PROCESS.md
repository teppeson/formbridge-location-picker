# 開発・Release手順

## 原則

- mainへ直接変更を加えず、作業ブランチとPull Requestを使用する。
- Codexは調査、変更、テスト、Pull Request案の準備までを主導する。
- commit、push、Pull Request公開、merge、タグ作成、Release発行は、各段階でHumanの承認範囲を確認する。
- v13の後方互換性と既存利用者保護を、バージョン番号や開発速度より優先する。

## 開発からPull Requestまで

1. `docs/BASELINE_V13.md`と`docs/ROADMAP.md`を確認する。
2. 作業ブランチで変更し、配布JavaScriptの差分と意図を確認する。
3. `npm ci`と`npm run check`を実行する。
4. `python scripts/check_encoding.py .`を実行する。
5. 機能または実行環境へ影響する場合、`docs/FORMBRIDGE_SMOKE_TEST.md`で実環境確認する。
6. Git状態、意図しない削除、追跡ファイル数、機密情報混入を確認する。
7. Humanのcommit承認後にcommitし、直後に`git show --stat HEAD`を確認する。
8. Humanのpush承認後、`git fetch`と`git status -sb`で分岐がないことを確認してpushする。
9. Humanの公開承認後にPull Requestを作成し、GitHub Actionsの成功を確認する。

## Pull Request本文に含める内容

- 変更目的と対象作業番号。
- v13互換性への影響。機能変更なしの場合も明記する。
- ローカルlint、test、文字コード検査、実FormBridge確認の結果。
- 第三者ライセンス、地図帰属、タイル利用条件への影響。
- rollback方法。
- 未解決事項とHumanに求める判断。

## mergeとRelease

1. Humanが差分、CI、実FormBridge結果、公開範囲を確認する。
2. Humanがmergeを承認してからmainへ統合する。
3. main上でCI成功と対象commitを確認する。
4. バージョン番号、Release名、Release notes、配布ファイルのSHA-256を確定する。
5. Humanがタグ作成とGitHub Release発行を承認する。
6. 公開後に配布ファイルを再取得し、SHA-256と導入手順を確認する。

次期バージョン番号をv14とするかSemantic Versioningへ移行するかは未決であり、
初回の新Release前にHumanが判断する。

## rollback

- 公開済みv13の基準タグは`v13`、commitは`b6cfe8b`、本体SHA-256は
  `167A1B532E127B2763553D924DCA93B68AC0972B6CA9223CF341D1E1AA3DB5A9`。
- 未mergeの問題はPull Requestをmergeせず修正する。
- merge後の問題は、Human承認のうえrevert commitまたは修正版を通常のPull Requestで作成する。
- 公開Releaseの問題は、影響、復旧版、既存v13への戻し方を利用者へ案内する。
- `reset --hard`、履歴改変、force push、既存タグの付け替えで公開履歴を上書きしない。
