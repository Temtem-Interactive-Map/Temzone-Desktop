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
  const { map, markers } = useContext(MapContext);

  const addMarker = useCallback(
    (markerRef) => {
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
      const latlng = map.current.unproject(coordinates, ZOOM);
      const marker = L.marker(latlng, {
        icon,
        alt: markerRef.title,
        opacity: MARKER_OPACITY,
        keyboard: false,
        draggable: true,
      })
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
        })
        .addTo(map.current);

      markers.current.set(markerRef.id, marker);
    },
    [map, markers]
  );

  const removeMarker = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);

      map.current.removeLayer(marker);
      markers.current.delete(markerRef.id);
    },
    [map, markers]
  );

  const moveMarker = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);
      const coordinates = map.current.unproject(markerRef.coordinates, ZOOM);

      marker.setLatLng(coordinates);
    },
    [map, markers]
  );

  const focusMarker = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);

      marker.setOpacity(1);
    },
    [markers]
  );

  const unfocusMarker = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);

      marker.setOpacity(MARKER_OPACITY);
    },
    [markers]
  );

  const moveToMarker = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);
      const latlng = marker.getLatLng();

      map.current.panTo(latlng, { duration: 0.5 });
    },
    [map, markers]
  );

  const getMarkerCoordinates = useCallback(
    (markerRef) => {
      const marker = markers.current.get(markerRef.id);
      const latlng = marker.getLatLng();
      const coordinates = map.current.project(latlng, ZOOM);

      return coordinates;
    },
    [map, markers]
  );

  const subscribeMarkerClick = useCallback(
    (markerRef, onClick) => {
      const marker = markers.current.get(markerRef.id);

      marker.on("click", () => {
        if (marker.dragging.enabled()) {
          onClick(markerRef);
        }
      });
    },
    [markers]
  );

  const subscribeMarkerDrag = useCallback(
    (markerRef, onDrag) => {
      const marker = markers.current.get(markerRef.id);

      marker.on("drag", (event) => {
        const marker = event.target;
        const latlng = marker.getLatLng();
        const coordinates = map.current.project(latlng, ZOOM);

        onDrag(markerRef, coordinates);
      });
    },
    [map, markers]
  );

  const enableMap = useCallback(() => {
    map.current.dragging.enable();
    map.current.touchZoom.enable();
    map.current.doubleClickZoom.enable();
    map.current.scrollWheelZoom.enable();

    markers.current.forEach((marker) => {
      marker.dragging.enable();
    });
  }, [map, markers]);

  const disableMap = useCallback(() => {
    if (map.current === undefined) return;

    map.current.dragging.disable();
    map.current.touchZoom.disable();
    map.current.doubleClickZoom.disable();
    map.current.scrollWheelZoom.disable();

    markers.current.forEach((marker) => {
      marker.dragging.disable();
      marker.setOpacity(MARKER_OPACITY);
    });
  }, [map, markers]);

  return {
    addMarker,
    removeMarker,
    moveMarker,
    focusMarker,
    unfocusMarker,
    moveToMarker,
    getMarkerCoordinates,
    subscribeMarkerClick,
    subscribeMarkerDrag,
    enableMap,
    disableMap,
  };
}
