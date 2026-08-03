# v13 互換性ベースライン

## 位置づけ

2026-08-03時点の公開版v13を、今後の変更が既存利用者へ影響しないか判定する基準として記録する。本書は現行挙動の記録であり、すべてが理想的な仕様であることを意味しない。

## Git基準

- clone時のmain: `248767f`
- v13タグ: `b6cfe8b`
- v13本体を導入したコミット: `ca74ab5`
- clone時の追跡ファイル数: 2
- `README.md` SHA-256: `B9FBB6F3E1FD8F432C9F5B731CD21B571BF6518ACD2755C9559EB4CE059F6976`
- `formbridge-location-picker.js` SHA-256: `167A1B532E127B2763553D924DCA93B68AC0972B6CA9223CF341D1E1AA3DB5A9`
- v13タグからclone時mainまでの本体JavaScript差分: なし。READMEのみ更新。
- 本体JavaScriptの改行は既存配布物と同じCRLFを維持し、`.editorconfig`、`.gitattributes`、文字コード検査でパス単位の明示的例外とする。

## 現行の導入条件

1. FormBridgeのJavaScript/CSSカスタマイズへ `formbridge-location-picker.js` を追加する。
2. Leaflet 1.9.4のJavaScriptとCSSをURL指定で追加する。
3. 緯度の数値フィールドコードを `latitude` とする。
4. 経度の数値フィールドコードを `longitude` とする。
5. kintone側も同じフィールドコードを使用し、小数点以下6桁表示を推奨する。

## 保護対象の現行挙動

1. `formBridge.events.on('form.show', ...)` で初期化する。
2. `.fb-custom--content` を優先し、見つからない場合は `.fb-content` を使用する。
3. `id="map"`、高さ`400px`、幅`100%`の地図コンテナをフォーム先頭へ追加する。
4. 現在位置取得に成功した場合、その緯度経度とズーム17で表示する。
5. 現在位置取得に失敗した場合、東京駅`35.681236, 139.767125`を使用する。
6. 既定地図はOpenStreetMap、最大ズーム19とする。
7. ソース設定の変更により国土地理院標準地図へ切り替えられる。
8. 初期表示時に緯度経度を小数点以下6桁の文字列でフォームへ設定する。
9. ドラッグ可能なマーカーを表示し、ドラッグ終了時に緯度経度を更新する。
10. `form.submit`時に地図要素が存在すれば非表示にする。
11. Leaflet、OpenStreetMap、国土地理院の帰属表示を維持する。

## 変更時の判定

- 上記挙動を変えない変更は、特性テストと実FormBridgeスモークテストで確認する。
- 上記挙動を変える場合は、変更理由、既存利用者への影響、移行方法、rollback方法をPull Requestへ記載する。
- デフォルト値を変更する機能追加は破壊的変更候補としてHuman承認を必須とする。

## 自動テストによる保護範囲

`test/formbridge-location-picker.test.js`はNode標準テストと最小スタブを使い、次を保護する。

- `form.show`と`form.submit`のイベント登録。
- `.fb-custom--content`の優先と`.fb-content`へのフォールバック。
- 地図要素のID、高さ、幅、フォーム先頭への挿入。
- 現在位置成功時の座標とズーム17、失敗時の東京駅座標。
- OpenStreetMapの現行URL、最大ズーム19、帰属表示。
- 初期表示とマーカードラッグ時の緯度経度6桁更新。
- `form.submit`時の地図非表示。

国土地理院への設定切替、Leafletを含む実ブラウザ描画、FormBridge実DOM、位置情報許可UI、
すべての帰属表示の視認性は、実FormBridgeスモークテストで確認する。
