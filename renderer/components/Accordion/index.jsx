import { Arrow } from "components/Icons";
import { SaiparkMarker } from "components/Marker/Saipark";
import { SpawnMarker } from "components/Marker/Spawn";
import { useAccordion } from "hooks/Accordion";
import Image from "next/image";
import { markerIconPath } from "utils";

export function Accordion() {
  // State
  const { markers, handleAccordionClick, isMarkerOpen } = useAccordion();

  return (
    <section
      className="w-120 space-y-3 overflow-y-scroll bg-gray-700 p-3 scrollbar-hide"
      onDragStart={(event) => event.preventDefault()}
    >
      {markers.map((marker) => (
        <div
          key={marker.id}
          id={"#" + marker.id}
          className="rounded-lg bg-gray-800 font-medium text-gray-100 shadow"
        >
          <button
            tabIndex={-1}
            className="flex w-full items-center space-x-3 p-4 outline-none active:translate-y-px"
            onClick={() => handleAccordionClick(marker)}
          >
            {/* Marker portrait */}
            <div className="relative">
              <Image
                src={markerIconPath(marker)}
                alt={marker.title}
                width={48}
                height={48}
                quality={100}
                className="h-full w-full"
              />

              {/* Ping notification (means that the marker has not been added to the map) */}
              {marker.coordinates === null && (
                <div className="absolute -right-1 -top-1">
                  <div className="absolute h-3 w-3 animate-ping rounded-full bg-gray-100 opacity-75" />
                  <div className="h-3 w-3 rounded-full bg-gray-100" />
                </div>
              )}
            </div>

            {/* Marker information */}
            <div className="flex w-full max-w-xs flex-col text-start">
              <span className="truncate text-xl font-bold leading-tight">
                {marker.title.split(" ")[0]}
              </span>
              <span className="truncate text-lg leading-tight text-gray-300">
                {marker.subtitle.current}
              </span>
            </div>

            {/* Toogle marker form */}
            <Arrow
              className={
                (isMarkerOpen(marker) && "-rotate-180") +
                " h-10 w-10 justify-start transition duration-200"
              }
            />
          </button>

          {/* Marker form */}
          {isMarkerOpen(marker) && (
            <div className="p-4 pt-1">
              {marker.type === "spawn" ? (
                <SpawnMarker marker={marker} />
              ) : marker.type === "saipark" ? (
                <SaiparkMarker marker={marker} />
              ) : null}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
