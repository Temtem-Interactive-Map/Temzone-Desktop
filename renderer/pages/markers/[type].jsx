import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { getMarkers } from "../../services";

const MapProvider = dynamic(
  () => import("../../context/Map").then((module) => module.MapProvider),
  {
    ssr: false,
  }
);

const AccordionProvider = dynamic(
  () =>
    import("../../context/Accordion").then(
      (module) => module.AccordionProvider
    ),
  {
    ssr: false,
  }
);

const Accordion = dynamic(
  () => import("../../components/Accordion").then((module) => module.Accordion),
  {
    ssr: false,
  }
);

export default function Markers() {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";

  // State
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markers = getMarkers(type);

    setMarkers(markers);
  }, [type]);

  return (
    <MapProvider id="airborne_archipelago">
      {/* Sidebar menu */}
      <Sidebar />

      {/* Markers accordion */}
      <AccordionProvider markers={markers}>
        <Accordion />
      </AccordionProvider>

      {/* Airborne Archipelago map */}
      <div
        id="airborne_archipelago"
        className="flex-grow"
        style={{ background: "#001e3c" }}
      />
    </MapProvider>
  );
}
