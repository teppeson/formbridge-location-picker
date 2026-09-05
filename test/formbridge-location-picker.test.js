import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(
  new URL("../formbridge-location-picker.js", import.meta.url),
  "utf8",
);

function createHarness({ geolocation = "success", useFallbackContainer = false } = {}) {
  const events = new Map();
  const calls = {
    errors: [],
    fieldValues: [],
    inserted: [],
    maps: [],
    markers: [],
    tileLayers: [],
  };
  const primaryContainer = createFormContainer("primary", calls);
  const fallbackContainer = createFormContainer("fallback", calls);
  let mapElement;

  const document = {
    createElement(tagName) {
      assert.equal(tagName, "div");
      mapElement = { id: "", style: {} };
      return mapElement;
    },
    getElementById(id) {
      return id === "map" ? mapElement : null;
    },
    getElementsByClassName(className) {
      assert.equal(className, "fb-content");
      return [fallbackContainer];
    },
    querySelector(selector) {
      assert.equal(selector, ".fb-custom--content");
      return useFallbackContainer ? null : primaryContainer;
    },
  };

  const navigator = {
    geolocation: {
      getCurrentPosition(onSuccess, onError) {
        if (geolocation === "success") {
          onSuccess({ coords: { latitude: 34.690083, longitude: 135.195511 } });
        } else {
          onError({ message: "permission denied" });
        }
      },
    },
  };

  const L = {
    map(id) {
      const map = {
        id,
        setView(coordinates, zoom) {
          map.coordinates = coordinates;
          map.zoom = zoom;
          return map;
        },
      };
      calls.maps.push(map);
      return map;
    },
    marker(coordinates, options) {
      const handlers = new Map();
      const marker = {
        coordinates,
        options,
        addTo(map) {
          marker.map = map;
          return marker;
        },
        getLatLng() {
          return marker.draggedPosition;
        },
        on(eventName, callback) {
          handlers.set(eventName, callback);
          return marker;
        },
        dragTo(lat, lng) {
          marker.draggedPosition = { lat, lng };
          handlers.get("dragend")();
        },
      };
      calls.markers.push(marker);
      return marker;
    },
    tileLayer(url, options) {
      const layer = {
        url,
        options,
        addTo(map) {
          layer.map = map;
          return layer;
        },
      };
      calls.tileLayers.push(layer);
      return layer;
    },
  };

  const formBridge = {
    events: {
      on(eventName, callback) {
        events.set(eventName, callback);
      },
    },
  };
  const console = {
    error(message) {
      calls.errors.push(message);
    },
  };

  vm.runInNewContext(source, { console, document, formBridge, L, navigator });

  const context = {
    setFieldValue(fieldCode, value) {
      calls.fieldValues.push([fieldCode, value]);
    },
  };

  return { calls, context, events, fallbackContainer, primaryContainer };
}

function createFormContainer(name, calls) {
  return {
    firstChild: { id: `${name}-first-child` },
    insertBefore(element, reference) {
      calls.inserted.push({ container: name, element, reference });
    },
  };
}

test("form.show uses current location and preserves the v13 map contract", () => {
  const harness = createHarness();

  assert.deepEqual([...harness.events.keys()], ["form.show", "form.submit"]);
  harness.events.get("form.show")(harness.context);

  assert.equal(harness.calls.inserted.length, 1);
  assert.equal(harness.calls.inserted[0].container, "primary");
  assert.equal(harness.calls.inserted[0].element.id, "map");
  assert.equal(harness.calls.inserted[0].element.style.height, "400px");
  assert.equal(harness.calls.inserted[0].element.style.width, "100%");

  assert.deepEqual(Array.from(harness.calls.maps[0].coordinates), [34.690083, 135.195511]);
  assert.equal(harness.calls.maps[0].zoom, 17);
  assert.equal(harness.calls.tileLayers[0].url, "https://tile.openstreetmap.org/{z}/{x}/{y}.png");
  assert.equal(harness.calls.tileLayers[0].options.maxZoom, 19);
  assert.match(harness.calls.tileLayers[0].options.attribution, /OpenStreetMap contributors/);
  assert.deepEqual(harness.calls.fieldValues, [
    ["latitude", "34.690083"],
    ["longitude", "135.195511"],
  ]);

  assert.equal(harness.calls.markers[0].options.draggable, true);
  harness.calls.markers[0].dragTo(35.1234567, 139.7654321);
  assert.deepEqual(harness.calls.fieldValues.slice(-2), [
    ["latitude", "35.123457"],
    ["longitude", "139.765432"],
  ]);
});

test("form.show falls back to fb-content and Tokyo Station when geolocation fails", () => {
  const harness = createHarness({ geolocation: "failure", useFallbackContainer: true });

  harness.events.get("form.show")(harness.context);

  assert.equal(harness.calls.inserted[0].container, "fallback");
  assert.deepEqual(Array.from(harness.calls.maps[0].coordinates), [35.681236, 139.767125]);
  assert.deepEqual(harness.calls.fieldValues, [
    ["latitude", "35.681236"],
    ["longitude", "139.767125"],
  ]);
  assert.deepEqual(harness.calls.errors, ["Geolocation error: permission denied"]);
});

test("form.submit hides an existing map element", () => {
  const harness = createHarness();

  harness.events.get("form.show")(harness.context);
  harness.events.get("form.submit")(harness.context);

  assert.equal(harness.calls.inserted[0].element.style.display, "none");
});
