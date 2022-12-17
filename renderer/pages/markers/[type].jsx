import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Sidebar } from "../../components/Sidebar";

const Accordion = dynamic(
  () => import("../../components/Accordion").then((module) => module.Accordion),
  {
    ssr: false,
  }
);

export default function Markers() {
  return (
    <>
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
    </>
  );
}
