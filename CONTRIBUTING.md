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
5. Pull Requestへ変更理由、互換性への影響、検証結果、rollback方法を記載する。

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
