import { useTranslation } from "next-export-i18n";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { ConditionField, CoordinatesField, LocationField } from "..";
import { useAccordionContext } from "../../../hooks/Accordion";
import { updateTemtemMarker } from "../../../services";
import { LoadingButton } from "../../LoadingButton";

export function TemtemMarker({ marker }) {
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
      const condition = data.condition?.trim();
      const x = data.coordinate_horizontal;
      const y = data.coordinate_vertical;

      setLoading(true);
      updateTemtemMarker(marker.id, {
        subtitle,
        condition,
        coordinates: { x, y },
      })
        .then(() => {
          marker.subtitle.current = subtitle;
          marker.condition = condition;
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
        location={marker.subtitle.current}
        placeholder={marker.subtitle.original}
      />

      {/* Condition field */}
      <ConditionField
        condition={marker.condition}
        placeholder={t("condition_template")}
      />

      {/* Coordinates field */}
      <CoordinatesField marker={marker} />

      {/* Save button */}
      <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
    </form>
  );
}
