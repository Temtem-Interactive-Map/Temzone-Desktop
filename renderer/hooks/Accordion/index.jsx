import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContext } from "../../context/Accordion";
import { useMapContext } from "../../hooks/Map";

export function useAccordionContext() {
  // State
  const { openMarker, setOpenMarker } = useContext(AccordionContext);
  const { reset } = useFormContext();
  const {
    addMarker,
    removeMarker,
    moveMarker,
    moveToMarker,
    focusMarker,
    unfocusMarker,
    subscribeMarkerClick,
    subscribeMarkerDrag,
  } = useMapContext();

  const scrollToMarker = useCallback((marker) => {
    const element = document.getElementById("#" + marker.id);

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMarkerDrag = useCallback(
    (marker, _) => {
      setOpenMarker((prevMarker) => {
        // Change the opacity of the selected marker
        focusMarker(marker);

        // If the accordion is open change the opacity of the previously selected marker
        if (prevMarker !== null && prevMarker.id !== marker.id) {
          // Reset the marker form state
          reset();

          // If the marker was not on the map, it is removed; otherwise, it resets to
          // its original position
          if (prevMarker.coordinates === null) {
            removeMarker(prevMarker);
          } else {
            moveMarker(prevMarker);
            unfocusMarker(prevMarker);
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
      reset,
    ]
  );

  const handleMarkerClick = useCallback(
    (marker) => {
      // Handles dragging of the marker on the accordion
      handleMarkerDrag(marker);

      // Centers the map view on the marker
      moveToMarker(marker);
    },
    [handleMarkerDrag, moveToMarker]
  );

  const handleAccordionClick = useCallback(
    (marker) => {
      setOpenMarker((prevMarker) => {
        // If the previous marker is null, the accordion is closed
        if (prevMarker === null) {
          // If the coordinates of the marker are null, it means that it has not been
          // added to the map
          if (marker.coordinates === null) {
            addMarker(marker);
            subscribeMarkerClick(marker, handleMarkerClick);
            subscribeMarkerDrag(marker, handleMarkerDrag);
          }

          // Reset the marker form state
          reset();

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
              addMarker(marker);
              subscribeMarkerClick(marker, handleMarkerClick);
              subscribeMarkerDrag(marker, handleMarkerDrag);
            }

            // Reset the form state
            reset();

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
      subscribeMarkerClick,
      handleMarkerClick,
      subscribeMarkerDrag,
      handleMarkerDrag,
      reset,
      moveToMarker,
      focusMarker,
      removeMarker,
      moveMarker,
      unfocusMarker,
      scrollToMarker,
    ]
  );

  const isMarkerOpen = useCallback(
    (marker) => openMarker?.id === marker.id,
    [openMarker]
  );

  return {
    handleMarkerDrag,
    handleMarkerClick,
    handleAccordionClick,
    isMarkerOpen,
    setOpenMarker,
  };
}
