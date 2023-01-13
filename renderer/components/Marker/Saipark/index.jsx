import { useCallback } from "react";
import { Marker } from "..";
import { useTemzone } from "../../../hooks/Temzone";

export function SaiparkMarker({ marker }) {
  // Callbacks
  const { updateSaiparkMarker } = useTemzone();

  const handleMarkerUpdate = useCallback(
    (_, coordinates) => {
      return updateSaiparkMarker(marker.id, {
        coordinates,
      });
    },
    [marker, updateSaiparkMarker]
  );

  return <Marker handleMarkerUpdate={handleMarkerUpdate} marker={marker} />;
}
