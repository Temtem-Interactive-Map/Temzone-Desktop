import { useTranslation } from "next-export-i18n";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ConditionField, CoordinatesField, LocationField } from "..";
import { useMarkersContext } from "../../../hooks/Markers";
import { LoadingButton } from "../../LoadingButton";

export function TemtemMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  // State
  const [isLoading, setLoading] = useState(false);
  const { updateMarker } = useMarkersContext();

  const handleMarkerUpdate = useCallback(
    (data) => {
      marker.subtitle.current = data.location.trim();
      marker.condition = (data.condition ?? "").trim();
      marker.coordinates = {
        x: data.coordinate_horizontal,
        y: data.coordinate_vertical,
      };

      setLoading(true);
      setTimeout(() => {
        updateMarker(marker);
        setLoading(false);
      }, 500);
    },
    [marker, updateMarker]
  );

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        className="space-y-4"
        onSubmit={methods.handleSubmit(handleMarkerUpdate)}
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
    </FormProvider>
  );
}
