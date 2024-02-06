# formbridge-location-picker

フォームブリッジ上にJavaScriptとCSSによるカスタマイズを行うことで、フォームに地図を表示し、マーカーの位置情報（緯度・経度）を取得する機能です。

フォームブリッジの 詳しい設定 ＞ JavaScript/CSSでカスタマイズ より、以下の設定を行なってください。

ファイル指定で追加：
  jsファイル: formbridge-location-picker.js
URL指定で追加：
  Leaflet JS: https://unpkg.com/leaflet@1.7.1/dist/leaflet.js
  Leaflet CSS: https://unpkg.com/leaflet@1.7.1/dist/leaflet.css

その他の注意点は以下です。
・緯度のフィールドコードは latitude とする（kintoneアプリも同様)
・経度のフィールドコードは longitude とする(kintoneアプリも同様)
それ以外の注意点は特にありません。

まずシンプルな状態でkintoneアプリとフォームブリッジの連携を行い、業務要件に従って必要なフィールドを追加してください。
