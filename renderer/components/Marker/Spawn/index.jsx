import { ConditionField, LocationField, Marker } from "components/Marker";
import { useTemzone } from "hooks/Temzone";
import { t } from "locales";
import { useCallback } from "react";

export function SpawnMarker({ marker }) {
  // State
  const { updateSpawnMarker } = useTemzone();

  const handleMarkerUpdate = useCallback(
    (data, coordinates) => {
      const subtitle = data.location.trim();
      const condition = data.condition ? data.condition.trim() : null;

      return updateSpawnMarker(marker.id, {
        subtitle,
        condition,
        coordinates,
      }).then(() => {
        marker.subtitle.current = subtitle;
        marker.condition = condition;
      });
    },
    [marker, updateSpawnMarker]
  );

  return (
    <Marker handleMarkerUpdate={handleMarkerUpdate} marker={marker}>
      {/* Location field */}
      <LocationField
        location={marker.subtitle.current}
        placeholder={marker.subtitle.original}
      />

      {/* Condition field */}
      <ConditionField
        condition={marker.condition}
        placeholder={t("field.placeholder.condition")}
      />
    </Marker>
  );
}
