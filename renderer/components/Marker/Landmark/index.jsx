import { useTranslation } from "next-export-i18n";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CoordinatesField, LocationField } from "..";
import { LoadingButton } from "../../LoadingButton";

export function LandmarkMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  // State
  const [isLoading, setLoading] = useState(false);

  const handleMarkerUpdate = useCallback((data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        className="space-y-4"
        onSubmit={methods.handleSubmit(handleMarkerUpdate)}
      >
        {/* Location field */}
        <LocationField marker={marker} />

        {/* Coordinates field */}
        <CoordinatesField marker={marker} />

        {/* Save button */}
        <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
      </form>
    </FormProvider>
  );
}
