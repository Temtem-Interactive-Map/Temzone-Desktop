import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContext } from "../../context/Accordion";
import { useMapContext } from "../../hooks/Map";

export function useAccordionContext() {
  // State
  const { markers, setMarkers, openMarker, setOpenMarker } =
    useContext(AccordionContext);
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
    clearMap,
  } = useMapContext();

  const scrollToMarker = useCallback((marker) => {
    const element = document.getElementById("#" + marker.id);

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMarkerMove = useCallback(
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
      // Handles the movement of the marker on the accordion
      handleMarkerMove(marker);

      // Centers the map view on the marker
      moveToMarker(marker);
    },
    [handleMarkerMove, moveToMarker]
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
            subscribeMarkerDrag(marker, handleMarkerMove);
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
              subscribeMarkerDrag(marker, handleMarkerMove);
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
      handleMarkerMove,
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

  const updateMarkers = useCallback(
    (markers) => {
      clearMap();

      markers
        .filter((marker) => marker.coordinates !== null)
        .forEach((marker) => {
          addMarker(marker);
          subscribeMarkerClick(marker, handleMarkerClick);
          subscribeMarkerDrag(marker, handleMarkerMove);
        });

      setOpenMarker(null);
      setMarkers(markers);
    },
    [
      clearMap,
      addMarker,
      subscribeMarkerClick,
      handleMarkerClick,
      subscribeMarkerDrag,
      handleMarkerMove,
      setOpenMarker,
      setMarkers,
    ]
  );

  return {
    markers,
    handleAccordionClick,
    isMarkerOpen,
    updateMarker,
    updateMarkers,
  };
}
