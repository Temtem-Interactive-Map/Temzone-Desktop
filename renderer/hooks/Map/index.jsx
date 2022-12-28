import L from "leaflet";
import { useCallback, useContext } from "react";
import { MapContext } from "../../context/Map";
import {
  MAP_CENTER,
  MARKER_MAX_HORIZONTAL,
  MARKER_MAX_VERTICAL,
  MARKER_MIN_HORIZONTAL,
  MARKER_MIN_VERTICAL,
  MARKER_OPACITY,
  ZOOM,
  markerIconPath,
} from "../../utils";

export function useMapContext() {
  // State
  const { map, markers, set, get, remove, clear } = useContext(MapContext);

  const addMarker = useCallback(
    (markerRef, onClick, onMove) => {
      let coordinates = markerRef.coordinates;

      // Initializes the coordinates of the marker if they are null
      if (coordinates === null) {
        coordinates = {
          x: MAP_CENTER,
          y: MAP_CENTER,
        };
      }

      // Generate the marker icon
      const icon = L.icon({
        iconUrl: markerIconPath(markerRef),
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Generate the marker
      const marker = L.marker(map.current.unproject(coordinates, ZOOM), {
        icon,
        alt: markerRef.title,
        opacity: MARKER_OPACITY,
        keyboard: false,
        draggable: true,
      })
        .on("click", () => onClick(markerRef))
        // Prevents the marker from dragging outside the map bounds
        .on("drag", (event) => {
          const marker = event.target;
          const latlng = marker.getLatLng();
          const coordinates = map.current.project(latlng, ZOOM);

          // Check that the marker does not go outside the horizontal limits of the map
          if (coordinates.x < MARKER_MIN_HORIZONTAL) {
            coordinates.x = MARKER_MIN_HORIZONTAL;
          } else if (coordinates.x > MARKER_MAX_HORIZONTAL) {
            coordinates.x = MARKER_MAX_HORIZONTAL;
          }

          // Check that the marker does not go outside the vertical limits of the map
          if (coordinates.y < MARKER_MIN_VERTICAL) {
            coordinates.y = MARKER_MIN_VERTICAL;
          } else if (coordinates.y > MARKER_MAX_VERTICAL) {
            coordinates.y = MARKER_MAX_VERTICAL;
          }

          marker.setLatLng(map.current.unproject(coordinates, ZOOM));

          onMove(markerRef);
        })
        .addTo(map.current);

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
      const coordinates = map.current.unproject(markerRef.coordinates, ZOOM);

      marker.setLatLng(coordinates);
    },
    [map, get]
  );

  const focusMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);

      marker.setOpacity(1);
    },
    [get]
  );

  const unfocusMarker = useCallback(
    (markerRef) => {
      const marker = get(markerRef.id);

      marker.setOpacity(MARKER_OPACITY);
    },
    [get]
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
      const coordinates = map.current.project(latlng, ZOOM);

      return coordinates;
    },
    [map, get]
  );

  const onMarkerDrag = useCallback(
    (markerRef, onDrag) => {
      const marker = get(markerRef.id);

      marker.on("drag", (event) => {
        const marker = event.target;
        const latlng = marker.getLatLng();
        const coordinates = map.current.project(latlng, ZOOM);

        onDrag(coordinates);
      });
    },
    [get, map]
  );

  const clearMap = useCallback(() => {
    markers.forEach((marker) => map.current.removeLayer(marker));
    clear();
  }, [map, markers, clear]);

  return {
    addMarker,
    removeMarker,
    moveMarker,
    focusMarker,
    unfocusMarker,
    moveToMarker,
    getMarkerCoordinates,
    onMarkerDrag,
    clearMap,
  };
}
