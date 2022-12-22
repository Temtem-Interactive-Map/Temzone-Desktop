import { useTranslation } from "next-export-i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useMap } from "../../hooks";
import { getMarkers } from "../../services";
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
  const [openMarker, setOpenMarker] = useState(null);
  const markers = getMarkers(type);
  const { addMarker, removeMarker, moveMarker, moveToMarker, clearMap } =
    useMap();

  const scrollToMarker = useCallback((marker) => {
    const element = document.getElementById("#" + marker.id);

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMarkerClick = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // If the accordion is open and the marker was not on the map, it is removed;
        // otherwise, it resets to its original position
        if (prevMarker !== null && prevMarker.id !== marker.id) {
          prevMarker.coordinates === null
            ? removeMarker(prevMarker)
            : moveMarker(prevMarker);
        }

        return marker;
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);

      // Centers the map view on the marker
      moveToMarker(marker);
    },
    [removeMarker, moveMarker, scrollToMarker, moveToMarker]
  );

  const handleMarkerMove = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // If the accordion is open and the marker was not on the map, it is removed;
        // otherwise, it resets to its original position
        if (prevMarker !== null && prevMarker.id !== marker.id) {
          prevMarker.coordinates === null
            ? removeMarker(prevMarker)
            : moveMarker(prevMarker);
        }

        // A copy of the marker is returned to force refreshing the coordinates of
        // the marker in the form
        return Object.assign({}, marker);
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [removeMarker, scrollToMarker, moveMarker]
  );

  const handleAccordionClick = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // If the previous marker is null, the accordion is closed
        if (prevMarker === null) {
          // If the coordinates of the marker are null, it means that it has not been
          // added to the map
          if (marker.coordinates === null) {
            addMarker(marker, handleMarkerClick, handleMarkerMove);
          }

          // Centers the map view on the marker
          moveToMarker(marker);

          return marker;
        } else {
          // If the accordion is open, the coordinates of the marker are resets to its
          // original position if it was already on the map; otherwise, the markers is
          // removed
          if (prevMarker.coordinates === null) {
            removeMarker(prevMarker);
          } else {
            moveMarker(prevMarker);
          }

          // It checks if the accordion is changing to show a new marker or not
          if (prevMarker.id === marker.id) {
            return null;
          } else {
            // If the coordinates of the marker are null, it means that it has not been
            // added to the map
            if (marker.coordinates === null) {
              addMarker(marker, handleMarkerClick, handleMarkerMove);
            }

            // Centers the map view on the marker
            moveToMarker(marker);

            return marker;
          }
        }
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [
      addMarker,
      handleMarkerClick,
      handleMarkerMove,
      removeMarker,
      moveMarker,
      scrollToMarker,
      moveToMarker,
    ]
  );

  useEffect(() => {
    clearMap();
    setOpenMarker(null);

    const markersRef = getMarkers(type);

    markersRef
      .filter((marker) => marker.coordinates !== null)
      .forEach((marker) =>
        addMarker(marker, handleMarkerClick, handleMarkerMove)
      );
  }, [type, clearMap, addMarker, handleMarkerClick, handleMarkerMove]);

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
                {typeof marker.subtitle === "string"
                  ? marker.subtitle
                  : marker.subtitle?.current ?? t("location_template")}
              </span>
            </div>

            {/* Toogle marker form */}
            <Arrow
              className={
                (openMarker?.id === marker.id && "-rotate-180") +
                " h-10 w-10 justify-start transition duration-200"
              }
            />
          </button>

          {/* Marker form */}
          {openMarker?.id === marker.id && (
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
