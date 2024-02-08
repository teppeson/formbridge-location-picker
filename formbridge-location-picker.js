(function() {
  "use strict";

  // パラメータ設定
  var useOpenStreetMap = true; // trueでOpenStreetMapを使用、falseで国土地理院の地図を使用
  var defaultLat = 35.681236; // デフォルトの緯度　東京駅:35.681236
  var defaultLng = 139.767125; // デフォルトの経度 東京駅:139.767125
  var initialZoomLevel = 17; // 初期ズームレベル
  var mapHeight = '400px'; // 地図の高さ
  var mapWidth = '100%'; // 地図の横幅
  var tileLayerURL = useOpenStreetMap
                      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // OpenStreetMapのタイルレイヤーURL
                      : 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'; // 国土地理院のタイルレイヤーURL
  var maxZoomLevel = 19; // 最大ズームレベル
  var attribution = useOpenStreetMap
                      ? 'Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
                      : '© <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>'; // 地図データの帰属表示

  // 地図のコンテナ要素を作成する関数
  function createMapContainer() {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = mapHeight;
    mapDiv.style.width = mapWidth;
    return mapDiv;
  }

  // 地図を設定する関数
  function setupMap(mapDiv, initialLat, initialLng) {
    var map = L.map(mapDiv.id).setView([initialLat, initialLng], initialZoomLevel);
    L.tileLayer(tileLayerURL, {
      maxZoom: maxZoomLevel,
      attribution: attribution
    }).addTo(map);

    var marker = L.marker([initialLat, initialLng], {draggable: true}).addTo(map);
    marker.on('dragend', function(event) {
      var position = marker.getLatLng();
      updateFormFields(position.lat, position.lng);
    });

    updateFormFields(initialLat, initialLng);
  }

  // フォームが読み込まれた後の処理
  fb.events.form.mounted = [function(state) {
    var mapDiv = createMapContainer();
    var formContent = document.getElementsByClassName('fb-content')[0];
    formContent.insertBefore(mapDiv, formContent.firstChild);

    // ユーザーの現在位置を取得して地図を設定
    navigator.geolocation.getCurrentPosition(function(position) {
      setupMap(mapDiv, position.coords.latitude, position.coords.longitude);
    }, function(error) {
      console.error("Geolocation error: " + error.message);
      setupMap(mapDiv, defaultLat, defaultLng);
    });

    return state;
  }];

  // フォームが送信される前の処理
  fb.events.form.submit = [function(state) {
    var mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.style.display = 'none';
    }
    return state;
  }];

  // 緯度と経度をフォームに設定し、changeイベントを発火させる関数
  function updateFormFields(lat, lng) {
    var latitudeField = fb.getElementByCode('latitude');
    var longitudeField = fb.getElementByCode('longitude');

    if (latitudeField && longitudeField) {
      var latitudeInput = latitudeField.getElementsByTagName('input')[0];
      var longitudeInput = longitudeField.getElementsByTagName('input')[0];

      latitudeInput.value = lat.toFixed(6);
      longitudeInput.value = lng.toFixed(6);

      var event = new Event('change', { bubbles: true });
      latitudeInput.dispatchEvent(event);
      longitudeInput.dispatchEvent(event);
    }
  }
})();
