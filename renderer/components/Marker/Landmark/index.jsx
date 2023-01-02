import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CoordinatesField, LocationField } from "..";
import { useAccordionContext } from "../../../hooks/Accordion";
import { updateLandmarkMarker } from "../../../services";
import { LoadingButton } from "../../LoadingButton";

export function LandmarkMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  // Validation
  const { handleSubmit } = useFormContext();

  // State
  const [isLoading, setLoading] = useState(false);
  const { updateMarker } = useAccordionContext();

  const handleMarkerUpdate = useCallback(
    (data) => {
      const subtitle = data.location.trim();
      const x = data.coordinate_horizontal;
      const y = data.coordinate_vertical;

      setLoading(true);
      updateLandmarkMarker(marker.id, {
        subtitle,
        coordinates: { x, y },
      })
        .then(() => {
          marker.subtitle = subtitle;
          marker.coordinates = { x, y };

          updateMarker(marker);
        })
        .catch((error) => toast.warn(error.message))
        .finally(() => setLoading(false));
    },
    [marker, updateMarker]
  );

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={handleSubmit(handleMarkerUpdate)}
    >
      {/* Location field */}
      <LocationField
        location={marker.subtitle}
        placeholder={t("field.placeholder.location")}
      />

      {/* Coordinates field */}
      <CoordinatesField marker={marker} />

      {/* Save button */}
      <LoadingButton loading={isLoading}>{t("button.save")}</LoadingButton>
    </form>
  );
}
