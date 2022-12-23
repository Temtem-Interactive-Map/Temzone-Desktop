import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Sidebar } from "../../components/Sidebar";
import { MarkersProvider } from "../../context/Markers";

const MapProvider = dynamic(
  () => import("../../context/Map").then((module) => module.MapProvider),
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

  return (
    <MapProvider id="airborne_archipelago">
      <MarkersProvider type={type}>
        {/* Sidebar menu */}
        <Sidebar />

        {/* Markers accordion */}
        <Accordion />

        {/* Airborne Archipelago map */}
        <div
          id="airborne_archipelago"
          className="flex-grow"
          style={{ background: "#001e3c" }}
        />
      </MarkersProvider>
    </MapProvider>
  );
}
