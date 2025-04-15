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
