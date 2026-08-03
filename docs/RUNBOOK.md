# RUNBOOK

## 作業開始

1. `docs/ROADMAP.md`で番号付き進捗を確認する。
2. `docs/BASELINE_V13.md`で互換性基準を確認する。
3. mainを直接編集せず、作業ブランチを使用する。

## 初期検証

```powershell
git status --short
git branch --show-current
git remote -v
python scripts/check_encoding.py .
npm.cmd ci
npm.cmd run lint
npm.cmd test
npm.cmd run check
```

Windows PowerShellで`npm.ps1`が実行ポリシーにより拒否される場合は、実行ポリシーを
変更せず`npm.cmd`を使用する。macOS/Linuxでは`npm ci`、`npm run lint`、`npm test`を使用する。

## CI

- `.github/workflows/ci.yml`はPull Requestとmainへのpushで起動する。
- UbuntuとNode 24を使用し、`npm ci`の後に`npm run check`を実行する。
- workflowの権限は`contents: read`に限定し、秘密情報やデプロイ権限を使用しない。
- CI成功はローカル実行だけでは完了扱いにせず、Human承認後のPull Requestで確認する。

## 公開前ガード

- 配布JavaScriptの差分を確認する。
- lint、test、CIをすべて成功させる。
- 実FormBridge環境のスモークテスト結果を記録する。
- 既存利用者への影響とrollback方法をPull Requestへ記載する。
- Maintainerがpush、merge、Releaseの各公開操作を承認する。
- 詳細は`docs/RELEASE_PROCESS.md`、実環境確認は`docs/FORMBRIDGE_SMOKE_TEST.md`を使用する。

## rollback

- 公開済みv13の基準タグは`v13`、コミットは`b6cfe8b`。
- 異常時にforce pushやresetを独断実行しない。
- 復旧方針をHumanへ提示し、承認後に安全なrevertまたは旧Release案内を行う。
