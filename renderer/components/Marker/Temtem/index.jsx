import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ConditionField, LocationField, Marker } from "..";
import { updateTemtemMarker } from "../../../services";

export function TemtemMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  const handleMarkerUpdate = useCallback(
    (data, coordinates) => {
      const subtitle = data.location.trim();
      const condition = data.condition?.trim();

      return updateTemtemMarker(marker.id, {
        subtitle,
        condition,
        coordinates,
      }).then(() => {
        marker.subtitle.current = subtitle;
        marker.condition = condition;
      });
    },
    [marker]
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
