import L from "leaflet";
import { useCallback, useContext } from "react";
import { MapContext } from "../context";
import {
  mapCenter,
  markerIconPath,
  markerMaxHorizontal,
  markerMaxVertical,
  markerMinHorizontal,
  markerMinVertical,
  zoom,
} from "../utils";

export function useMap() {
  // State
  const { map, markers, set, get, remove, clear } = useContext(MapContext);

  const addMarker = useCallback(
    (markerRef, onClick, onMove) => {
      let coordinates = markerRef.coordinates;

      // Initializes the coordinates of the marker if they are null
      if (coordinates === null) {
        coordinates = {
          x: mapCenter,
          y: mapCenter,
        };
      }

      // Generate the marker icon
      const icon = L.icon({
        iconUrl: markerIconPath(markerRef),
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Generate the marker
      const marker = L.marker(map.current.unproject(coordinates, zoom), {
        icon,
        alt: markerRef.title,
        keyboard: false,
        draggable: true,
      })
        .on("click", () => onClick(markerRef))
        .on("moveend", () => onMove(markerRef))
        .addTo(map.current);

      // Prevents the marker from dragging outside the map bounds
      marker.on("drag", (event) => {
        const latlng = event.target.getLatLng();
        const coordinates = map.current.project(latlng, zoom);

        // Check that the marker does not go outside the horizontal limits of the map
        if (coordinates.x < markerMinHorizontal) {
          coordinates.x = markerMinHorizontal;
        } else if (coordinates.x > markerMaxHorizontal) {
          coordinates.x = markerMaxHorizontal;
        }

        // Check that the marker does not go outside the vertical limits of the map
        if (coordinates.y < markerMinVertical) {
          coordinates.y = markerMinVertical;
        } else if (coordinates.y > markerMaxVertical) {
          coordinates.y = markerMaxVertical;
        }

        marker.setLatLng(map.current.unproject(coordinates, zoom));

        onMove(markerRef);
      });

      set(markerRef.id, marker);
    },
    [map, set]
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
      const coordinates = map.current.unproject(markerRef.coordinates, zoom);

      marker.setLatLng(coordinates);

      set(markerRef.id, marker);
    },
    [map, get, set]
  );

  const moveToMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);
      const latlng = marker.getLatLng();

      map.current.panTo(latlng, { duration: 0.5 });
    },
    [map, get]
  );

  const getMarkerCoordinates = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);
      const latlng = marker.getLatLng();
      const coordinates = map.current.project(latlng, zoom);

      return coordinates;
    },
    [map, get]
  );

  const clearMap = useCallback(() => {
    markers.forEach((marker) => map.current.removeLayer(marker));
    clear();
  }, [map, markers, clear]);

  return {
    addMarker,
    removeMarker,
    moveMarker,
    moveToMarker,
    getMarkerCoordinates,
    clearMap,
  };
}
