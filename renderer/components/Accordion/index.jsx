import { useTranslation } from "next-export-i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccordionContext } from "../../hooks/Accordion";
import { useMapContext } from "../../hooks/Map";
import { Type, getMarkers } from "../../services";
import { markerIconPath } from "../../utils";
import { Arrow } from "../Icons";
import { LandmarkMarker } from "../Marker/Landmark";
import { SaiparkMarker } from "../Marker/Saipark";
import { TemtemMarker } from "../Marker/Temtem";

export function Accordion() {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";

  // Internationalization
  const { t } = useTranslation();

  // State
  const [isLoading, setLoading] = useState(true);
  const { markers, updateMarkers, handleAccordionClick, isMarkerOpen } =
    useAccordionContext();
  const { enableMap, disableMap } = useMapContext();

  useEffect(() => {
    const types = {
      all: Object.values(Type),
      temtem: [Type.Temtem],
      landmark: [Type.Saipark, Type.Landmark],
    };

    setLoading(true);
    disableMap();
    // types[type]
    getMarkers([])
      .then((markers) => updateMarkers(markers))
      .catch((error) => toast.warn(error.message))
      .finally(() => {
        enableMap();
        setLoading(false);
      });
  }, [type, disableMap, updateMarkers, enableMap]);

  return (
    <section
      className="w-120 space-y-3 overflow-y-scroll bg-gray-700 p-3 scrollbar-hide"
      onDragStart={(event) => event.preventDefault()}
    >
      {isLoading
        ? /* Placeholder markers */
          [...Array(10).keys()].map((key) => (
            <div key={key} className="rounded-lg bg-gray-800 shadow">
              <div className="flex w-full animate-pulse items-center space-x-3 p-4">
                <div>
                  <div className="h-12 w-12 rounded-md bg-gray-700" />
                </div>
                <div className="flex flex-col space-y-2.5">
                  <div className="h-3 w-24 rounded-md bg-gray-700" />
                  <div className="h-3 w-36 rounded-md bg-gray-700" />
                </div>
              </div>
            </div>
          ))
        : markers.map((marker) => (
            <div
              key={marker.id}
              id={"#" + marker.id}
              className="rounded-lg bg-gray-800 font-medium text-gray-100 shadow"
            >
              <button
                tabIndex={-1}
                className="flex w-full items-center space-x-3 p-4 active:translate-y-px"
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
                <div className="flex w-full flex-col text-start">
                  <span className="text-xl font-bold leading-tight">
                    {marker.title.split(" ")[0]}
                  </span>
                  <span className="text-lg leading-tight text-gray-300">
                    {typeof marker.subtitle === "string"
                      ? marker.subtitle
                      : marker.subtitle?.current ?? t("location_template")}
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
