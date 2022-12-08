import { useTranslation } from "next-export-i18n";
import Image from "next/image";
import { useState } from "react";
import { markerIcon } from "../../utils";
import { Arrow } from "../Icons";
import LandmarkMarker from "./landmark";
import SaiparkMarker from "./saipark";
import TemtemMarker from "./temtem";

export default function MarkerAccordion({ markers }) {
  // Internationalization
  const { t } = useTranslation();
  // State
  const [closedMarkers, setClosedMarkers] = useState([]);

  function toogleMarker(markerId) {
    setClosedMarkers((closedMarkers) =>
      closedMarkers.includes(markerId)
        ? closedMarkers.filter((id) => id !== markerId)
        : [...closedMarkers, markerId]
    );
  }

  function markerType(marker) {
    switch (marker.type) {
      case "temtem":
        return <TemtemMarker marker={marker} />;
      case "saipark":
        return <SaiparkMarker marker={marker} />;
      case "landmark":
        return <LandmarkMarker marker={marker} />;
    }
  }

  return (
    <section
      className="xl:w-192 w-96 space-y-3 overflow-y-scroll bg-gray-800 p-3 scrollbar-hide"
      onDragStart={(e) => e.preventDefault()}
    >
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="bg-gray-700font-medium rounded-lg bg-gray-700 text-gray-300 shadow"
        >
          <button
            className="flex w-full items-center justify-center space-x-3 p-4"
            onClick={() => toogleMarker(marker.id)}
          >
            <Image
              src={markerIcon(marker)}
              alt={t("marker_icon")}
              width={48}
              height={48}
              quality={100}
              priority={true}
            />
            <div className="flex w-full flex-col text-start">
              <span className="text-xl font-bold leading-tight tracking-tight">
                {marker.title}
              </span>
              <span className="text-lg leading-tight tracking-tight">
                {marker.subtitle}
              </span>
            </div>
            <Arrow
              className={
                (closedMarkers.includes(marker.id) && "-rotate-180") +
                " h-8 w-8 justify-start transition duration-200"
              }
            />
          </button>

          {/* Marker form */}
          {closedMarkers.includes(marker.id) && (
            <div className="p-4 pt-1">{markerType(marker)}</div>
          )}
        </div>
      ))}
    </section>
  );
}
