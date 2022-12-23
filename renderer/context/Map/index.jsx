import L from "leaflet";
import {
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  mapCenter,
  mapMaxHorizontal,
  mapMaxVertical,
  mapMinHorizontal,
  mapMinVertical,
  mapSize,
  zoom,
} from "../../utils";

export const MapContext = createContext();

export function MapProvider({ id, children }) {
  // State
  const map = useRef();
  const [markers, setMarkers] = useState(new Map());

  useLayoutEffect(() => {
    if (map.current) map.current.remove();

    // Generate the map
    map.current = L.map(id, {
      crs: L.CRS.Simple,
      minZoom: 4,
      maxZoom: zoom,
      zoomControl: false,
      maxBoundsViscosity: 1.0,
      keyboard: false,
      preferCanvas: true,
      attributionControl: false,
    });

    // Define the initial coordinates and the initial zoom of the map
    map.current.setView(map.current.unproject([mapCenter, mapCenter], zoom), 3);

    // Define the map bounds (areas of the map that have no content are not displayed)
    map.current.setMaxBounds(
      L.latLngBounds([
        map.current.unproject([mapMinHorizontal, mapMaxVertical], zoom),
        map.current.unproject([mapMaxHorizontal, mapMinVertical], zoom),
      ])
    );

    // Define the tile layers
    L.tileLayer("../tiles/{z}/{x}/{y}.png", {
      noWrap: true,
      bounds: L.latLngBounds([
        map.current.unproject([0, mapSize], zoom),
        map.current.unproject([mapSize, 0], zoom),
      ]),
      maxNativeZoom: zoom,
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
