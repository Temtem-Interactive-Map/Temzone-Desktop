import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getMarkers } from "../../../services";
import MarkerAccordion from "../../components/MarkerAccordion";
import Sidebar from "../../components/Sidebar";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

export default function Markers() {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";

  // Test
  const markers = getMarkers(type);

  return (
    <>
      {/* Sidebar menu */}
      <Sidebar />

      {/* Marker accordion */}
      <MarkerAccordion markers={markers} />

      {/* Airborne Archipelago map */}
      <Map markers={markers.filter((marker) => marker.coordinates !== null)} />
    </>
  );
}
