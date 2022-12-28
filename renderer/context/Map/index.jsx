import L from "leaflet";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  MAP_CENTER,
  MAP_MAX_HORIZONTAL,
  MAP_MAX_VERTICAL,
  MAP_MIN_HORIZONTAL,
  MAP_MIN_VERTICAL,
  MAP_SIZE,
  ZOOM,
} from "../../utils";

export const MapContext = createContext();

export function MapProvider({ id, children }) {
  // State
  const map = useRef();
  const [markers, setMarkers] = useState(new Map());

  useEffect(() => {
    if (map.current) map.current.remove();

    // Generate the map
    map.current = L.map(id, {
      crs: L.CRS.Simple,
      minZoom: 4,
      maxZoom: ZOOM,
      zoomControl: false,
      maxBoundsViscosity: 1.0,
      keyboard: false,
      preferCanvas: true,
      attributionControl: false,
    });

    // Define the initial coordinates and the initial zoom of the map
    map.current.setView(
      map.current.unproject([MAP_CENTER, MAP_CENTER], ZOOM),
      3
    );

    // Define the map bounds (areas of the map that have no content are not displayed)
    map.current.setMaxBounds(
      L.latLngBounds([
        map.current.unproject([MAP_MIN_HORIZONTAL, MAP_MAX_VERTICAL], ZOOM),
        map.current.unproject([MAP_MAX_HORIZONTAL, MAP_MIN_VERTICAL], ZOOM),
      ])
    );

    // Define the tile layers
    L.tileLayer("../tiles/{z}/{x}/{y}.png", {
      noWrap: true,
      bounds: L.latLngBounds([
        map.current.unproject([0, MAP_SIZE], ZOOM),
        map.current.unproject([MAP_SIZE, 0], ZOOM),
      ]),
      maxNativeZoom: ZOOM,
    }).addTo(map.current);
  }, [id]);

  const set = useCallback((key, value) => {
    setMarkers((prevMarkers) => {
      prevMarkers.set(key, value);

      return prevMarkers;
    });
  }, []);

  const get = useCallback((key) => markers.get(key), [markers]);

  const remove = useCallback((key) => {
    setMarkers((prevMarkers) => {
      prevMarkers.delete(key);

      return prevMarkers;
    });
  }, []);

  const clear = useCallback(() => {
    setMarkers((prevMarkers) => {
      prevMarkers.clear();

      return prevMarkers;
    });
  }, []);

  return (
    <MapContext.Provider value={{ map, markers, set, get, remove, clear }}>
      {children}
    </MapContext.Provider>
  );
}
