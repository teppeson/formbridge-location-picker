# 開発・Release手順

本書はこのリポジトリの開発ワークフローの正本である。Git操作全般の事故防止ルールは
別途の共通ポリシーに従い、本書はそれと矛盾しない範囲で公開履歴の粒度と承認境界を定める。

## 原則

- mainへ直接変更を加えず、作業ブランチとPull Requestを使用する。
- v13の後方互換性と既存利用者保護を、バージョン番号や開発速度より優先する。
- **Git履歴は開発作業の記録ではなく、ソフトウェアの変更の記録である。**
  初回の公開push前に調査や試行錯誤のcommitを整理し、mainには中間commitを残さない。
  Pull Request上のレビュー対応commitは公開の場に残るが、squash mergeにより
  mainの永続的な履歴へは持ち込まない。
- **ローカルcommitと公開pushを別の行為として扱う。** ローカルcommitは作業の
  セーブポイントであり、いくつ作ってもよい。公開pushは、検証済みで第三者が
  レビューできるまとまりになった段階でのみ行う。
- 1つの論理的変更 = 1 Pull Request を原則とし、mainへの取り込みはsquash mergeを基本とする。
- 開発プロセスの変更は`docs/CHANGELOG.md`へ記録しない。同書は製品の変更履歴とする。

## 1つの論理的変更の定義

次をすべて満たすものを、公開履歴の1単位とする。

- 単独でrevertしても整合が保たれる。
- 「〜する」の1文で、「かつ」「ついでに」を使わずに説明できる。
- その時点で`npm run check`と文字コード検査が成功する。
- 製品の変更と、無関係な文書整理・進捗記録を混在させていない。

次は公開履歴の独立した単位にしない。変更本体へ同梱するか、公開せず記録にとどめる。

- 「CI成功を反映」「レビュー指摘に対応」「typo修正」など、直前の変更を完成させる
  ためだけの修正。公開push前にsquashする。
- 進捗状態の更新だけを内容とする変更。
- 開発中の試行回数に比例して増える中間状態。

## 段階1〜4 ローカル作業（Human承認不要）

1. `docs/BASELINE_V13.md`と`docs/ROADMAP.md`を確認する。
2. 作業ブランチを`origin/main`から作成し、調査・修正・テストを繰り返す。
   この間のローカルcommitは自由に作ってよい。WIPメッセージのままでよい。
3. 検証する。
   - `npm ci`と`npm run check`
   - `python scripts/check_encoding.py .`
   - `git diff --check`
   - 公開してよい内容だけが含まれることの確認
4. 公開する形へ再構成する。
   - ローカルcommitを論理単位へsquash / rebaseする。
   - 各commitメッセージを、変更理由が第三者に伝わる内容へ書き直す。
   - 再構成後に段階3の検証をやり直す。

段階4の履歴書き換えは、**まだ一度も公開pushしていないローカルcommitに限る。**

## 段階5〜6 公開pushとPull Request（Human承認が必要）

1. 公開予定の履歴をHumanへ提示する。
   `git log --oneline origin/main..HEAD`と`git diff --stat origin/main...HEAD`を示す。
2. Humanの公開承認を得る。
3. `git fetch`と`git status -sb`で分岐がないことを確認する。
4. **承認後は、pushとPull Request作成を一連で行う。** 段階ごとに再確認しない。
5. GitHub Actionsの成功を確認する。

**公開承認はmerge承認を含まない。** ここでの承認範囲はpushとPull Request作成までであり、
mainへの取り込みは段階8で改めてHumanの承認を得る。Humanの表現が
「pushしてmergeまで進めてよい」のように一括に読める場合も、
mergeは別の承認として扱い、CI結果とPull Requestの最終内容を提示して判断を仰ぐ。

## 段階7 レビュー対応（追加のHuman承認は不要）

- Pull Requestの目的とscopeを変えない軽微なレビュー対応は、
  PRブランチへ追加commitしてpushしてよい。都度の承認を求めない。
- 公開済みブランチをforce pushで書き換えない。中間commitはsquash mergeで解消する。
- 次のいずれかに該当する場合は作業を止めてHumanへ確認する。
  - Pull Requestの目的またはscopeが変わる。
  - 想定していない差分、意図しない削除、追跡ファイル数の急減がある。
  - 認証情報、顧客データ、非公開FormBridge設定などが含まれる可能性がある。
  - 不可逆操作（force push、履歴改変、タグの付け替え、Release発行）が必要になる。
  - `docs/BASELINE_V13.md`の保護対象挙動を変える必要が生じる。

## 段階8 merge（段階5〜6とは別のHuman承認が必要）

1. Humanが差分、CI、必要なら実FormBridge結果を確認する。
2. Humanのmerge承認後、**squash merge**でmainへ統合する。
   レビュー往復の中間commitはmainへ残さない。
3. squash後のcommitメッセージは、Pull Requestのタイトルと本文を整えたものにする。
4. 複数の論理的変更を含んでしまったPull Requestは、squash mergeせず分割する。

## Pull Request本文に含める内容

- 変更目的と対象作業番号。
- v13互換性への影響。機能変更なしの場合も明記する。
- ローカルlint、test、文字コード検査、実FormBridge確認の結果。
- 第三者ライセンス、地図帰属、タイル利用条件への影響。
- rollback方法。
- 未解決事項とHumanに求める判断。

## Release

1. main上でCI成功と対象commitを確認する。
2. バージョン番号、Release名、Release notes、配布ファイルのSHA-256を確定する。
3. Humanがタグ作成とGitHub Release発行を承認する。
4. 公開後に配布ファイルを再取得し、SHA-256と導入手順を確認する。

次期バージョン番号をv14とするかSemantic Versioningへ移行するかは未決であり、
初回の新Release前にHumanが判断する。

## rollback

- 公開済みv13の基準タグは`v13`、commitは`b6cfe8b`。GitHub rawで再取得する
  本体JavaScript（リポジトリblob、LF）のSHA-256は
  `F2CB225675BD631D4529C736EDD7FD0F2E58B30A45C994E38F267F86CF84C25B`。
- Windows作業ツリーのCRLF版SHA-256
  `167A1B532E127B2763553D924DCA93B68AC0972B6CA9223CF341D1E1AA3DB5A9`
  はローカルチェックアウト確認用の参考値であり、公開後の再取得検証には使用しない。
- 未mergeの問題はPull Requestをmergeせず修正する。
- merge後の問題は、Human承認のうえrevert commitまたは修正版を通常のPull Requestで作成する。
- 公開Releaseの問題は、影響、復旧版、既存v13への戻し方を利用者へ案内する。
- `reset --hard`、force push、既存タグの付け替えで公開履歴を上書きしない。
- 履歴の整理は公開push前のローカルcommitに限る。一度公開したcommitは書き換えない。
