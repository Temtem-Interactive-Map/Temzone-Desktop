import { AccordionProvider } from "context/Accordion";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapProvider = dynamic(
  () => import("context/Map").then((module) => module.MapProvider),
  {
    ssr: false,
  }
);

const Accordion = dynamic(
  () => import("components/Accordion").then((module) => module.Accordion),
  {
    ssr: false,
  }
);

export default function Markers() {
  return (
    <MapProvider>
      <AccordionProvider>
        {/* Markers accordion */}
        <Accordion />

        {/* Airborne Archipelago map */}
        <div id="map" className="flex-grow">
          <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar">
              <div id="minimap" className="h-32 w-32 cursor-pointer" />
            </div>
          </div>
        </div>
      </AccordionProvider>
    </MapProvider>
  );
}
