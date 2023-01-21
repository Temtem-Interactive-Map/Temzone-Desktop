import { Marker } from "components/Marker";
import { useTemzone } from "hooks/Temzone";
import { useCallback } from "react";

export function SaiparkMarker({ marker }) {
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
