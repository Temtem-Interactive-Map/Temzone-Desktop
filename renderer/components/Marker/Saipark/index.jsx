import { useTranslation } from "next-export-i18n";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CoordinatesField } from "..";
import { useMarkersContext } from "../../../hooks/Markers";
import { LoadingButton } from "../../LoadingButton";

export function SaiparkMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  // State
  const [isLoading, setLoading] = useState(false);
  const { updateMarker } = useMarkersContext();

  const handleMarkerUpdate = useCallback(
    (data) => {
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
        {/* Coordinates field */}
        <CoordinatesField marker={marker} />

        {/* Save button */}
        <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
      </form>
    </FormProvider>
  );
}
