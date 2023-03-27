import L from "leaflet";
import { createContext, useLayoutEffect, useRef } from "react";
import {
  MAP_CENTER,
  MAP_MAX_HORIZONTAL,
  MAP_MAX_VERTICAL,
  MAP_MIN_HORIZONTAL,
  MAP_MIN_VERTICAL,
  MAP_SIZE,
  ZOOM,
} from "utils";

export const MapContext = createContext();

export function MapProvider({ children }) {
  // State
  const map = useRef();
  const markers = useRef(new Map());

  useLayoutEffect(() => {
    if (map.current) map.current.remove();

    // Generate the map
    map.current = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: 4,
      maxZoom: ZOOM,
      boxZoom: false,
      zoomControl: false,
      maxBoundsViscosity: 1.0,
      keyboard: false,
      preferCanvas: true,
      attributionControl: false,
    });

    // Define the map tile layers
    L.tileLayer("../tiles/{z}/{x}/{y}.png", {
      noWrap: true,
      bounds: L.latLngBounds([
        map.current.unproject([0, MAP_SIZE], ZOOM),
        map.current.unproject([MAP_SIZE, 0], ZOOM),
      ]),
      maxNativeZoom: ZOOM,
    }).addTo(map.current);

    // Define the map bounds (tiles that have no content are not displayed)
    map.current.setMaxBounds(
      L.latLngBounds([
        map.current.unproject([MAP_MIN_HORIZONTAL, MAP_MAX_VERTICAL], ZOOM),
        map.current.unproject([MAP_MAX_HORIZONTAL, MAP_MIN_VERTICAL], ZOOM),
      ])
    );

    // Define the initial coordinates and the initial zoom of the map
    map.current.setView(
      map.current.unproject([MAP_CENTER, MAP_CENTER], ZOOM),
      4
    );

    // Generate the minimap
    const minimap = L.map("minimap", {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 0,
      boxZoom: false,
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      keyboard: false,
      preferCanvas: true,
      attributionControl: false,
    });

    // Define the minimap tile layers
    L.tileLayer("../tiles/{z}/{x}/{y}.png", {
      noWrap: true,
      bounds: L.latLngBounds([
        minimap.unproject([0, MAP_SIZE], ZOOM),
        minimap.unproject([MAP_SIZE, 0], ZOOM),
      ]),
      maxNativeZoom: ZOOM,
    }).addTo(minimap);

    // Define the minimap bounds (tiles that have no content are not displayed)
    minimap.setMaxBounds(
      L.latLngBounds([
        minimap.unproject(
          [MAP_MIN_HORIZONTAL + 64, MAP_MAX_VERTICAL - 64],
          ZOOM
        ),
        minimap.unproject(
          [MAP_MAX_HORIZONTAL - 64, MAP_MIN_VERTICAL + 64],
          ZOOM
        ),
      ])
    );

    // Define the initial coordinates and the initial zoom of the minimap
    minimap.setView(minimap.unproject([MAP_CENTER, MAP_CENTER], ZOOM), 0);

    // Define the minimap rectangle bounds
    const rectangle = L.rectangle(map.current.getBounds(), {
      color: "#60a5fa",
      weight: 1,
    }).addTo(minimap);

    // Update the map view when the minimap is clicked
    minimap.on("click", (event) => {
      map.current.setView(event.latlng);
    });

    // Update the minimap view and rectangle bounds when the map is moved
    map.current.on("move", () => {
      const bounds = map.current.getBounds();

      rectangle.setBounds(bounds);
      minimap.setView(map.current.getCenter(), 0);
    });

    // Fix the map size on the first render
    setTimeout(() => {
      map.current.invalidateSize();
    }, 200);
  }, []);

  return (
    <MapContext.Provider value={{ map, markers }}>
      {children}
    </MapContext.Provider>
  );
}
