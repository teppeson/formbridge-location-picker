(function() {
    "use strict";
  
    // --- パラメータ設定 ---
    var useOpenStreetMap = true; // trueでOpenStreetMapを使用、falseで国土地理院の地図を使用
    var defaultLat = 35.681236;   // デフォルトの緯度（東京駅）
    var defaultLng = 139.767125;  // デフォルトの経度（東京駅）
    var initialZoomLevel = 17;    // 初期ズームレベル
    var mapHeight = '400px';      // 地図の高さ
    var mapWidth = '100%';        // 地図の横幅
    var tileLayerURL = useOpenStreetMap
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'    // OpenStreetMapのタイルレイヤー
      : 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'; // 国土地理院のタイルレイヤー
    var maxZoomLevel = 19;        // 最大ズームレベル
    var attribution = useOpenStreetMap
      ? 'Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
      : '© <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>'; // 帰属表示
  
    // --- 地図のコンテナ要素を作成 ---
    function createMapContainer() {
      var mapDiv = document.createElement('div');
      mapDiv.id = 'map';
      mapDiv.style.height = mapHeight;
      mapDiv.style.width = mapWidth;
      return mapDiv;
    }
  
    // --- フィールド（緯度・経度）を更新 ---
    // 新仕様のAPI: context.setFieldValue(fieldCode, value) を使用
    function updateFormFields(context, lat, lng) {
      context.setFieldValue('latitude', lat.toFixed(6));
      context.setFieldValue('longitude', lng.toFixed(6));
    }
  
    // --- 地図を設定 ---
    function setupMap(context, mapDiv, initialLat, initialLng) {
      var map = L.map(mapDiv.id).setView([initialLat, initialLng], initialZoomLevel);
  
      L.tileLayer(tileLayerURL, {
        maxZoom: maxZoomLevel,
        attribution: attribution
      }).addTo(map);
  
      // マーカーのドラッグ終了時にフィールドを更新
      var marker = L.marker([initialLat, initialLng], {draggable: true}).addTo(map);
      marker.on('dragend', function() {
        var position = marker.getLatLng();
        updateFormFields(context, position.lat, position.lng);
      });
  
      // 初期表示時点でもフィールド更新
      updateFormFields(context, initialLat, initialLng);
    }
  
    // --- フォーム表示時(form.show) ---
    // 旧： fb.events.form.mounted → 新： formBridge.events.on('form.show', ...)
    formBridge.events.on('form.show', function(context) {
      // 地図コンテナをDOMに挿入
      var mapDiv = createMapContainer();
  
      // 新仕様のCSSクラスを使ってフォーム要素を取得（例: fb-custom--content）
      // 必要に応じて従来の document.getElementsByClassName(...) から置き換え
      var formContent = document.querySelector('.fb-custom--content');
      if (!formContent) {
        // 万一取得できなかった場合、既存と同じクラス名でフォールバック
        formContent = document.getElementsByClassName('fb-content')[0];
      }
      formContent.insertBefore(mapDiv, formContent.firstChild);
  
      // ユーザーの現在位置を取得して地図を設定
      navigator.geolocation.getCurrentPosition(function(position) {
        setupMap(context, mapDiv, position.coords.latitude, position.coords.longitude);
      }, function(error) {
        console.error("Geolocation error: " + error.message);
        setupMap(context, mapDiv, defaultLat, defaultLng);
      });
    });
  
    // --- フォーム送信時(form.submit) ---
    // 旧： fb.events.form.submit → 新： formBridge.events.on('form.submit', ...)
    formBridge.events.on('form.submit', function(context) {
      var mapElement = document.getElementById('map');
      if (mapElement) {
        // 送信直前に地図を非表示にする例
        mapElement.style.display = 'none';
      }
      // 必要に応じて、回答送信を止めたいときは context.preventDefault() を呼び出す
      // context.preventDefault();
    });
  
  })();
  
