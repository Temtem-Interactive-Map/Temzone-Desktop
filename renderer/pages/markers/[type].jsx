import { Sidebar } from "components/Sidebar";
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
    <MapProvider id="airborne_archipelago">
      {/* Sidebar menu */}
      <Sidebar />

      {/* Markers accordion */}
      <AccordionProvider>
        <Accordion />
      </AccordionProvider>

      {/* Airborne Archipelago map */}
      <div id="airborne_archipelago" className="flex-grow" />
    </MapProvider>
  );
}
