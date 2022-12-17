import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ConditionField, CoordinatesField, LocationField } from "..";
import { LoadingButton } from "../../LoadingButton";

export function TemtemMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  // State
  const [isLoading, setLoading] = useState(false);

  function handleMarkerUpdate(data) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        className="space-y-4"
        onSubmit={methods.handleSubmit(handleMarkerUpdate)}
      >
        {/* Condition field */}
        <ConditionField marker={marker} />

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
