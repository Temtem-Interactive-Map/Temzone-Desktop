import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContext } from "../../context/Accordion";
import { useMapContext } from "../../hooks/Map";

export function useAccordionContext() {
  // State
  const { markers, openMarker, setOpenMarker } = useContext(AccordionContext);
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

    element.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const resetMarkerForm = useCallback(
    (marker) => {
      // Reset the marker form state
      reset();

      // If the marker was not on the map, it is removed; otherwise, it resets
      // to its original position
      if (marker.coordinates === null) {
        removeMarker(marker);
      } else {
        moveMarker(marker);
        unfocusMarker(marker);
      }
    },
    [reset, removeMarker, moveMarker, unfocusMarker]
  );

  const handleMarkerDrag = useCallback(
    (marker, _) => {
      setOpenMarker((prevOpenMarker) => {
        // Change the opacity of the selected marker
        focusMarker(marker);

        // If the accordion is open, the marker and the form are reset to
        // their original state
        if (prevOpenMarker !== null && prevOpenMarker.id !== marker.id) {
          resetMarkerForm(prevOpenMarker);
        }

        return marker;
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [setOpenMarker, focusMarker, resetMarkerForm, scrollToMarker]
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

  const closeAccordion = useCallback(() => {
    setOpenMarker(null);
  }, [setOpenMarker]);

  const updateAccordion = useCallback(
    (newMarkers) => {
      // Add the markers to the map and update the coordinates of those
      // that have already been added
      newMarkers.forEach((newMarker) => {
        if (markers.current.some((marker) => marker.id === newMarker.id)) {
          if (openMarker?.id !== newMarker.id) {
            moveMarker(newMarker);
          }
        } else {
          addMarker(newMarker);
          subscribeMarkerClick(newMarker, handleMarkerClick);
          subscribeMarkerDrag(newMarker, handleMarkerDrag);
        }
      });

      // Remove the markers from the map that are not in the new list
      markers.current.forEach((prevMarker) => {
        if (!newMarkers.some((marker) => marker.id === prevMarker.id)) {
          removeMarker(prevMarker);

          // If the accordion is open, the marker and the form are reset
          // to their original state
          if (openMarker?.id === prevMarker.id) {
            setOpenMarker(null);
            resetMarkerForm(openMarker);
          }
        }
      });

      markers.current = newMarkers;
    },
    [
      markers,
      openMarker,
      moveMarker,
      addMarker,
      subscribeMarkerClick,
      handleMarkerClick,
      subscribeMarkerDrag,
      handleMarkerDrag,
      removeMarker,
      setOpenMarker,
      resetMarkerForm,
    ]
  );

  const handleAccordionClick = useCallback(
    (marker) => {
      setOpenMarker((prevOpenMarker) => {
        // If the previous marker is null, the accordion is closed
        if (prevOpenMarker === null) {
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
          if (prevOpenMarker.coordinates === null) {
            removeMarker(prevOpenMarker);
          } else {
            moveMarker(prevOpenMarker);
            unfocusMarker(prevOpenMarker);
          }

          // It checks if the accordion is changing to show a new marker or not
          if (prevOpenMarker.id === marker.id) {
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

  const updateMarker = useCallback(
    (newMarker) => {
      setOpenMarker(newMarker);

      markers.current = markers.current.map((prevMarker) =>
        prevMarker.id === newMarker.id ? newMarker : prevMarker
      );
    },
    [setOpenMarker, markers]
  );

  return {
    closeAccordion,
    updateAccordion,
    handleAccordionClick,
    isMarkerOpen,
    updateMarker,
  };
}
