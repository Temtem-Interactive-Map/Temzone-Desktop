import L from "leaflet";
import { useCallback, useContext } from "react";
import { MapContext } from "../context";
import { mapCenter, markerIconPath, zoom } from "../utils";

export function useMap() {
  // State
  const { map, markers, set, get, remove, clear } = useContext(MapContext);

  const addMarker = useCallback(
    (markerRef, handler) => {
      let coordinates = markerRef.coordinates;

      if (coordinates === null) {
        coordinates = {
          x: mapCenter,
          y: mapCenter,
        };
      }

      const icon = L.icon({
        iconUrl: markerIconPath(markerRef),
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(
        map.current.unproject([coordinates.x, coordinates.y], zoom),
        {
          icon,
          alt: markerRef.title,
          keyboard: false,
          draggable: true,
        }
      )
        .on("click", () => handler(markerRef))
        .on("moveend", () => handler(markerRef))
        .addTo(map.current);

      set(markerRef.id, marker);
    },
    [map, set]
  );

  const getMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);
      const latlng = marker.getLatLng();
      const coordinates = map.current.project(latlng, zoom);

      return coordinates;
    },
    [map, get]
  );

  const removeMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);

      map.current.removeLayer(marker);

      remove(markerRef.id);
    },
    [map, get, remove]
  );

  const moveMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);
      const coordinates = map.current.unproject(
        [markerRef.coordinates.x, markerRef.coordinates.y],
        zoom
      );

      marker.setLatLng(coordinates);

      set(markerRef.id, marker);
    },
    [map, get, set]
  );

  const clearMap = useCallback(() => {
    markers.forEach((marker) => map.current.removeLayer(marker));
    clear();
  }, [map, markers, clear]);

  const moveToMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);
      const latlng = marker.getLatLng();

      map.current.panTo(latlng, { duration: 0.5 });
    },
    [map, get]
  );

  return {
    addMarker,
    getMarker,
    removeMarker,
    moveMarker,
    moveToMarker,
    clearMap,
  };
}
