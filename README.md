# formbridge-location-picker

フォームブリッジ上にJavaScriptとCSSによるカスタマイズを行うことで、フォームに地図を表示し、マーカーの位置情報（緯度・経度）を取得する機能です。

フォームブリッジの 詳しい設定 ＞ JavaScript/CSSでカスタマイズ より、以下の設定を行なってください。

ファイル指定で追加：
　jsファイル: formbridge-location-picker.js

URL指定で追加：
　Leaflet JS: https://unpkg.com/leaflet@1.9.4/dist/leaflet.js
　Leaflet CSS: https://unpkg.com/leaflet@1.9.4/dist/leaflet.css

必ず以下の点は注意してください。
・緯度（数値フィールド）のフィールドコードは latitude とする（kintoneアプリも同様)
・経度（数値フィールド）のフィールドコードは longitude とする(kintoneアプリも同様)

その他に、以下も注意してください。
・kintoneアプリの数値フィールドは、デフォルト小数点以下4桁までしか表示されません。設定 ＞ 高度な設定 から緯度経度は6桁表示にするのがよいです。

まずシンプルな状態でkintoneアプリとフォームブリッジの設定を行い、動作確認ができたら業務要件に従って必要なフィールドを追加してください。

なお、もう少し詳細な解説をnoteで行っていますのでご参照ください。
https://note.com/tetopettenson/n/n5152ace1e0d0?sub_rt=share_pb
