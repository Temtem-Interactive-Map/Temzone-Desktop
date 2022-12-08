import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import {
  mapCenter,
  mapMaxHorizontal,
  mapMaxVertical,
  mapMinHorizontal,
  mapMinVertical,
  mapSize,
  markerIcon,
  zoom,
} from "../../utils";

export default function Map({ markers }) {
  // State
  const map = useRef();
  const [markersLayer, setMarkerLayer] = useState(null);

  // Map initialization
  useEffect(() => {
    if (map.current) map.current.remove();

    // Generate the map
    map.current = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: 3,
      maxZoom: zoom,
      zoomControl: false,
      keyboard: false,
      preferCanvas: true,
      maxBoundsViscosity: 1.0,
      attributionControl: false,
    });

    // Define the coordinates and the initial zoom of the map
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

    const layer = L.layerGroup().addTo(map.current);
    setMarkerLayer(layer);
  }, []);

  // Load markers
  useEffect(() => {
    if (markersLayer === null) return;

    markersLayer.clearLayers();

    markers.forEach((marker) => {
      const icon = L.icon({
        iconUrl: markerIcon(marker),
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker(
        map.current.unproject(
          [marker.coordinates.x, marker.coordinates.y],
          zoom
        ),
        {
          icon,
          draggable: true,
        }
      )
        .addTo(markersLayer)
        .on("click", (e) => {
          map.current.flyTo(e.latlng, zoom, {
            duration: 0.5,
          });
        });
    });
  }, [markersLayer, markers]);

  return (
    <div id="map" className="flex-grow" style={{ background: "#001e3c" }} />
  );
}
