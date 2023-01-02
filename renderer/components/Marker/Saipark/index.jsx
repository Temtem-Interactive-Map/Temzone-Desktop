import { useCallback } from "react";
import { Marker } from "..";
import { updateSaiparkMarker } from "../../../services";

export function SaiparkMarker({ marker }) {
  const handleMarkerUpdate = useCallback(
    (_, coordinates) => {
      return updateSaiparkMarker(marker.id, {
        coordinates,
      });
    },
    [marker]
  );

  return <Marker handleMarkerUpdate={handleMarkerUpdate} marker={marker} />;
}
