import { AccordionContext } from "context/Accordion";
import { useMap } from "hooks/Map";
import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";

export function useAccordion() {
  // Context
  const { reset } = useFormContext();
  const { markers, setMarkers, openMarker, setOpenMarker } =
    useContext(AccordionContext);

  // State
  const {
    addMarker,
    removeMarker,
    moveMarker,
    moveToMarker,
    focusMarker,
    unfocusMarker,
    subscribeMarkerClick,
    subscribeMarkerDrag,
    enableMap,
    disableMap,
  } = useMap();

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
    disableMap();

    setOpenMarker((prevOpenMarker) => {
      if (prevOpenMarker !== null) {
        resetMarkerForm(prevOpenMarker);
      }

      return null;
    });
  }, [disableMap, setOpenMarker, resetMarkerForm]);

  const updateAccordion = useCallback(
    (newMarkers) => {
      setMarkers((prevMarkers) => {
        const newMarkersWithCoordinates = newMarkers.filter(
          (marker) => marker.coordinates !== null
        );
        const prevMarkersWithCoordinates = prevMarkers.filter(
          (marker) => marker.coordinates !== null
        );

        newMarkersWithCoordinates.forEach((newMarker) => {
          const someMarker = prevMarkersWithCoordinates.some(
            (marker) => marker.id === newMarker.id
          );

          // Add the markers to the map and update the coordinates of those
          // that have already been added
          if (someMarker) {
            moveMarker(newMarker);
          } else {
            addMarker(newMarker);
            subscribeMarkerClick(newMarker, handleMarkerClick);
            subscribeMarkerDrag(newMarker, handleMarkerDrag);
          }
        });

        prevMarkersWithCoordinates.forEach((prevMarker) => {
          const someMarker = !newMarkersWithCoordinates.some(
            (marker) => marker.id === prevMarker.id
          );

          // Remove the markers from the map that are not in the new list
          if (someMarker) {
            removeMarker(prevMarker);
          }
        });

        return newMarkers;
      });

      enableMap();
    },
    [
      setMarkers,
      moveMarker,
      addMarker,
      subscribeMarkerClick,
      handleMarkerClick,
      subscribeMarkerDrag,
      handleMarkerDrag,
      removeMarker,
      enableMap,
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
      setMarkers((prevMarkers) =>
        prevMarkers.map((prevMarker) =>
          prevMarker.id === newMarker.id ? newMarker : prevMarker
        )
      );
    },
    [setOpenMarker, setMarkers]
  );

  return {
    markers,
    closeAccordion,
    updateAccordion,
    handleAccordionClick,
    isMarkerOpen,
    updateMarker,
  };
}
