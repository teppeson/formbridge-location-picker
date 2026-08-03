# Third-Party Notices

PJ033自身のソースコードと文書には、ルートの`LICENSE`に記載したMIT Licenseを適用します。
以下の外部ライブラリ、地図データ、タイル配信サービスには、それぞれの権利者が定める
ライセンスおよび利用条件が別途適用され、PJ033のMIT Licenseの対象には含まれません。

## Leaflet 1.9.4

- 用途: ブラウザ上の地図表示ライブラリ。READMEの手順によりunpkg CDNから読み込みます。
- ライセンス: BSD 2-Clause License
- Copyright (c) 2010-2023, Volodymyr Agafonkin
- Copyright (c) 2010-2011, CloudMade
- ライセンス原文: <https://github.com/Leaflet/Leaflet/blob/v1.9.4/LICENSE>

現時点でPJ033はLeaflet本体をリポジトリへ同梱していません。将来同梱する場合は、
BSD 2-Clause Licenseの著作権表示、条件および免責条項を配布物へ収録します。

## OpenStreetMap

- 用途: 既定の地図データおよび標準ラスタータイル。
- 地図データ: Open Data Commons Open Database License（ODbL）。
- 著作権・ライセンス: <https://www.openstreetmap.org/copyright>
- タイル利用ポリシー: <https://operations.osmfoundation.org/policies/tiles/>

地図上の`© OpenStreetMap contributors`表示とライセンスページへのリンクを維持します。
標準タイルサーバーは無保証の共有サービスであり、利用者および導入先は、表示可能な帰属、
通常のブラウザキャッシュ、Referer、アクセス量、オフライン利用禁止等の現行ポリシーを
確認する必要があります。現行v13のタイルURLと最新ポリシー指定URLの差は、後方互換性を
考慮したうえで別作業として評価し、本ライセンス追加では配布JavaScriptを変更しません。

## 国土地理院

- 用途: 設定切替時の地理院タイル（標準地図）。
- 地理院タイル一覧・利用案内: <https://maps.gsi.go.jp/development/ichiran.html>
- 国土地理院コンテンツ利用規約: <https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html>

地理院サーバーから地理院タイルをリアルタイムに読み込む現在の方式では、出典として
「国土地理院」または「地理院タイル」等を表示し、地理院タイル一覧へリンクします。
タイルの種類や利用方法を変更する場合は、個別の出典条件、第三者の権利、測量法上の
手続要否を改めて確認します。
