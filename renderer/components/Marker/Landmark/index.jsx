import { LocationField, Marker } from "components/Marker";
import { useTemzone } from "hooks/Temzone";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function LandmarkMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  const { updateLandmarkMarker } = useTemzone();

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
    [marker, updateLandmarkMarker]
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
