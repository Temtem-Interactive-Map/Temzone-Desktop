import Image from "next/image";
import { useState } from "react";
import { markerIcon } from "../../utils";
import { Arrow } from "../Icons";
import LandmarkMarker from "./landmark";
import SaiparkMarker from "./saipark";
import TemtemMarker from "./temtem";

export default function MarkerAccordion({ markers }) {
  // State
  const [openMarker, setOpenMarker] = useState(null);

  return (
    <section
      className="w-96 space-y-3 overflow-y-scroll bg-gray-700 p-3 scrollbar-hide xl:w-192"
      onDragStart={(e) => e.preventDefault()}
    >
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="rounded-lg bg-gray-800 font-medium text-gray-100 shadow"
        >
          <button
            tabIndex={-1}
            className="flex w-full items-center space-x-3 rounded-lg p-4 active:translate-y-px"
            onClick={() =>
              setOpenMarker(openMarker === marker.id ? null : marker.id)
            }
          >
            {/* Marker portrait */}
            <div className="relative">
              <Image
                src={markerIcon(marker)}
                alt={marker.title}
                width={48}
                height={48}
                quality={100}
                className="h-full w-full"
              />

              {/* Notification that the marker has not been added to the map */}
              {marker.coordinates === null && (
                <div
                  className={
                    (marker.type === "temtem" ? "-top-1" : "top-0") +
                    " absolute -right-1"
                  }
                >
                  <div className="absolute h-3 w-3 animate-ping rounded-full bg-gray-100 opacity-75" />
                  <div className="h-3 w-3 rounded-full bg-gray-100" />
                </div>
              )}
            </div>

            {/* Marker information */}
            <div className="flex w-full flex-col text-start">
              <span className="text-xl font-bold leading-tight tracking-tight">
                {marker.title}
              </span>
              <span className="text-lg leading-tight tracking-tight">
                {marker.subtitle}
              </span>
            </div>

            {/* Toogle marker form */}
            <Arrow
              className={
                (openMarker === marker.id && "-rotate-180") +
                " h-10 w-10 justify-start transition duration-200"
              }
            />
          </button>

          {/* Marker form */}
          {openMarker === marker.id && (
            <div className="p-4 pt-1">
              {marker.type === "temtem" ? (
                <TemtemMarker marker={marker} />
              ) : marker.type === "saipark" ? (
                <SaiparkMarker marker={marker} />
              ) : marker.type === "landmark" ? (
                <LandmarkMarker marker={marker} />
              ) : null}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
