import { useCallback, useContext } from "react";
import { MarkersContext } from "../../context/Markers";

export function useMarkersContext() {
  // State
  const { markers, setMarkers } = useContext(MarkersContext);

  const updateMarker = useCallback(
    (newMarker) => {
      setMarkers((prevMarkers) => {
        const markers = prevMarkers.map((marker) =>
          marker.id === newMarker.id ? newMarker : marker
        );

        return markers;
      });
    },
    [setMarkers]
  );

  return {
    markers,
    updateMarker,
  };
}
