import { createContext, useCallback, useEffect, useState } from "react";
import { useMapContext } from "../../hooks/Map";

export const AccordionContext = createContext();

export function AccordionProvider({ markers, children }) {
  // State
  const [openMarker, setOpenMarker] = useState(null);
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
      removeMarker,
      moveMarker,
      scrollToMarker,
      moveToMarker,
      focusMarker,
      unfocusMarker,
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

        // A copy of the marker is returned to force refreshing the coordinates of
        // the marker in the form
        return Object.assign({}, marker);
      });

      // Scroll the accordion to the selected marker
      scrollToMarker(marker);
    },
    [
      setOpenMarker,
      removeMarker,
      scrollToMarker,
      moveMarker,
      focusMarker,
      unfocusMarker,
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
      removeMarker,
      moveMarker,
      scrollToMarker,
      moveToMarker,
      focusMarker,
      unfocusMarker,
    ]
  );

  const isMarkerOpen = useCallback(
    (marker) => openMarker?.id === marker.id,
    [openMarker]
  );

  const updateMarker = useCallback((newMarker) => {
    setOpenMarker(newMarker);
  }, []);

  useEffect(() => {
    clearMap();
    setOpenMarker(null);

    markers
      .filter((marker) => marker.coordinates !== null)
      .forEach((marker) =>
        addMarker(marker, handleMarkerClick, handleMarkerMove)
      );
  }, [markers, clearMap, addMarker, handleMarkerClick, handleMarkerMove]);

  return (
    <AccordionContext.Provider
      value={{
        markers,
        handleAccordionClick,
        isMarkerOpen,
        updateMarker,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
}
