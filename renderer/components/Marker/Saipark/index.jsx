import { Marker } from "components/Marker";
import { useCallback } from "react";
import { updateSaiparkMarker } from "services";

export function SaiparkMarker({ marker }) {
  const handleMarkerUpdate = useCallback(
    (_data, coordinates) => {
      return updateSaiparkMarker(marker.id, {
        coordinates,
      });
    },
    [marker]
  );

  return <Marker handleMarkerUpdate={handleMarkerUpdate} marker={marker} />;
}
