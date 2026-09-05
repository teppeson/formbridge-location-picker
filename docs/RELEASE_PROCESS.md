# 開発・Release手順

本書は、このリポジトリへ変更を加えてからReleaseへ至るまでの手順をまとめたものです。
コントリビュート時の基本ルールは`CONTRIBUTING.md`を参照してください。

## 原則

- mainへ直接変更を加えず、作業ブランチとPull Requestを使用します。
- v13の後方互換性と既存利用者保護を、バージョン番号や開発速度より優先します。
- **Git履歴は開発作業の記録ではなく、ソフトウェアの変更の記録です。**
  最初のpush前に作業中のcommitを整理し、mainには中間commitを残しません。
  Pull Request上のレビュー対応commitはPull Requestに残りますが、
  squash mergeによりmainの永続的な履歴へは持ち込みません。
- 1つの論理的変更 = 1 Pull Request を原則とし、mainへの取り込みはsquash mergeを基本とします。
- 開発プロセスの変更は`docs/CHANGELOG.md`へ記録しません。同書は製品の変更履歴です。

## 1つの論理的変更の定義

次をすべて満たすものを、公開履歴の1単位とします。

- 単独でrevertしても整合が保たれる。
- 「〜する」の1文で、「かつ」「ついでに」を使わずに説明できる。
- その時点で`npm run check`と文字コード検査が成功する。
- 製品の変更と、無関係な文書整理を混在させていない。

次は公開履歴の独立した単位にしません。変更本体へまとめてください。

- 「CI成功を反映」「レビュー指摘に対応」「typo修正」など、直前の変更を完成させる
  ためだけの修正。最初のpush前にsquashします。
- 開発中の試行回数に比例して増える中間状態。

## 変更からPull Requestまで

1. `docs/BASELINE_V13.md`で保護対象の挙動を確認します。
2. 作業ブランチを`origin/main`から作成し、変更とテストを行います。
   この間のローカルcommitは自由に作って構いません。
3. 検証します。
   - `npm ci`と`npm run check`
   - `python scripts/check_encoding.py .`
   - `git diff --check`
4. 公開する形へ再構成します。
   - ローカルcommitを論理単位へsquash / rebaseします。
   - 各commitメッセージを、変更理由が第三者に伝わる内容へ書き直します。
   - 再構成後に3の検証をやり直します。
5. pushしてPull Requestを作成し、GitHub Actionsの成功を確認します。

履歴の書き換えは、**まだ一度もpushしていないローカルcommitに限ります。**
push済みのブランチはforce pushで書き換えず、レビュー対応は追加commitで行ってください。
中間commitはsquash mergeで解消されます。

## Pull Request本文に含める内容

- 変更目的。
- v13互換性への影響。機能変更なしの場合も明記します。
- lint、test、文字コード検査、必要な場合は実FormBridge環境での確認結果。
- 第三者ライセンス、地図帰属、タイル利用条件への影響。
- rollback方法。

Pull Request本文はsquash merge後のcommit本文になります。
一時的なやり取りではなく、変更の記録として読める内容にしてください。

## merge

1. 差分、CI結果、必要な場合は実FormBridge環境での確認結果をレビューします。
2. **squash merge**でmainへ統合します。レビュー往復の中間commitはmainへ残しません。
3. 複数の論理的変更を含んでしまったPull Requestは、squash mergeせず分割します。

## バージョニング

Semantic Versioningを採用し、タグは`vMAJOR.MINOR.PATCH`の形式とします。
判定は**配布JavaScript `formbridge-location-picker.js` の互換性**を基準とします。

| 区分 | 対象 |
| --- | --- |
| MAJOR | 既存利用者の設定変更や移行作業が必要になる変更 |
| MINOR | 後方互換性を保った機能追加 |
| PATCH | 後方互換性を保った修正。動作の是正、外部サービスの利用条件への適合など |

既存のタグ`v13`は、Semantic Versioning移行前に公開したものです。
そのまま維持し、移行上は`13.0.0`に相当する既存の基準として扱います。
`v13.0.0`は新設しません。互換性の判定基準は`docs/BASELINE_V13.md`です。

バージョンの正本はタグと`docs/CHANGELOG.md`です。`README.md`のタイトルへは
バージョンを表記しません。`package.json`は開発ツール専用のため、
配布JavaScriptのバージョンとは分離し、更新しません。

## Release

1. main上でCI成功と対象commitを確認します。
2. バージョン番号、Release名、Release notes、配布ファイルのSHA-256を確定します。
3. `docs/CHANGELOG.md`の`## Unreleased`を、確定したバージョンと日付の見出しへ
   切り替えます。
4. タグを作成し、GitHub Releaseを発行します。Release notesは`docs/CHANGELOG.md`の
   該当バージョンの内容を使用します。
5. 公開後に配布ファイルを再取得し、SHA-256と導入手順を確認します。

## rollback

- 公開済みv13の基準タグは`v13`、commitは`b6cfe8b`。GitHub rawで再取得する
  本体JavaScript（リポジトリblob、LF）のSHA-256は
  `F2CB225675BD631D4529C736EDD7FD0F2E58B30A45C994E38F267F86CF84C25B`。
- Windows作業ツリーのCRLF版SHA-256
  `167A1B532E127B2763553D924DCA93B68AC0972B6CA9223CF341D1E1AA3DB5A9`
  はローカルチェックアウト確認用の参考値であり、公開後の再取得検証には使用しません。
- 未mergeの問題は、Pull Requestをmergeせず修正します。
- merge後の問題は、revert commitまたは修正版を通常のPull Requestで作成します。
- 公開Releaseの問題は、影響、復旧版、既存v13への戻し方を利用者へ案内します。
- `reset --hard`、force push、既存タグの付け替えで公開履歴を上書きしません。
- 履歴の整理は最初のpush前のローカルcommitに限り、一度公開したcommitは書き換えません。
