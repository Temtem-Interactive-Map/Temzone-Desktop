import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LocationField, Marker } from "..";
import { updateLandmarkMarker } from "../../../services";

export function LandmarkMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  const handleMarkerUpdate = useCallback(
    (data, coordinates) => {
      const subtitle = data.location.trim();

      return updateLandmarkMarker(marker.id, {
        subtitle,
        coordinates,
      }).then(() => {
        marker.subtitle = subtitle;
      });
    },
    [marker]
  );

  return (
    <Marker handleMarkerUpdate={handleMarkerUpdate} marker={marker}>
      {/* Location field */}
      <LocationField
        location={marker.subtitle}
        placeholder={t("field.placeholder.location")}
      />
    </Marker>
  );
}
