import L from "leaflet";
import { useEffect, useRef } from "react";
import {
  mapCenter,
  mapMaxHorizontal,
  mapMaxVertical,
  mapMinHorizontal,
  mapMinVertical,
  mapSize,
  markerIconPath,
  zoom,
} from "../../utils";
import { useHashMap } from "../HashMap";

export function useMap() {
  const map = useRef();
  const [markers, actions] = useHashMap();

  // Initialize the map
  useEffect(() => {
    if (map.current) map.current.remove();

    // Generate the map
    map.current = L.map("airborne_archipelago", {
      crs: L.CRS.Simple,
      minZoom: 3,
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
  }, []);

  function addMarker(markerRef, handler) {
    const icon = L.icon({
      iconUrl: markerIconPath(markerRef),
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const marker = L.marker(
      map.current.unproject(
        [markerRef.coordinates.x, markerRef.coordinates.y],
        zoom
      ),
      {
        icon,
        alt: markerRef.title,
        keyboard: false,
        draggable: true,
      }
    )
      .on("click", (event) => {
        const latlng = event.latlng;

        map.current.panTo([latlng.lat, latlng.lng], { duration: 0.5 });

        handler(markerRef.id);
      })
      .on("moveend", (event) => {
        const latlng = event.target.getLatLng();

        map.current.panTo([latlng.lat, latlng.lng], { duration: 0.5 });

        handler(markerRef.id);
      })
      .addTo(map.current);

    actions.set(markerRef.id, marker);
  }

  function removeMarker(markerRef) {
    const marker = markers.get(markerRef.id);

    map.current.removeLayer(marker);

    actions.remove(markerRef.id);
  }

  function moveMarker(markerRef) {
    const marker = markers.get(markerRef.id);
    const coordinates = map.current.unproject(
      [markerRef.coordinates.x, markerRef.coordinates.y],
      zoom
    );

    marker.setLatLng(coordinates);

    actions.set(markerRef.id, marker);
  }

  // Moves the map to a given coordinates
  function moveTo(x, y) {
    const coordinates = map.current.unproject([x, y], zoom);

    map.current.panTo([coordinates.lat, coordinates.lng], { duration: 0.5 });
  }

  return { addMarker, removeMarker, moveMarker, moveTo };
}
