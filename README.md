# formbridge-location-picker（v13）

フォームブリッジ上にJavaScriptとCSSによるカスタマイズを行うことで、  
フォームに地図を表示し、マーカー（移動可能）の位置情報（緯度・経度）を取得する機能です。

---

## 設定方法

### 1. フォームブリッジの「JavaScript/CSSでカスタマイズ」設定

- **ファイル指定で追加（githubからDL）**  
  - `formbridge-location-picker.js`

- **URL指定で追加**  
  - Leaflet JS:  
    [https://unpkg.com/leaflet@1.9.4/dist/leaflet.js](https://unpkg.com/leaflet@1.9.4/dist/leaflet.js)  
  - Leaflet CSS:  
    [https://unpkg.com/leaflet@1.9.4/dist/leaflet.css](https://unpkg.com/leaflet@1.9.4/dist/leaflet.css)

---

### 2. フィールドコードの注意点

- 緯度（数値フィールド）のフィールドコードは **`latitude`** とする  
- 経度（数値フィールド）のフィールドコードは **`longitude`** とする  

> ※kintoneアプリでも同様のフィールドコードにしてください。

---

### 3. 小数点桁数の設定

- **kintoneアプリの数値フィールド**は、デフォルトで小数点以下4桁までしか表示されません。（4桁では粗くなります）
- 設定 > 高度な設定 から、小数点以下を6桁表示に設定すると、緯度経度の精度が上がりおすすめです。

---

### 4. 詳細な解説

以下のnote記事にもう少し詳しい解説をしてあります。参考にしてください。

- [フォームブリッジ×kintoneで地図表示＆位置情報取得を実装する](https://note.com/tetopettenson/n/n5152ace1e0d0?sub_rt=share_pb)

---

## 開発・保守方針

- 既存利用者との後方互換性を最優先にします。
- 現行v13の既定動作を変更する場合は、事前に互換性評価と移行方法を提示します。
- Codexが調査、実装、テスト、Pull Requestの準備を主導し、公開・マージ・ReleaseはHumanが承認します。
- 現在は開発基盤の移行期間です。v13本体の挙動変更はまだ行っていません。
- 2026年8月9日、公開手順どおりに新規作成したkintoneアプリとFormBridgeフォームで、v13標準構成の動作を確認しました。

開発計画と現在地は [docs/ROADMAP.md](docs/ROADMAP.md)、現行仕様の基準は
[docs/BASELINE_V13.md](docs/BASELINE_V13.md) を参照してください。

## ライセンス

PJ033自身のソースコードと文書は、Teppei Utsunomiyaを著作権者とする
[MIT License](LICENSE)で公開します。利用、変更、再配布、商用利用が可能ですが、
ソフトウェアは現状有姿かつ無保証で提供されます。正確な許諾条件と免責事項は
`LICENSE`の原文を参照してください。

Leaflet、OpenStreetMap、国土地理院の地図データおよびタイル配信サービスには、
それぞれ別のライセンスと利用条件が適用されます。詳細は
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)を参照し、地図上の帰属表示を
削除しないでください。

## 開発環境

開発用ツールはNode.js 24 LTSとnpm 11を使用し、配布JavaScriptとは分離しています。
依存関係は`package-lock.json`で固定されています。

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
npm.cmd run check
```

PowerShellで`npm.ps1`が実行ポリシーにより拒否される環境では、ポリシーを変更せず
`npm.cmd`を使用してください。macOSやLinuxでは`npm ci`、`npm run lint`、`npm test`を
使用できます。`check`はlintとテストを順番に実行します。

改善提案とPull Requestの手順は[CONTRIBUTING.md](CONTRIBUTING.md)、公開前の実環境確認は
[実FormBridgeスモークテスト確認表](docs/FORMBRIDGE_SMOKE_TEST.md)、公開・rollback手順は
[開発・Release手順](docs/RELEASE_PROCESS.md)を参照してください。
