import { useCallback, useContext } from "react";
import { AccordionContext } from "../../context/Accordion";
import { useMapContext } from "../../hooks/Map";

export function useAccordionContext() {
  // State
  const { setOpenMarker, isMarkerOpen } = useContext(AccordionContext);
  const {
    addMarker,
    removeMarker,
    moveMarker,
    moveToMarker,
    focusMarker,
    unfocusMarker,
    clearMap,
  } = useMapContext();

  const scrollToMarker = useCallback((marker) => {
    const element = document.getElementById("#" + marker.id);

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMarkerClick = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // Change the opacity of the selected marker
        focusMarker(marker);

        // Change the opacity of the previously selected marker
        if (prevMarker !== null) {
          // If the accordion is open and the marker was not on the map, it is removed;
          // otherwise, it resets to its original position
          if (prevMarker.id !== marker.id) {
            if (prevMarker.coordinates === null) {
              removeMarker(prevMarker);
            } else {
              moveMarker(prevMarker);
              unfocusMarker(prevMarker);
            }
          }
        }

        return marker;
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);

      // Centers the map view on the marker
      moveToMarker(marker);
    },
    [
      setOpenMarker,
      focusMarker,
      removeMarker,
      moveMarker,
      unfocusMarker,
      scrollToMarker,
      moveToMarker,
    ]
  );

  const handleMarkerMove = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // Change the opacity of the selected marker
        focusMarker(marker);

        // Change the opacity of the previously selected marker
        if (prevMarker !== null) {
          // If the accordion is open and the marker was not on the map, it is removed;
          // otherwise, it resets to its original position
          if (prevMarker.id !== marker.id) {
            if (prevMarker.coordinates === null) {
              removeMarker(prevMarker);
            } else {
              moveMarker(prevMarker);
              unfocusMarker(prevMarker);
            }
          }
        }

        return marker;
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [
      setOpenMarker,
      focusMarker,
      removeMarker,
      moveMarker,
      unfocusMarker,
      scrollToMarker,
    ]
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

          // Change the opacity of the selected marker
          focusMarker(marker);

          return marker;
        } else {
          // If the accordion is open and the marker was not on the map, it is removed;
          // otherwise, it resets to its original opacity
          if (prevMarker.coordinates === null) {
            removeMarker(prevMarker);
          } else {
            moveMarker(prevMarker);
            unfocusMarker(prevMarker);
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

            // Change the opacity of the selected marker
            focusMarker(marker);

            return marker;
          }
        }
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [
      setOpenMarker,
      addMarker,
      handleMarkerClick,
      handleMarkerMove,
      moveToMarker,
      focusMarker,
      removeMarker,
      moveMarker,
      unfocusMarker,
      scrollToMarker,
    ]
  );

  const initializeAccordion = useCallback(
    (markers) => {
      clearMap();
      setOpenMarker(null);

      markers
        .filter((marker) => marker.coordinates !== null)
        .forEach((marker) =>
          addMarker(marker, handleMarkerClick, handleMarkerMove)
        );
    },
    [clearMap, setOpenMarker, addMarker, handleMarkerClick, handleMarkerMove]
  );

  const updateMarker = useCallback(
    (newMarker) => {
      setOpenMarker(newMarker);
    },
    [setOpenMarker]
  );

  return {
    initializeAccordion,
    handleAccordionClick,
    isMarkerOpen,
    updateMarker,
  };
}
