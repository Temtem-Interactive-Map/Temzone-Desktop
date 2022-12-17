import { useTranslation } from "next-export-i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMap } from "../../hooks/Map";
import { getMarkers } from "../../services";
import { mapCenter, markerIconPath } from "../../utils";
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
  const [openId, setOpenId] = useState(null);

  function toogle(id, force) {
    const element = document.getElementById("#" + id);

    element.scrollIntoView({ behavior: "smooth" });

    setOpenId((prev) => {
      if (prev !== null && prev !== id) {
        const marker = markers.find((marker) => marker.id === prev);

        moveMarker(marker);
      }

      return force ? id : prev === id ? null : id;
    });
  }

  function isOpen(id) {
    return openId === id;
  }

  //
  const { addMarker, removeMarker, moveMarker, moveTo } = useMap();
  // const [markers, setMarkers] = useState([]);
  const markers = getMarkers(type);

  function handleMarker(id) {
    toogle(id, true);
  }

  useEffect(() => {
    const markersRef = getMarkers(type);

    markersRef
      .filter((marker) => marker.coordinates !== null)
      .forEach((marker) => {
        addMarker(marker, handleMarker);
      });

    // setMarkers((prev) => {
    // prev.forEach((marker) => removeMarker(marker));

    // return markersRef;
    // });
  }, [type]);

  function handleAccordionClick(marker) {
    if (isOpen(marker.id)) {
      if (marker.coordinates === null) {
        removeMarker(marker);
      }
    } else {
      if (marker.coordinates === null) {
        const markerRef = { ...marker };
        markerRef.coordinates = {
          x: mapCenter,
          y: mapCenter,
        };

        addMarker(markerRef, handleMarker);
        moveTo(markerRef.coordinates.x, markerRef.coordinates.y);
      } else {
        moveTo(marker.coordinates.x, marker.coordinates.y);
      }
    }

    toogle(marker.id, false);
  }

  function loading() {
    return (
      <div className="rounded-lg bg-gray-800 shadow">
        <div className="flex w-full animate-pulse  items-center space-x-3 p-4">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-gray-700" />
          </div>
          <div className="flex flex-col space-y-2.5">
            <div className="h-3 w-24 rounded bg-gray-700" />
            <div className="h-3 w-36 rounded bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="w-96 space-y-3 overflow-y-scroll bg-gray-700 p-3 scrollbar-hide xl:w-192"
      onDragStart={(e) => e.preventDefault()}
    >
      {markers.map((marker) => (
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

              {/* Notification that the marker has not been added to the map */}
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
                {marker.title}
              </span>
              <span className="text-lg leading-tight text-gray-300">
                {marker.subtitle ?? t("location_template")}
              </span>
            </div>

            {/* Toogle marker form */}
            <Arrow
              className={
                (isOpen(marker.id) && "-rotate-180") +
                " h-10 w-10 justify-start transition duration-200"
              }
            />
          </button>

          {/* Marker form */}
          {isOpen(marker.id) && (
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
