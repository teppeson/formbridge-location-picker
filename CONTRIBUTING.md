# Contributing to FormBridge Location Picker

このプロジェクトへの改善提案を歓迎します。最優先事項は、公開済みv13を利用している方の
後方互換性を守ることです。

## 開発環境

- Node.js 24 LTS
- npm 11

```powershell
npm.cmd ci
npm.cmd run check
```

macOSまたはLinuxでは`npm ci`と`npm run check`を使用してください。

## 変更の進め方

1. mainではなく作業ブランチを使用する。
2. 変更前に`docs/BASELINE_V13.md`で保護対象を確認する。
3. 機能変更には、既存挙動を保護するテストまたは変更後の仕様を示すテストを追加する。
4. `npm run check`を成功させる。
5. push前に、作業中のcommitを論理的な変更単位へ整理する。
6. Pull Requestへ変更理由、互換性への影響、検証結果、rollback方法を記載する。

## commitとPull Requestの粒度

このリポジトリのGit履歴は、開発中の作業経過ではなく、ソフトウェアとして意味のある
変更の記録です。手元では自由にcommitして構いませんが、push前に整理してください。

- 1commit = 単独でrevertでき、1文で説明できる1つの変更。
- そのcommit時点で`npm run check`が成功する。
- 「レビュー対応」「typo修正」など直前のcommitを完成させるだけの修正は、
  push前にsquashして本体へまとめる。
- 製品の変更と、無関係な文書整理を同じcommitへ混ぜない。
- 1つの論理的変更につき1つのPull Requestを原則とします。

レビュー中の指摘対応はPull Requestブランチへ追加commitしてください。force pushは不要です。
mergeはsquash mergeで行うため、レビュー往復の中間commitはmainへ残りません。

詳細は`docs/RELEASE_PROCESS.md`を参照してください。

## Pull Requestの確認事項

- 配布JavaScriptの形式や導入方法を不必要に変更していない。
- `latitude`と`longitude`の既定フィールドコードを維持している。
- Leaflet、OpenStreetMap、国土地理院の帰属表示と利用条件を維持している。
- 認証情報、顧客データ、非公開FormBridge設定を含めていない。
- 実FormBridge確認が必要な変更では、`docs/FORMBRIDGE_SMOKE_TEST.md`の結果を記録した。

## ライセンス

特段の合意がない限り、このプロジェクトへ提出されたContributionは、プロジェクトと同じ
MIT Licenseの条件で提供されるものとします。第三者のコードを含める場合は、出所と
ライセンスを明記し、MIT Licenseとの両立を確認してください。
