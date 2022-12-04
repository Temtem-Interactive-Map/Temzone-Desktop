import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const zoom = 6;
const tileSize = 256;
const mapSize = tileSize * Math.pow(2, zoom);
const mapMinHorizontal = tileSize * 7;
const mapMaxHorizontal = mapSize - tileSize * 7;
const mapMinVertical = tileSize * 11;
const mapMaxVertical = mapSize - tileSize * 11;
const mapCenter = mapSize / 2;

function iconMarker(type) {
  switch (type) {
    case "temtem":
      return "../images/temcard_icon.png";
    case "saipark":
      return "../images/key_icon.png";
    case "landmark":
      return "../images/landmark_icon.png";
  }
}

export default function Map({ markers }) {
  // State
  const map = useRef();
  const [markersLayer, setMarkerLayer] = useState(null);

  // Map initialization
  useEffect(() => {
    // Avoid regenerating the map during development when a reload is performed
    if (map.current) return;

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

  // Markers loading
  useEffect(() => {
    if (markersLayer === null) return;

    markersLayer.clearLayers();

    markers.forEach((marker) => {
      const icon = L.icon({
        iconUrl: iconMarker(marker.type),
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker(map.current.unproject(marker.coordinates, zoom), {
        icon,
        draggable: true,
      })
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
