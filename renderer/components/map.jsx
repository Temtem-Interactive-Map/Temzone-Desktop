import L from "leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";

const zoom = 6;
const tileSize = 256;
const mapSize = tileSize * Math.pow(2, zoom);
const mapMinHorizontal = tileSize * 7;
const mapMaxHorizontal = mapSize - tileSize * 7;
const mapMinVertical = tileSize * 11;
const mapMaxVertical = mapSize - tileSize * 11;
const mapCenter = mapSize / 2;

export default function Map() {
  useEffect(() => {
    const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: 3,
      maxZoom: zoom,
      zoomControl: false,
      keyboard: false,
      preferCanvas: true,
      maxBoundsViscosity: 0.8,
      attributionControl: false,
    });

    map.setView(map.unproject([mapCenter, mapCenter], zoom), 3);
    map.setMaxBounds(
      L.latLngBounds([
        map.unproject([mapMinHorizontal, mapMaxVertical], zoom),
        map.unproject([mapMaxHorizontal, mapMinVertical], zoom),
      ])
    );

    L.tileLayer("tiles/{z}/{x}/{y}.png", {
      noWrap: true,
      bounds: L.latLngBounds([
        map.unproject([0, mapSize], zoom),
        map.unproject([mapSize, 0], zoom),
      ]),
      maxNativeZoom: zoom,
    }).addTo(map);

    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);
  }, []);

  return <div id="map" className="h-full w-full bg-[#20293C]" />;
}
